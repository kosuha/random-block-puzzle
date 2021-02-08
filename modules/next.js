import { Block } from './block.js';

class Next {
    constructor() {
        this.length = 3;
        this.data = [];
        this.width = 4;
        this.height = 3;
        this.queue = [];
        this.positions = [[0, 0], [3, 0], [6, 0]];
    }

    reset() {
        this.queue = [];
        for (let i = 0; i < this.data.length; i++) {
            for (let j = 0; j < this.data[i].length; j++) {
                this.data[i][j] = 'white';
            }
        }
    }

    addQueue() {
        while (this.needMoreQueue()) {
            this.queue.push(this.randomBlockGenerator());
        }
        let nextBlock = this.queue.shift();
        this.queue.push(this.randomBlockGenerator());
        this.updateData();
        this.display();
        return nextBlock;
    }

    needMoreQueue() {
        return this.queue.length < this.length
    }

    generateTable() {
        const next = document.querySelector('#next');
        const fragment = document.createDocumentFragment();
        const rowLength = this.width;
        const columnLength = this.height * this.length;
        for (let i = 0; i < columnLength; i++) {
            const tr = document.createElement('tr');
            let array = [];
            this.data.push(array);
            fragment.appendChild(tr);
            for (let j = 0; j < rowLength; j++) {
                const td = document.createElement('td');
                tr.appendChild(td);
                array.push('');
            }
        }

        next.appendChild(fragment);
    }

    display() {
        const next = document.querySelector('#next');
        this.data.forEach((tr, i) => {
            tr.forEach((td, j) => {
                next.children[i].children[j].style.backgroundColor = this.data[i][j];
            });
        });
    }

    cleanData() {
        this.data.forEach((tr, i) => {
            tr.forEach((td, j) => {
                this.data[i][j] = 'white';
            });
        });
    }

    updateData() {
        this.cleanData();
        for (let i = 0; i < this.length; i++) {
            for (let j = 0; j < this.queue[i].getPosition().length; j++) {
                let x = this.queue[i].getPosition()[j][0] + this.positions[i][0];
                let y = this.queue[i].getPosition()[j][1] + this.positions[i][1];
                this.data[x][y] = this.queue[i].getColor();
            }
        }
    }

    block() {
        return this.queue.shift();
    }

    randomBlockGenerator() {
        let nextNumber = Math.floor(Math.random() * 7)

        if (nextNumber === 0) {
            let structure = [
                [1, 1],
                [1, 1]
            ];
            return new Block(structure, 'yellow');
        }
        if (nextNumber === 1) {
            let structure = [
                [0, 0, 0, 0],
                [1, 1, 1, 1],
                [0, 0, 0, 0],
                [0, 0, 0, 0]
            ];
            return new Block(structure, 'skyblue');
        }
        if (nextNumber === 2) {
            let structure = [
                [0, 1, 0],
                [1, 1, 1],
                [0, 0, 0]
            ];
            return new Block(structure, 'violet');
        }
        if (nextNumber === 3) {
            let structure = [
                [1, 0, 0],
                [1, 1, 1],
                [0, 0, 0]
            ];
            return new Block(structure, 'blue');
        }
        if (nextNumber === 4) {
            let structure = [
                [0, 0, 1],
                [1, 1, 1],
                [0, 0, 0]
            ];
            return new Block(structure, 'orange');
        }
        if (nextNumber === 5) {
            let structure = [
                [1, 1, 0],
                [0, 1, 1],
                [0, 0, 0]
            ];
            return new Block(structure, 'red');
        }
        if (nextNumber === 6) {
            let structure = [
                [0, 1, 1],
                [1, 1, 0],
                [0, 0, 0]
            ];
            return new Block(structure, 'green');
        }
    }
}

export { Next };