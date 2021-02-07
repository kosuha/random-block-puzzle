import { Table } from './modules/table.js';
import { Block } from './modules/block.js';

const table = new Table();
table.generate();
let randomBlock = randomBlockGenerator();
table.display();

keyInput();

let loop = setInterval(interval, 500);

function interval() {
    table.stopPosition(randomBlock);
    
    table.updateData(randomBlock.getCoordinates(), randomBlock.getColor(), randomBlock.getState());
    if (table.gameOverCondition()) {
        clearInterval(loop);
    }
    if (randomBlock.getState() === false) {
        randomBlock = randomBlockGenerator();
        table.updateData(randomBlock.getCoordinates(), randomBlock.getColor(), randomBlock.getState());
    }
    randomBlock.gravity();
    
    table.updateData(randomBlock.getCoordinates(), randomBlock.getColor(), randomBlock.getState());
    table.lineClear();
    table.display();
}

function keyInput() {
    window.addEventListener('keydown', (e) => {
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
    });

    window.addEventListener('keyup', (e) => {
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

export { table };