import { Table } from './modules/table.js';
import { TypeA } from './modules/block.js';

const table = new Table();
const typeA = new TypeA();

table.generate();

table.setData(typeA.getCoordinates());

console.log(table.getData());

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