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
    }

    gravity() {
        let ground = 19;
        if (this.coordinates[0][0] < ground && this.coordinates[1][0] < ground && this.coordinates[2][0] < ground && this.coordinates[3][0] < ground) {
            this.coordinateX++;
            this.state = false;
        }
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
}

export { Block };