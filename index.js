import { Table } from './modules/table.js';
import { Block } from './modules/block.js';

const table = new Table();
table.generate();
let randomBlock = randomBlockGenerator();
table.display();

keyInput();
setTimeout(() => {
    setInterval(interval, 100);
}, 1000);

function interval() {
    if (randomBlock.getState() === false) {
        table.updateData(randomBlock.getCoordinates(), randomBlock.getColor(), randomBlock.getState());
        randomBlock = randomBlockGenerator();
    }
    table.cleanData();
    table.updateData(randomBlock.getCoordinates(), randomBlock.getColor(), randomBlock.getState());
    table.stopPosition(randomBlock);
    table.display();
    randomBlock.gravity();
}

function keyInput() {
    window.addEventListener('keydown', (e) => {
        switch (e.code) {
            case 'ArrowDown':
                console.log('100');
                break;
            case 'ArrowLeft':
                console.log('ArrowLeft');
                break;
            case 'ArrowRight':
                console.log('ArrowRight');
                break;
            default:
                break;
        }
    });

    window.addEventListener('keyup', (e) => {
        switch (e.code) {
            case 'Space':
                console.log('Space');
                break;
            case 'ArrowUp':
                console.log('ArrowUp');
                break;
            case 'ArrowDown':
                console.log('1000');
                break;
            default:
                break;
        }
    });
}

function randomBlockGenerator() {
    let randomNumber = Math.floor(Math.random() * 7);

    if (randomNumber === 0) {
        return new Block([[0, 1], [0, 2], [1, 1], [1, 2]], 'yellow');
    }
    if (randomNumber === 1) {
        return new Block([[1, 0], [1, 1], [1, 2], [1, 3]], 'skyblue');
    }
    if (randomNumber === 2) {
        return new Block([[0, 1], [1, 0], [1, 1], [1, 2]], 'violet');
    }
    if (randomNumber === 3) {
        return new Block([[0, 0], [1, 0], [1, 1], [1, 2]], 'blue');
    }
    if (randomNumber === 4) {
        return new Block([[0, 2], [1, 0], [1, 1], [1, 2]], 'orange');
    }
    if (randomNumber === 5) {
        return new Block([[0, 0], [0, 1], [1, 1], [1, 2]], 'red');
    }
    if (randomNumber === 6) {
        return new Block([[0, 1], [0, 2], [1, 0], [1, 1]], 'green');
    }
}