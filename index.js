import { Table } from './modules/table.js';
import { Next } from './modules/next.js';
import { log } from './modules/log.js';
import { generateRankingTable, rankingData, uploadScore } from './modules/ranking.js';

let isMobile = device_check();
preventScaleUp();

generateRankingTable();
rankingData();

const ranking = document.querySelector('#ranking');
const game = document.querySelector('#game');

if (isMobile) {
    ranking.style.display = 'inline';
    game.style.display = 'none';
}

const table = new Table();
const next = new Next();

next.generateTable();
table.generate();
let randomBlock;
let loop;

if (isMobile) {
    touchInput();
}
keyInput();

const startTag = document.querySelector('#start');
let startState = false;

if (isMobile) {
    startTag.addEventListener('touchstart', () => {
        if (!startState) {
            const gameOverContainer = document.querySelector('#gameOverContainer');
            if (gameOverContainer) {
                gameOverContainer.parentNode.removeChild(gameOverContainer);
            }
            table.reset();
            next.reset();
            ranking.style.display = 'none';
            game.style.display = 'inline';
            const levelTag = document.querySelector('#level');
            const scoreTag = document.querySelector('#score');
            levelTag.textContent = `Level ${table.level}`;
            scoreTag.textContent = `Score: ${table.score}`;

            randomBlock = next.addQueue();
            table.display();
            table.updateData(randomBlock.getCoordinates(), randomBlock.getColor(), randomBlock.getState());
            loop = setInterval(interval, table.getSpeed());
            log(isMobile);
            startState = true;
        }
    });
} else {
    startTag.addEventListener('click', () => {
        if (!startState) {

            const gameOverContainer = document.querySelector('#gameOverContainer');
            if (gameOverContainer) {
                gameOverContainer.parentNode.removeChild(gameOverContainer);
            }
            table.reset();
            next.reset();

            const levelTag = document.querySelector('#level');
            const scoreTag = document.querySelector('#score');
            levelTag.textContent = `Level ${table.level}`;
            scoreTag.textContent = `Score: ${table.score}`;

            randomBlock = next.addQueue();
            table.display();
            table.updateData(randomBlock.getCoordinates(), randomBlock.getColor(), randomBlock.getState());
            loop = setInterval(interval, table.getSpeed());
            log(isMobile);
            startState = true;
        }
    });
}


function interval() {
    table.stopPosition(randomBlock);
    table.updateData(randomBlock.getCoordinates(), randomBlock.getColor(), randomBlock.getState());
    if (table.gameOverCondition()) {
        clearInterval(loop);
        startState = false;
        setTimeout(() => {
            uploadScore(table.getScore(), table.getLevel());
        }, 1000);
        return;
    }
    if (randomBlock.getState() === false) {
        table.lineClear();
        clearInterval(loop);
        loop = setInterval(interval, table.getSpeed());
        randomBlock = next.addQueue();
        table.updateData(randomBlock.getCoordinates(), randomBlock.getColor(), randomBlock.getState());
    }
    randomBlock.gravity();
    table.updateData(randomBlock.getCoordinates(), randomBlock.getColor(), randomBlock.getState());
    table.display();
}

const pauseTag = document.querySelector('#pause');
let pauseState = false;

if (isMobile) {
    pauseTag.addEventListener('touchstart', () => {
        if (startState) {
            if (!pauseState) {
                clearInterval(loop);
                ranking.style.display = 'inline';
                game.style.display = 'none';
                pauseTag.textContent = 'Resume';
                pauseState = true;
            } else {
                loop = setInterval(interval, table.getSpeed());
                ranking.style.display = 'none';
                game.style.display = 'inline';
                pauseTag.textContent = 'Pause';
                pauseState = false;
            }
        }

        if (!startState) {
            ranking.style.display = 'inline';
        }
    });
} else {
    pauseTag.addEventListener('click', () => {
        if (startState) {
            if (!pauseState) {
                clearInterval(loop);
                pauseTag.textContent = 'Resume';
                pauseState = true;
            } else {
                loop = setInterval(interval, table.getSpeed());
                pauseTag.textContent = 'Pause';
                pauseState = false;
            }
        }
    });
}


