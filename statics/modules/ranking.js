import { isMobile, shareScore } from '../index.js';

function generateRankingTable() {
    const rankingTable = document.querySelector('#rankingTable');
    const fragment = document.createDocumentFragment();

    for (let i = 0; i < 10; i++) {
        const tr = document.createElement('tr');
        fragment.appendChild(tr);
        for (let j = 0; j < 4; j++) {
            const td = document.createElement('td');
            tr.appendChild(td);
        }
    }

    rankingTable.appendChild(fragment);
}

async function rankingData() {
    let response = await fetch('/ranking-process', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        }
    });

    let result = await response.json();
    // console.log(result, typeof (result));

    const rankingTable = document.querySelector('#rankingTable');
    for (let i = 0; i < result.length; i++) {
        rankingTable.children[i].children[0].textContent = i + 1;
        
        const imageTag = document.createElement('img');
        imageTag.id = 'rankingProfileImage';
        rankingTable.children[i].children[1].removeChild(rankingTable.children[i].children[0]);
        rankingTable.children[i].children[1].appendChild(imageTag);
        imageTag.src = result[i].profile_image;
        
        rankingTable.children[i].children[2].textContent = result[i].nickname_kakao;
        rankingTable.children[i].children[3].textContent = result[i].score;
    }
}

function uploadScore(_score, _level) {
    post();

    async function post() {
        let data = {
            score: _score,
            level: _level,
            isMobile: isMobile
        };

        let response = await fetch('/score-upload-process', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(data)
        });
    }
}

export { generateRankingTable, rankingData, uploadScore };