import { Table } from './modules/table.js';
import { Block, TypeA, TypeB, TypeC, TypeD, TypeE, TypeF, TypeG } from './modules/block.js';

const table = new Table();
const type = []
type[0] = new TypeA();
type[1] = new TypeB();
type[2] = new TypeC();
type[3] = new TypeD();
type[4] = new TypeE();
type[5] = new TypeF();
type[6] = new TypeG();

table.generate();

let randomBlock = randomBlockGenerator();
table.setData(randomBlock.getCoordinates(), randomBlock.getColor());
table.display();

function randomBlockGenerator() {
    let randomBlock = Math.floor(Math.random() * 7);
    return type[randomBlock];
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