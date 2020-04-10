const Constants = require("../shared/constants");


class Bullet{

    constructor(x, y, dx, dy) {
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.speed = 30;
    }

    update() {
        this.x += (this.dx * this.speed);
        this.y += (this.dy * this.speed);
    }

    collidesWith(x, y, r) {
        return false;
    }
}

module.exports = {
    Bullet:Bullet
}