class Table {
    constructor() {
        this.data = [];
        this.ground = 22;
        this.width = 10;
        this.height = 20;
        this.invisibleTop = 3;
        this.countLineCleared = 0;
        this.level = 1;
        this.score = 0;
        this.speed = 1000;
        this.speedUpSet = 0.8;
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

    getSpeed() {
        return this.speed;
    }

    setCountLineCleared(count) {
        this.countLineCleared = this.countLineCleared + count;
    }

    setLevel() {
        if ((this.countLineCleared / 10) >= this.level) {
            this.speed = this.speed * this.speedUpSet;
            this.level++;
            const levelTag = document.querySelector('#level');
            levelTag.textContent = `Level ${this.level}`;
        }
    }

    setScore(combo) {
        this.score = this.score + (this.level * combo);
        const scoreTag = document.querySelector('#score');
        scoreTag.textContent = `Score: ${this.score}`;
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
            if (rotatedCoordinates[i][0] > this.ground) {
                return false;
            }
            if (this.data[rotatedCoordinates[i][0]][rotatedCoordinates[i][1]].movable === false) {
                return false;
            }

        }
        return true;
    }

    rotatableLeft(rotatedCoordinates) {
        for (let i = 0; i < rotatedCoordinates.length; i++) {
            if (rotatedCoordinates[i][1] < 0) {
                return false;
            }
        }
        return true;
    }

    rotatableRight(rotatedCoordinates) {
        for (let i = 0; i < rotatedCoordinates.length; i++) {
            if (rotatedCoordinates[i][1] > 9) {
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
                    let gameOverTag = document.createElement('div');
                    gameOverTag.id = 'gameOver';
                    let tagContainer = document.createElement('div');
                    tagContainer.id = 'gameOverContainer';
                    tagContainer.appendChild(gameOverTag);
                    game.appendChild(tagContainer);
                    gameOverTag.textContent = 'GAME OVER';
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
            for (let j = 0; j < rowLength; j++) {
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

    reset() {
        this.countLineCleared = 0;
        this.level = 1;
        this.score = 0;
        this.speed = 1000;

        for (let i = 0; i < this.data.length; i++) {
            for (let j = 0; j < this.data[i].length; j++) {
                this.data[i][j].color = 'white';
                this.data[i][j].movable = true;
            }
        }
    }

    lineClear() {
        let linesToClear = [];
        for (let i = 0; i < this.data.length; i++) {
            let movableCount = 0;
            for (let j = 0; j < this.data[i].length; j++) {
                if (this.data[i][j].movable === false) {
                    movableCount++;
                }
            }
            if (movableCount === 10) {
                linesToClear.push(i);
            }
        }

        for (let i = 0; i < linesToClear.length; i++) {
            let array = [];
            for (let i = 0; i < this.width; i++) {
                let dataObject = {
                    color: '',
                    movable: true
                }
                array.push(dataObject);
            }
            this.data.splice(linesToClear[i], 1);
            this.data.unshift(array);
            
            this.setCountLineCleared(1);
            this.setLevel();
            this.setScore(linesToClear.length);
        }
    }
}

export { Table };