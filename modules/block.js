import { table } from '../index.js';

class Block {
    constructor(_structure, _color) {
        this.structure = _structure;
        this.position = this.structureToPosition(this.structure);
        this.coordinateX = 0;
        this.coordinateY = 3;
        this.coordinates = [
            [this.coordinateX + this.position[0][0], this.coordinateY + this.position[0][1]],
            [this.coordinateX + this.position[1][0], this.coordinateY + this.position[1][1]],
            [this.coordinateX + this.position[2][0], this.coordinateY + this.position[2][1]],
            [this.coordinateX + this.position[3][0], this.coordinateY + this.position[3][1]]
        ];
        this.state = true; // true 움직임, false 멈춤
        this.color = _color;
    }

    getCoordinates() {
        this.position = this.structureToPosition(this.structure);
        this.coordinates = [
            [this.coordinateX + this.position[0][0], this.coordinateY + this.position[0][1]],
            [this.coordinateX + this.position[1][0], this.coordinateY + this.position[1][1]],
            [this.coordinateX + this.position[2][0], this.coordinateY + this.position[2][1]],
            [this.coordinateX + this.position[3][0], this.coordinateY + this.position[3][1]]
        ];
        return this.coordinates;
    }

    getColor() {
        return this.color;
    }

    getState() {
        return this.state;
    }

    setState(_state) {
        this.state = _state;
    }

    gravity() {
        if (this.state) {
            this.coordinateX++;
        }
    }

    moveLeft() {
        if (this.state && table.movableLeft(this.coordinates)) {
            this.coordinateY--;
        }
    }

    moveRight() {
        if (this.state && table.movableRight(this.coordinates)) {
            this.coordinateY++;
        }
    }

    dropDown() {
        // TODO
    }

    structureToPosition(structureArray) {
        let tempPosition = [];
        structureArray.forEach((e, i) => {
            e.forEach((f, j) => {
                if (f === 1) {
                    if (e.length === 2) {
                        tempPosition.push([i, j + 1]);
                    } else {
                        tempPosition.push([i, j]);
                    }
                }
            });
        });

        return tempPosition;
    }

    // TODO: 회전 기능
    // 일정 범위(정사각형)을 기준으로 회전 막대기만 4*4 나머지 3*3
    // 벽에 붙어서 쓰면 유효 범위로 이동
    // Table에게 블록 옆에 벽이 있는지 물어보기(좌, 우 각각)
    // 회전 시 블록의 위치에 블록이 있다면 회전 불가
    rotate90() {
        let n = this.structure.length;
        let m = this.structure[0].length;

        let rotated = new Array(n);
        for (let i = 0; i < rotated.length; i++) {
            rotated[i] = new Array(m);
        }

        // 2차원 배열 90도 회전 알고리즘
        for (let i = 0; i < rotated.length; i++) {
            for (let j = 0; j < rotated.length; j++) {
                rotated[i][j] = this.structure[n - 1 - j][i];
            }
        }

        let rotatedPosition = this.structureToPosition(rotated);
        let rotatedCoordinates = [
            [this.coordinateX + rotatedPosition[0][0], this.coordinateY + rotatedPosition[0][1]],
            [this.coordinateX + rotatedPosition[1][0], this.coordinateY + rotatedPosition[1][1]],
            [this.coordinateX + rotatedPosition[2][0], this.coordinateY + rotatedPosition[2][1]],
            [this.coordinateX + rotatedPosition[3][0], this.coordinateY + rotatedPosition[3][1]]
        ];

        if (this.state) {
            if (!table.rotatableLeft(rotatedCoordinates)) {
                for (let i = 0; i < rotatedCoordinates.length; i++) {
                    rotatedCoordinates[i][1]++;
                }
                if (table.rotatable(rotatedCoordinates) &&
                    table.rotatableLeft(rotatedCoordinates) &&
                    table.rotatableRight(rotatedCoordinates)) {
                    this.coordinateY++;
                    this.structure = rotated;
                }

            } else if (!table.rotatableRight(rotatedCoordinates)) {
                for (let i = 0; i < rotatedCoordinates.length; i++) {
                    rotatedCoordinates[i][1]--;
                }
                if (table.rotatable(rotatedCoordinates) &&
                    table.rotatableLeft(rotatedCoordinates) &&
                    table.rotatableRight(rotatedCoordinates)) {
                    this.coordinateY--;
                    this.structure = rotated;
                }

            } else if (!table.rotatable(rotatedCoordinates)) {
                for (let i = 0; i < rotatedCoordinates.length; i++) {
                    rotatedCoordinates[i][0]--;
                }
                if (table.rotatable(rotatedCoordinates)) {
                    this.coordinateX--;
                    this.structure = rotated;
                }
            } else {
                this.structure = rotated;
            }
        }
    }
}

export { Block };