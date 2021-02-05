export class Table {
    constructor() {
        this.data = [];
    }

    getData() {
        return this.data;
    }

    // 모든 칸을 'white'로 설정
    cleanData() {
        this.data.forEach((tr, i) => {
            tr.forEach((td, j) => {
                if (this.data[i][j].hold === true) {
                    this.data[i][j].color = 'white';
                }
            });
        });
        console.log(this.data);
    }

    // 블록이 차지하는 좌표 값의 배열을 받아서 table data을 변경
    updateData(_coordinates, _color, _hold) {
        _coordinates.forEach(element => {
            this.data[element[0]][element[1]].color = _color;
            this.data[element[0]][element[1]].hold = _hold;
        });
    }

    display() {
        const tetris = document.querySelector('#tetris');
        this.data.forEach((tr, i) => {
            tr.forEach((td, j) => {
                tetris.children[i].children[j].style.backgroundColor = this.data[i][j].color;
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
                let dataObject = {
                    color: '',
                    hold: true
                }
                array.push(dataObject);
            }
        }
        tetris.appendChild(fragment);
    }
}