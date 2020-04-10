const Constants = require("../shared/constants");

function collision(p1x, p1y, r1, p2x, p2y, r2) {
    var a;
    var x;
    var y;

    a = r1 + r2;
    x = p1x - p2x;
    y = p1y - p2y;

    if (a > Math.sqrt((x * x) + (y * y))) {
        return true;
    } else {
        return false;
    }
}

class Bullet {

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
        return collision(this.x, this.y, Constants.bulletSize, x, y, r);
    }
}

module.exports = {
    Bullet: Bullet
}