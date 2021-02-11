import { isMobile } from '../index.js';

function generateRankingTable() {
    const rankingTable = document.querySelector('#rankingTable');
    const fragment = document.createDocumentFragment();

    for (let i = 0; i < 10; i++) {
        const tr = document.createElement('tr');
        fragment.appendChild(tr);
        for (let j = 0; j < 3; j++) {
            const td = document.createElement('td');
            tr.appendChild(td);
        }
    }

    rankingTable.appendChild(fragment);
}

function rankingData() {
    // let data = { 'data': 'data' };
    // data = JSON.stringify(data);
    let xhr = new XMLHttpRequest();
    xhr.open('POST', './data/ranking-process.php');
    xhr.setRequestHeader('Content-Type', "application/json");
    xhr.send();
    xhr.addEventListener('load', function () {
        let result = JSON.parse(xhr.responseText);
        const rankingTable = document.querySelector('#rankingTable');
        for (let i = 0; i < result.name.length; i++) {
            rankingTable.children[i].children[0].textContent = i + 1;
            rankingTable.children[i].children[1].textContent = result.name[i];
            rankingTable.children[i].children[2].textContent = result.score[i];
        }
    });
}

function uploadScore(_score, _level) {
    const popUp = document.createElement('div');
    const popUpTitle = document.createElement('div');
    const input = document.createElement('input');
    const buttons = document.createElement('div');
    const enterButton = document.createElement('button');
    const exitButton = document.createElement('button');

    popUpTitle.textContent = '랭크시스템에 등록하세요!';
    input.type = 'text';
    input.maxLength = 10;
    input.placeholder = 'Enter Your Name';
    enterButton.textContent = 'Enter'
    exitButton.textContent = 'Nope'

    popUp.appendChild(popUpTitle);
    popUp.appendChild(input);
    buttons.appendChild(exitButton);
    buttons.appendChild(enterButton);
    popUp.appendChild(buttons);

    const all = document.querySelector('#all');
    buttons.id = 'popUpButtons';
    popUp.id = 'popUp';
    all.appendChild(popUp);

    const startButton = document.querySelector('#start');
    const pauseButton = document.querySelector('#pause');
    startButton.disabled = 'disabled';
    pauseButton.disabled = 'disabled';

    if (isMobile) {
        enterButton.addEventListener('touchstart', () => {
            if (input.value.length > 0) {
                $.ajax({
                    type: 'post',
                    dataType: 'json',
                    url: './data/score-upload-process.php',
                    data: {
                        name: input.value,
                        score: _score,
                        level: _level
                    },
                    success: function () {
                        popUp.parentNode.removeChild(popUp);
                        rankingData();
                        startButton.disabled = false;
                        pauseButton.disabled = false;
                    },
                    error: function () {
                        console.log('failed');
                    }
                })
            } else {
                alert("이름이 비어있어요!");
            }

        });
    } else {
        enterButton.addEventListener('click', () => {
            if (input.value.length > 0) {
                $.ajax({
                    type: 'post',
                    dataType: 'json',
                    url: './data/score-upload-process.php',
                    data: {
                        name: input.value,
                        score: _score,
                        level: _level
                    },
                    success: function () {
                        popUp.parentNode.removeChild(popUp);
                        rankingData();
                        startButton.disabled = false;
                        pauseButton.disabled = false;
                    },
                    error: function () {
                        console.log('failed');
                    }
                })
            } else {
                alert("이름이 비어있어요!");
            }

        });
    }

    if (isMobile) {
        exitButton.addEventListener('touchstart', () => {
            popUp.parentNode.removeChild(popUp);
            startButton.disabled = false;
            pauseButton.disabled = false;
        });
    } else {
        exitButton.addEventListener('click', () => {
            popUp.parentNode.removeChild(popUp);
            startButton.disabled = false;
            pauseButton.disabled = false;
        });
    }

    // 왜 안될까...
    async function sendAjax(url, _data) {
        var data = { "name": _data };
        var dataInfo = {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        };
        const reqURL = await fetch(url, dataInfo);
        const result = await reqURL.json();
        console.log(reqURL.status, result);
    }
}

export { generateRankingTable, rankingData, uploadScore };