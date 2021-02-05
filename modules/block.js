class Block {
    constructor(_structure, _color) {
        this.structure = _structure;
        this.coordinateX = 0;
        this.coordinateY = 3;
        this.coordinates = [
            [this.coordinateX + this.structure[0][0], this.coordinateY + this.structure[0][1]],
            [this.coordinateX + this.structure[1][0], this.coordinateY + this.structure[1][1]],
            [this.coordinateX + this.structure[2][0], this.coordinateY + this.structure[2][1]],
            [this.coordinateX + this.structure[3][0], this.coordinateY + this.structure[3][1]]
        ];
        this.state = true; // true 움직임, false 멈춤
        this.color = _color;
        this.ground = 19;
    }

    getCoordinates() {
        this.coordinates = [
            [this.coordinateX + this.structure[0][0], this.coordinateY + this.structure[0][1]],
            [this.coordinateX + this.structure[1][0], this.coordinateY + this.structure[1][1]],
            [this.coordinateX + this.structure[2][0], this.coordinateY + this.structure[2][1]],
            [this.coordinateX + this.structure[3][0], this.coordinateY + this.structure[3][1]]
        ];
        return this.coordinates;
    }

    getColor() {
        return this.color;
    }

    getGround() {
        return this.ground;
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
        } else {
            this.state = false;
            console.log('false!');
        }
    }

    // TODO: 회전 기능
    // 일정 범위(정사각형)을 기준으로 회전 막대기만 4*4 나머지 3*3
    // 벽에 붙어서 쓰면 유효 범위로 이동
    // Table에게 블록 옆에 벽이 있는지 물어보기(좌, 우 각각)
    // 회전 시 블록의 위치에 블록이 있다면 회전 불가
}

export { Block };