export class Table {
    constructor() {
        this.data = [];
        this.ground = 22;
        this.width = 10;
        this.height = 20;
        this.invisibleTop = 3;
    }

    getData() {
        return this.data;
    }

    // 모든 칸을 'white'로 설정
    cleanData() {
        this.data.forEach((tr, i) => {
            tr.forEach((td, j) => {
                if (this.data[i][j].movable === true) {
                    this.data[i][j].color = 'white';
                }
            });
        });
    }

    // 블록이 차지하는 좌표 값의 배열을 받아서 table data을 변경
    updateData(_coordinates, _color, _movable) {
        this.cleanData();
        _coordinates.forEach(element => {
            this.data[element[0]][element[1]].color = _color;
            this.data[element[0]][element[1]].movable = _movable;
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

    // 블록의 스톱포지션을 확인하고 블록 상태를 바꿈 
    stopPosition(_block) {
        _block.getCoordinates().forEach(element => {
            if (element[0] < this.ground) {
                if (this.data[element[0] + 1][element[1]].movable === false) {
                    _block.setState(false);
                }
            } else {
                _block.setState(false);
            }
        });
    }

    rotatable(rotatedCoordinates) {
        for (let i = 0; i < rotatedCoordinates.length; i++) {
            if (this.data[rotatedCoordinates[i][0]][rotatedCoordinates[i][1]].movable === false) {
                return false;
            }
        }
        return true;
    }

    movableLeft(_coordinates) {
        for (let i = 0; i < _coordinates.length; i++) {
            if (_coordinates[i][1] <= 0) {
                return false;
            } else if (this.data[_coordinates[i][0]][_coordinates[i][1] - 1].movable === false) {
                return false;
            }
        }

        return true;
    }

    movableRight(_coordinates) {
        for (let i = 0; i < _coordinates.length; i++) {
            if (_coordinates[i][1] > 8) {
                return false;
            } else if (this.data[_coordinates[i][0]][_coordinates[i][1] + 1].movable === false) {
                return false;
            }
        }
        return true;
    }

    gameOverCondition() {
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < this.data[i].length; j++) {
                if (this.data[i][j].movable === false) {
                    console.log('gameover');
                    return true;
                }
            }
        }
        return false;
    }

    generate() {
        const tetris = document.querySelector('#tetris');
        const fragment = document.createDocumentFragment();
        const rowLength = this.width;
        const columnLength = this.height + this.invisibleTop;
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
                    movable: true
                }
                array.push(dataObject);
            }
        }

        tetris.appendChild(fragment);
        for (let i = 0; i < this.invisibleTop; i++) {
            tetris.children[i].style.display = 'none';
        }
    }
}