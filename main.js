const Game = require('./src/Game');

const g = new Game(10, 10);

for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
        if (Math.random() > 0.1) g.setAlive(i, j);
    }
}

for (let i = 0; i < 20; i++) {

    console.log(g.display());
    g.next();
}
