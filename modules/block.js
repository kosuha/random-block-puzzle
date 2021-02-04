class Block {
    constructor() {
        this.coordinateX = 0;
        this.coordinateY = 3;
        this.state = true; // true 움직임, false 멈춤
    }

}

class TypeA extends Block {
    constructor() {
        super();
        this.coordinates = [
            [this.coordinateX + 0, this.coordinateY + 1],
            [this.coordinateX + 0, this.coordinateY + 2],
            [this.coordinateX + 1, this.coordinateY + 1],
            [this.coordinateX + 1, this.coordinateY + 2]
        ];
        this.color = 'yellow';
    }

    getCoordinates() {
        return this.coordinates;
    }

    getColor() {
        return this.color;
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
        this.color = 'skyblue';
    }

    getCoordinates() {
        return this.coordinates;
    }

    getColor() {
        return this.color;
    }
}

class TypeC extends Block {
    constructor() {
        super();
        this.coordinates = [
            [this.coordinateX + 0, this.coordinateY + 1],
            [this.coordinateX + 1, this.coordinateY + 0],
            [this.coordinateX + 1, this.coordinateY + 1],
            [this.coordinateX + 1, this.coordinateY + 2]
        ];
        this.color = 'violet';
    }

    getCoordinates() {
        return this.coordinates;
    }

    getColor() {
        return this.color;
    }
}

class TypeD extends Block {
    constructor() {
        super();
        this.coordinates = [
            [this.coordinateX + 0, this.coordinateY + 0],
            [this.coordinateX + 1, this.coordinateY + 0],
            [this.coordinateX + 1, this.coordinateY + 1],
            [this.coordinateX + 1, this.coordinateY + 2]
        ];
        this.color = 'blue';
    }

    getCoordinates() {
        return this.coordinates;
    }

    getColor() {
        return this.color;
    }
}

class TypeE extends Block {
    constructor() {
        super();
        this.coordinates = [
            [this.coordinateX + 0, this.coordinateY + 2],
            [this.coordinateX + 1, this.coordinateY + 0],
            [this.coordinateX + 1, this.coordinateY + 1],
            [this.coordinateX + 1, this.coordinateY + 2]
        ];
        this.color = 'orange';
    }

    getCoordinates() {
        return this.coordinates;
    }

    getColor() {
        return this.color;
    }
}

class TypeF extends Block {
    constructor() {
        super();
        this.coordinates = [
            [this.coordinateX + 0, this.coordinateY + 0],
            [this.coordinateX + 0, this.coordinateY + 1],
            [this.coordinateX + 1, this.coordinateY + 1],
            [this.coordinateX + 1, this.coordinateY + 2]
        ];
        this.color = 'red';
    }

    getCoordinates() {
        return this.coordinates;
    }

    getColor() {
        return this.color;
    }
}

class TypeG extends Block {
    constructor() {
        super();
        this.coordinates = [
            [this.coordinateX + 0, this.coordinateY + 1],
            [this.coordinateX + 0, this.coordinateY + 2],
            [this.coordinateX + 1, this.coordinateY + 0],
            [this.coordinateX + 1, this.coordinateY + 1]
        ];
        this.color = 'green';
    }

    getCoordinates() {
        return this.coordinates;
    }

    getColor() {
        return this.color;
    }
}

export { Block, TypeA, TypeB, TypeC, TypeD, TypeE, TypeF, TypeG };