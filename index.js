import { Table } from './modules/table.js';
import { Block } from './modules/block.js';

/*
    TODO:
        다음에 나올 블럭 표시
*/

const table = new Table();
table.generate();
let randomBlock = randomBlockGenerator();
table.display();
let loop;

keyInput();

const startTag = document.querySelector('#start');
let startState = false;

startTag.addEventListener('click', () => {
    if (!startState) {
        const gameOverContainer = document.querySelector('#gameOverContainer');
        if (gameOverContainer) {
            gameOverContainer.parentNode.removeChild(gameOverContainer);
        }
        table.reset();
        table.display();

        const levelTag = document.querySelector('#level');
        const scoreTag = document.querySelector('#score');
        levelTag.textContent = `Level ${table.level}`;
        scoreTag.textContent = `Score: ${table.score}`;

        randomBlock = randomBlockGenerator();
        table.updateData(randomBlock.getCoordinates(), randomBlock.getColor(), randomBlock.getState());
        loop = setInterval(interval, table.getSpeed());
        startState = true;
    }
});

function interval() {
    table.stopPosition(randomBlock);
    table.updateData(randomBlock.getCoordinates(), randomBlock.getColor(), randomBlock.getState());
    if (table.gameOverCondition()) {
        clearInterval(loop);
        startState = false;
        return;
    }
    if (randomBlock.getState() === false) {
        table.lineClear();
        clearInterval(loop);
        loop = setInterval(interval, table.getSpeed());
        randomBlock = randomBlockGenerator();
        table.updateData(randomBlock.getCoordinates(), randomBlock.getColor(), randomBlock.getState());
    }
    randomBlock.gravity();
    table.updateData(randomBlock.getCoordinates(), randomBlock.getColor(), randomBlock.getState());
    table.display();
}

const pauseTag = document.querySelector('#pause');
let pauseState = false;

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
            // table.stopPosition(randomBlock);
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
            // table.stopPosition(randomBlock);
            table.display();
        }
    });
}

function randomBlockGenerator() {
    let randomNumber = 0//Math.floor(Math.random() * 7);

    if (randomNumber === 0) {
        let structure = [
            [1, 1],
            [1, 1]
        ];
        return new Block(structure, 'yellow');
    }
    if (randomNumber === 1) {
        let structure = [
            [0, 0, 0, 0],
            [1, 1, 1, 1],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ];
        return new Block(structure, 'skyblue');
    }
    if (randomNumber === 2) {
        let structure = [
            [0, 1, 0],
            [1, 1, 1],
            [0, 0, 0]
        ];
        return new Block(structure, 'violet');
    }
    if (randomNumber === 3) {
        let structure = [
            [1, 0, 0],
            [1, 1, 1],
            [0, 0, 0]
        ];
        return new Block(structure, 'blue');
    }
    if (randomNumber === 4) {
        let structure = [
            [0, 0, 1],
            [1, 1, 1],
            [0, 0, 0]
        ];
        return new Block(structure, 'orange');
    }
    if (randomNumber === 5) {
        let structure = [
            [1, 1, 0],
            [0, 1, 1],
            [0, 0, 0]
        ];
        return new Block(structure, 'red');
    }
    if (randomNumber === 6) {
        let structure = [
            [0, 1, 1],
            [1, 1, 0],
            [0, 0, 0]
        ];
        return new Block(structure, 'green');
    }
}

export { table };