function keyInput() {
    window.addEventListener('keydown', (e) => {
        if (startState && !pauseState) {
            switch (e.code) {
                case 'ArrowDown':
                    randomBlock.moveDown();
                    break;
                case 'ArrowLeft':
                    randomBlock.moveLeft();
                    break;
                case 'ArrowRight':
                    randomBlock.moveRight();
                    break;
                default:
                    break;
            }
            table.updateData(randomBlock.getCoordinates(), randomBlock.getColor(), randomBlock.getState());
            table.display();
        }
    });

    window.addEventListener('keyup', (e) => {
        if (startState && !pauseState) {
            switch (e.code) {
                case 'Space':
                    randomBlock.dropDown();
                    break;
                case 'ArrowUp':
                    randomBlock.rotate90();
                    break;
                default:
                    break;
            }
            table.updateData(randomBlock.getCoordinates(), randomBlock.getColor(), randomBlock.getState());
            table.display();
        }
    });
}

function touchInput() {
    document.querySelector('#up').addEventListener('touchstart', () => {
        if (startState && !pauseState) {
            randomBlock.rotate90();
            table.updateData(randomBlock.getCoordinates(), randomBlock.getColor(), randomBlock.getState());
            table.display();
        }
    });

    document.querySelector('#down').addEventListener('touchstart', () => {
        if (startState && !pauseState) {
            randomBlock.moveDown();
            table.updateData(randomBlock.getCoordinates(), randomBlock.getColor(), randomBlock.getState());
            table.display();
        }
    });

    document.querySelector('#left').addEventListener('touchstart', () => {
        if (startState && !pauseState) {
            randomBlock.moveLeft();
            table.updateData(randomBlock.getCoordinates(), randomBlock.getColor(), randomBlock.getState());
            table.display();
        }
    });

    document.querySelector('#right').addEventListener('touchstart', () => {
        if (startState && !pauseState) {
            randomBlock.moveRight();
            table.updateData(randomBlock.getCoordinates(), randomBlock.getColor(), randomBlock.getState());
            table.display();
        }
    });

    document.querySelector('#drop').addEventListener('touchstart', () => {
        if (startState && !pauseState) {
            randomBlock.dropDown();
            table.updateData(randomBlock.getCoordinates(), randomBlock.getColor(), randomBlock.getState());
            table.display();
        }
    });
}

// 확대 방지
function preventScaleUp() {
    document.documentElement.addEventListener('touchstart', function (event) {
        if (event.touches.length > 1) {
            event.preventDefault();
        }
    }, false);

    var lastTouchEnd = 0;

    document.documentElement.addEventListener('touchend', function (event) {
        let now = (new Date()).getTime();
        if (now - lastTouchEnd <= 300) {
            event.preventDefault();
        } lastTouchEnd = now;
    }, false);
}

// 접속 기기 체크
function device_check() {
    let pc_device = "win16|win32|win64|mac|macintel";
    let this_device = navigator.platform;
    if (this_device) {
        if (pc_device.indexOf(navigator.platform.toLowerCase()) < 0) {
            return true; //mobile
        } else {
            return false; //pc
        }
    }
}

// 카카오톡으로 공유하기
Kakao.init('');
console.log(Kakao.isInitialized());
document.querySelector('#kakao-link-btn').addEventListener('click', () => {
    Kakao.Link.sendDefault({
        objectType: 'feed',
        content: {
            title: '랜덤블록퍼즐',
            description: '같이 게임해요!!',
            imageUrl:
                'http://ec2-3-35-14-224.ap-northeast-2.compute.amazonaws.com/random-block-puzzle/img/share_img.jpg',
            link: {
                webUrl: 'http://ec2-3-35-14-224.ap-northeast-2.compute.amazonaws.com/random-block-puzzle/index.html',
                androidExecParams: 'test'
            }
        }
    });
});

export { table, isMobile };