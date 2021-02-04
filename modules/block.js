class Block {
    constructor() {
        this.coordinateX = 0;
        this.coordinateY = 3;
        this.state = true;
    }

}

class TypeA extends Block {
    constructor() {
        super();
        this.coordinates = [
            [this.coordinateX, this.coordinateY + 1],
            [this.coordinateX, this.coordinateY + 2],
            [this.coordinateX + 1, this.coordinateY + 1],
            [this.coordinateX + 1, this.coordinateY + 2]
        ];
    }

    getCoordinates() {
        return this.coordinates;
    }
}

class TypeB extends Block {
    constructor() {
        super();
        this.coordinates = [
            [this.coordinateX + 1, this.coordinateY + 0],
            [this.coordinateX + 1, this.coordinateY + 1],
            [this.coordinateX + 1, this.coordinateY + 2],
            [this.coordinateX + 1, this.coordinateY + 3]
        ];
    }

    getCoordinates() {
        return this.coordinates;
    }
}

export { Block, TypeA, TypeB };