const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const http = require('http').Server(app);
const passport = require('passport');
const kakaoStrategy = require('passport-kakao').Strategy;
const connection = require('./lib/conn.js');
const kakaoCredentials = require('./config/kakao.json');
const session = require('express-session');
const sessionData = require('./config/session.json');
const MySQLStore = require('express-mysql-session')(session);
const sessionStoreConn = require('./lib/sessionStoreConn.js');


app.use(express.static('statics'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// 세션 검사
const authenticateUser = (request, response, next) => {
    if (request.isAuthenticated()) {
        next();
    } else {
        response.status(301).redirect('/signin');
    }
};

app.use(session({
    secret: sessionData.data.secret,
    resave: false,
    saveUninitialized: true,
    store: new MySQLStore(sessionStoreConn)
}));

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function (user, done) {
    done(null, user);
});
passport.deserializeUser(function (user, done) {
    done(null, user);
});

passport.use(new kakaoStrategy({
    clientID: kakaoCredentials.web.client_id,
    clientSecret: kakaoCredentials.web.client_secret,
    callbackURL: kakaoCredentials.web.callback_URL
},
    (accessToken, refreshToken, profile, done) => {

        const id = profile.id;
        const userName = profile.username;
        const nickName = profile.displayName;
        const profileImageURL = profile._json.properties.thumbnail_image;

        let user = {
            id: id,
            userName: userName,
            nickName: nickName,
            profileImageURL: profileImageURL
        };

        done(null, user);
    }
));

app.get('/auth/kakao',
    passport.authenticate('kakao')
);

app.get('/auth/kakao/callback',
    passport.authenticate('kakao', { failureRedirect: '/signin' }),
    (request, response) => {
        response.redirect('/');
    }
);

app.get('/', authenticateUser, (request, response) => {
    console.log('user: ', request.session.passport.user);

    response.sendFile(__dirname + '/app/index.html');
});

app.get('/signin', (request, response) => {
    response.sendFile(__dirname + '/app/signin/index.html');
});

app.post('/user-data-process', (request, response) => {
    const userData = request.session.passport.user;
    
    connection.query(`SELECT * FROM ranking WHERE id_kakao = ${userData.id}`,
        (error, rows, fields) => {
            if (error) {
                throw error;
            }
            if (Object.keys(rows).length === 0) {
                response.json({userData: userData, highest: 0});
            } else {
                response.json({userData: userData, highest: rows[0].score});
            }
        });
});

app.post('/ranking-process', (request, response) => {
    connection.query('SELECT * FROM ranking ORDER BY score DESC LIMIT 10',
        (error, rows, fields) => {
            response.json(rows);
        });
});

app.post('/score-upload-process', (request, response) => {
    const userData = request.session.passport.user;
    connection.query(
        `INSERT INTO logs(id_kakao, nickname_kakao, username_kakao, profile_image, score, level, mobile) VALUES(?, ?, ?, ?, ?, ?, ?)`,
        [userData.id, userData.userName, userData.nickName, userData.profileImageURL, request.body.score, request.body.level, request.body.isMobile],
        (error, rows, fields) => {
            if (error) {
                throw error;
            }
        });

    connection.query(`SELECT * FROM ranking WHERE id_kakao = ${userData.id}`,
        (error, rows, fields) => {
            if (error) {
                throw error;
            }
            if (Object.keys(rows).length === 0) {
                connection.query(
                    `INSERT INTO ranking(id_kakao, nickname_kakao, username_kakao, profile_image, score, level) VALUES(?, ?, ?, ?, ?, ?)`,
                    [userData.id, userData.userName, userData.nickName, userData.profileImageURL, request.body.score, request.body.level],
                    (error, rows, fields) => {
                        if (error) {
                            throw error;
                        }
                    });
            } else {
                if (rows[0].score < request.body.score) {
                    connection.query(
                        `UPDATE ranking SET score = '${request.body.score}', level = '${request.body.level}', nickname_kakao = '${userData.nickName}' WHERE id_kakao = '${userData.id}'`,
                        (error, rows, fields) => {
                            if (error) {
                                throw error;
                            }
                        });
                }
            }
        });
});

http.listen(80, () => {
    console.log('app run!')
});