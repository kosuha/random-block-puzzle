export class Table {
    constructor() {
        this.data = [];
    }

    getData() {
        return this.data;
    }

    cleanData() {
        this.data.forEach((tr, i) => {
            tr.forEach((td, j) => {
                this.data[i][j] = 'white';
            });
        });
        console.log(this.data);
    }

    // 블록이 차지하는 좌표 값의 배열을 받아서 table data을 변경
    updateData(coordinates, color) {
        coordinates.forEach(element => {
            this.data[element[0]][element[1]] = color;
        });
        // console.log(this.data);
    }

    display() {
        const tetris = document.querySelector('#tetris');
        this.data.forEach((tr, i) => {
            tr.forEach((td, j) => {
                tetris.children[i].children[j].style.backgroundColor = this.data[i][j];
            });
        });
    }

    generate() {
        const tetris = document.querySelector('#tetris');
        const fragment = document.createDocumentFragment();
        const rowLength = 10;
        const columnLength = 20;
        for (let i = 0; i < columnLength; i++) {
            const tr = document.createElement('tr');
            let array = [];
            this.data.push(array);
            fragment.appendChild(tr);
            for (let i = 0; i < rowLength; i++) {
                const td = document.createElement('td');
                tr.appendChild(td);
                array.push('');
            }
        }
        tetris.appendChild(fragment);
    }
}