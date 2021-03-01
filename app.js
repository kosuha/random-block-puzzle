const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const connection = require('./lib/conn.js');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/rbp', (request, response) => {
    response.sendFile(__dirname + '/app/index.html');
});

app.get('/style.css', (request, response) => {
    response.sendFile(__dirname + '/app/style.css');
});

app.get('/index.js', (request, response) => {
    response.sendFile(__dirname + '/app/index.js');
});

app.get('/random-block-puzzle/img/share_img.jpg', (request, response) => {
    response.sendFile(__dirname + '/img/share_img.jpg');
});

app.get('/modules/log.js', (request, response) => {
    response.sendFile(__dirname + '/modules/log.js');
});

app.get('/modules/block.js', (request, response) => {
    response.sendFile(__dirname + '/modules/block.js');
});

app.get('/modules/kakaoInit.js', (request, response) => {
    response.sendFile(__dirname + '/modules/kakaoInit.js');
});

app.get('/modules/next.js', (request, response) => {
    response.sendFile(__dirname + '/modules/next.js');
});

app.get('/modules/ranking.js', (request, response) => {
    response.sendFile(__dirname + '/modules/ranking.js');
});

app.get('/modules/table.js', (request, response) => {
    response.sendFile(__dirname + '/modules/table.js');
});

app.post('/log-process', (request, response) => {
    console.log(request.body);
    connection.query(`INSERT INTO logs(mobile) VALUES(?)`, [request.body.isMobile],
     (error, rows, fields) => {
        if(error){
            throw error;
          }
          response.end();
    });
});

app.post('/ranking-process', (request, response) => {
    console.log(request.body);
    connection.query('SELECT * FROM ranking ORDER BY score DESC LIMIT 10', function (error, rows, fields) {
        response.json(rows);
    });
});

app.post('/score-upload-process', (request, response) => {
    console.log(request.body);
    connection.query(`INSERT INTO ranking(name,score,level) VALUES(?, ?, ?)`, [request.body.name, request.body.score, request.body.level],
     (error, rows, fields) => {
        if(error){
            throw error;
          }
          response.end();
    });
});

app.listen(80, () => {
    console.log('app run!')
});