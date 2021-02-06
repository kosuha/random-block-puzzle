import { Table } from './modules/table.js';
import { Block } from './modules/block.js';

const table = new Table();
table.generate();
let randomBlock = randomBlockGenerator();
table.display();

keyInput();

let loop = setInterval(interval, 100);

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
    if (table.gameOverCondition()) {
        clearInterval(loop);
    }
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