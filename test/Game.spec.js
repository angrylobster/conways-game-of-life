const { expect } = require('chai');
const { ALIVE, DEAD } = require('../src/constants');

const Game = require('../src/Game');

describe('Game', () => {

    let game;

    beforeEach(() => game = new Game(3, 3));

    it('should work', () => {
        expect(1).to.equal(1);
    });

    it('should be a class "Game"', () => {
        expect(game).to.be.instanceOf(Game);
    });

    it('should contains a list of cells', () => {
        expect(game.cellList).to.be.an('array');
    });

    it('should return a number cells equals to the width * height', () => {
        expect(game.cellList.length).to.equal(9);
    });

    it('should return a list of dead cells', () => {
        expect(game.cellList.every(cell => cell === DEAD)).to.be.true;
    });

    it('should be able to return value of a cell based on coordinates', () => {
        expect(game.getCell(0, 1)).to.eq(DEAD);
    });

    it('should be able to set value of a cell to alive using coordinates', () => {
        const x = 1;
        const y = 2;
        game.setAlive(x, y);
        expect(game.getCell(x, y)).to.equal(ALIVE);
    });

    it('should be able to set value of a cell to dead using coordinates', () => {
        const x = 1;
        const y = 2;
        game.setAlive(x, y);
        game.setDead(x, y);
        expect(game.getCell(x, y)).to.eq(DEAD);
    });

    it('should determine the next state of a cell', () => {
        expect(game.calNextState(DEAD, 0)).to.eq(DEAD);
        expect(game.calNextState(DEAD, 2)).to.eq(DEAD);
        expect(game.calNextState(DEAD, 3)).to.eq(ALIVE);
        expect(game.calNextState(DEAD, 5)).to.eq(DEAD);
        expect(game.calNextState(ALIVE, 0)).to.eq(DEAD);
        expect(game.calNextState(ALIVE, 2)).to.eq(ALIVE);
        expect(game.calNextState(ALIVE, 3)).to.eq(ALIVE);
        expect(game.calNextState(ALIVE, 5)).to.eq(DEAD);
    });

    it('should calculate number of alive mates', () => {
        const x = 1;
        const y = 2;
        expect(game.calAliveMates(x, y)).to.eq(0);
        game.setAlive(x, y);
        expect(game.calAliveMates(x - 1, y)).to.eq(1);
    });

    it('should get mates indices', () => {
        const x = 1;
        const y = 2;
        const indices = game.getMatesIndices(x, y);
        expect(indices).to.deep.equal([
            [0, 1],
            [0, 2],
            [1, 1],
            [2, 1],
            [2, 2],
        ]);
    });

    it('should get next board on ALIVE -> STARVED', () => {
        game.setAlive(1, 1);
        game.next();
        expect(game.getCell(1, 1)).to.be.eq(DEAD);
    });

    it('should get next board when reproduce', () => {
        game.setAlive(0, 0);
        game.setAlive(1, 0);
        game.setAlive(0, 1);
        game.next();
        expect(game.getCell(1, 1)).to.equal(ALIVE);

    });

    it('should returns display string', () => {
        game.setAlive(1, 2);
        expect(game.display()).to.be.eq('...\n..*\n...\n');
    });
});