const tetris = document.querySelector('#tetris');

let tetrisData = [];

generateTable();

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

function generateTable() {
    const fragment = document.createDocumentFragment();
    const rowLength = 10;
    const columnLength = 20;
    for (let i = 0; i < columnLength; i++) {
        const tr = document.createElement('tr');
        let array = [];
        tetrisData.push(array);
        fragment.appendChild(tr);
        for (let i = 0; i < rowLength; i++) {
            const td = document.createElement('td');
            tr.appendChild(td);
            array.push(0);
        }
    }
    tetris.appendChild(fragment);
}