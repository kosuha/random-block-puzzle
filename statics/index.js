import { Table } from './modules/table.js';
import { Next } from './modules/next.js';
import { generateRankingTable, rankingData, uploadScore } from './modules/ranking.js';
import { kakaoInit } from './modules/kakaoInit.js';

let isMobile = device_check();
preventScaleUp();

generateRankingTable();
rankingData();
help();

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
            const linesTag = document.querySelector('#lines');
            levelTag.textContent = `Level 1`;
            scoreTag.textContent = `Score: 0`;
            linesTag.textContent = `Lines: 0`;

            randomBlock = next.addQueue();
            table.display();
            table.updateData(randomBlock.getCoordinates(), randomBlock.getColor(), randomBlock.getState());
            loop = setInterval(interval, table.getSpeed());
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
            const linesTag = document.querySelector('#lines');
            levelTag.textContent = `Level 1`;
            scoreTag.textContent = `Score: 0`;
            linesTag.textContent = `Lines: 0`;

            randomBlock = next.addQueue();
            table.display();
            table.updateData(randomBlock.getCoordinates(), randomBlock.getColor(), randomBlock.getState());
            loop = setInterval(interval, table.getSpeed());

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

        uploadScore(table.getScore(), table.getLevel());
        rankingData();
        updateHighest();

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
    let pauseOnce = false;
    pauseTag.addEventListener('touchstart', () => {
        if (startState) {
            if (!pauseState) {
                clearInterval(loop);
                ranking.style.display = 'inline';
                game.style.display = 'none';
                pauseTag.textContent = 'Resume';
                pauseState = true;
                table.displayBlack();
                next.displayBlack();
            } else {
                if (!pauseOnce) {
                    pauseOnce = true;
                    pauseTag.textContent = '5';
                    setTimeout(() => {
                        pauseTag.textContent = '4';
                    }, 1000);
                    setTimeout(() => {
                        pauseTag.textContent = '3';
                    }, 2000);
                    setTimeout(() => {
                        pauseTag.textContent = '2';
                    }, 3000);
                    setTimeout(() => {
                        pauseTag.textContent = '1';
                    }, 4000);
                    setTimeout(() => {
                        loop = setInterval(interval, table.getSpeed());
                        ranking.style.display = 'none';
                        game.style.display = 'inline';
                        pauseTag.textContent = 'Pause';
                        table.display();
                        next.display();
                        pauseState = false;
                        pauseOnce = false;
                    }, 5000);
                }
            }
        }

        if (!startState) {
            ranking.style.display = 'inline';
        }
    });
}

if (!isMobile) {
    let pauseOnce = false;
    pauseTag.addEventListener('click', () => {
        if (startState) {
            if (!pauseState) {
                clearInterval(loop);
                pauseTag.textContent = 'Resume';
                pauseState = true;
                table.displayBlack();
                next.displayBlack();
            } else {
                if (!pauseOnce) {
                    pauseOnce = true;
                    pauseTag.textContent = '5';
                    setTimeout(() => {
                        pauseTag.textContent = '4';
                    }, 1000);
                    setTimeout(() => {
                        pauseTag.textContent = '3';
                    }, 2000);
                    setTimeout(() => {
                        pauseTag.textContent = '2';
                    }, 3000);
                    setTimeout(() => {
                        pauseTag.textContent = '1';
                    }, 4000);
                    setTimeout(() => {
                        loop = setInterval(interval, table.getSpeed());
                        pauseTag.textContent = 'Pause';
                        table.display();
                        next.display();
                        pauseState = false;
                        pauseOnce = false;
                    }, 5000);
                }
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

// 도움말
function help() {
    const helpButton = document.querySelector('#helpButton');
    const help = document.querySelector('#help');
    let helpState = false;
    if (!isMobile) {
        helpButton.addEventListener('click', () => {
            if (!helpState) {
                help.style.display = 'inline';
                helpButton.textContent = 'X';
                helpState = true;
            } else {
                help.style.display = 'none';
                helpButton.textContent = '?';
                helpState = false;
            }
        });
    }

    if (isMobile) {
        helpButton.addEventListener('touchstart', () => {
            if (!helpState) {
                help.style.display = 'inline';
                helpButton.textContent = 'X';
                helpState = true;
            } else {
                help.style.display = 'none';
                helpButton.textContent = '?';
                helpState = false;
            }
        });
    }
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

// 사용자 정보 가져오기
getUserData();

async function getUserData() {
    let response = await fetch('/user-data-process', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        }
    });

    let result = await response.json();
    // console.log(result, typeof(result));

    const myName = document.querySelector('#myName');
    const myImage = document.querySelector('#myImage');
    const highScore = document.querySelector('#highScore');

    myName.textContent = result.userData.nickName;
    myImage.src = result.userData.profileImageURL;
    highScore.textContent = `Highest: ${result.highest}`;

}

async function updateHighest() {
    let response = await fetch('/user-data-process', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        }
    });

    let result = await response.json();

    const highScore = document.querySelector('#highScore');
    highScore.textContent = `Highest: ${result.highest}`;

}

// 카카오톡으로 공유하기
kakaoInit();

function shareScore() {
    document.querySelector('#kakao-link-btn').addEventListener('click' || 'touchstart', () => {
        async function shareHighest() {
            let response = await fetch('/user-data-process', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                }
            });

            let result = await response.json();

            Kakao.Link.sendDefault({
                objectType: 'feed',
                content: {
                    title: `${result.userData.nickName}님의 최고점수 ${result.highest}점!`,
                    description: '내 점수 어때 ㅋㅋㅋㅋㅋ',
                    imageUrl:
                        'http://ec2-3-35-14-224.ap-northeast-2.compute.amazonaws.com/img/share_img.jpg',
                    link: {
                        webUrl: 'http://ec2-3-35-14-224.ap-northeast-2.compute.amazonaws.com',
                        androidExecParams: 'test'
                    }
                }
            });

        }

        shareHighest();
    });
}

shareScore();

export { table, isMobile };