import { Table } from './modules/table.js';
import { Block, TypeA, TypeB, TypeC, TypeD, TypeE, TypeF, TypeG } from './modules/block.js';

const table = new Table();

table.generate();

let randomBlock = randomBlockGenerator();
table.setData(randomBlock.getCoordinates(), randomBlock.getColor());
table.display();

function randomBlockGenerator() {
    let randomNumber = Math.floor(Math.random() * 7);
    
    if (randomNumber === 0) {
        return new TypeA();
    }
    if (randomNumber === 1) {
        return new TypeB();
    }
    if (randomNumber === 2) {
        return new TypeC();
    }
    if (randomNumber === 3) {
        return new TypeD();
    }
    if (randomNumber === 4) {
        return new TypeE();
    }
    if (randomNumber === 5) {
        return new TypeF();
    }
    if (randomNumber === 6) {
        return new TypeG();
    }
}

function keyInput() {
    window.addEventListener('keydown', (e) => {
        switch (e.code) {
            case 'ArrowDown':
                console.log('ArrowDown');
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
            default:
                break;
        }
    });
}