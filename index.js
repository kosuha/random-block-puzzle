import { Table } from './modules/table.js';
import { Next } from './modules/next.js';

const table = new Table();
const next = new Next();

next.generateTable();
table.generate();
let randomBlock;
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
        next.reset();
        

        const levelTag = document.querySelector('#level');
        const scoreTag = document.querySelector('#score');
        levelTag.textContent = `Level ${table.level}`;
        scoreTag.textContent = `Score: ${table.score}`;

        randomBlock = next.addQueue();
        table.display();
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
        randomBlock = next.addQueue();
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

export { table };