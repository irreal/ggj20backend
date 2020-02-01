class DrawBoard {

    constructor(config) {
        this.configuration = config;
        this.db = this.getEmptyBoard();
    }

    getEmptyBoard() {
        const newBoard = Array(this.configuration.width);
        for (let i = 0; i < this.configuration.width; i++) {
            newBoard[i] = Array(this.configuration.height).fill(0);
        }
        return newBoard;
    }

    validateCoordinates(x, y) {
        if (x >= this.configuration.width || y >= this.configuration.height || x < 0 || y < 0) {
            throw new Error(`Invalid index supplied must be between 0 and ${this.configuration.width - 1} for x and between 0 and ${this.configuration.height - 1} for y. got x = ${x} y = ${y}`);
        }
    }
    setCoords(x, y, value) {
        this.validateCoordinates(x, y);
        this.db[x][y] = value;
    }

    getCoords(x, y) {
        this.validateCoordinates(x, y);
        return this.db[x][y];
    }
}
module.exports = DrawBoard;