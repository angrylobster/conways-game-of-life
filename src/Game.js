
const { ALIVE, CELL_STRINGS, DEAD, NEW_LINE_STRING } = require('./constants');

const calIndex = Symbol();
const isIndexOutOfBounds = Symbol();
const isSameCell = Symbol();
const calXY = Symbol();

class Game {
    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.cellList = Array(width * height).fill(DEAD);
    }

    [calIndex](x, y) {
        return x * this.width + y;
    }

    [calXY](i) {
        return [i / this.width, i % this.width];
    }

    getCell(x, y) {
        return this.cellList[this[calIndex](x, y)];
    }

    setAlive(x, y) {
        this.cellList[this[calIndex](x, y)] = ALIVE;
    }

    setDead(x, y) {
        this.cellList[this[calIndex](x, y)] = DEAD;
    }

    next() {
        this.cellList = this.cellList.map((c, i) => this.calNextState(c, this[calXY](i)));
    }

    calNextState(state, aliveMates) {
        if (aliveMates === 3) {
            return ALIVE;
        } else if (aliveMates === 2) {
            return state;
        }
        return DEAD;
    }

    calAliveMates(x, y) {
        return this.getMatesIndices(x, y)
            .reduce((curr, val) => curr + this.getCell(...val), 0);
    }

    isSkipCell(xIndex, yIndex, x, y) {
        return this[isIndexOutOfBounds](xIndex, yIndex) || this[isSameCell](xIndex, yIndex, x, y);
    }

    [isIndexOutOfBounds](x, y) {
        return x < 0 || y < 0 || x >= this.width || y >= this.height;
    }

    [isSameCell](x, y, anotherX, anotherY) {
        return x === anotherX && y === anotherY;
    }

    getMatesIndices(x, y) {
        const result = [];

        for (let xIndex = x - 1; xIndex <= x + 1; xIndex++) {
            for (let yIndex = y - 1; yIndex <= y + 1; yIndex++) {
                if (!this.isSkipCell(xIndex, yIndex, x, y)) {
                    result.push([xIndex, yIndex]);
                }
            }
        }

        return result;
    }

    display() {
        return this.cellList.map((cell, index) => {
            let cellString = this.isDead(cell) ? CELL_STRINGS.DEAD : CELL_STRINGS.ALIVE;
            if (this.isEndOfLine(index)) {
                cellString += NEW_LINE_STRING;
            }
            return cellString;
        }).join('');
    }


    isEndOfLine(index) {
        return (index + 1) % this.width === 0;
    }

    isDead(cell) {
        return cell === DEAD;
    }
}


module.exports = Game;