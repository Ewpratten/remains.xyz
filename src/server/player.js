/**
 * This file handles player movement and interaction
 */

const Constants = require("../shared/constants");

class Player {
    constructor(socket, username) {

        // Connection
        this.socket = socket;
        this.isReal = (socket != null);
        this.username = username;

        // Health
        this.health = 100;

        // Movement
        this.x = 0.0;
        this.y = 0.0;
        this.speed = 100;

        // Weapon
        this.weapon = 0;

        // Ammo
        this.ammo = Constants.startingAmmo;

        // dt
        this.lastTime = new Date().getTime() / 1000;
    }

    handleClientPacket(data, world) {

        // Fix speed hax by doing speed calculations server-side
        let time = new Date().getTime() / 1000;
        let dt = time - this.lastTime;
        this.lastTime = time;
        let speed = this.speed * dt;

        // Handle movement
        let newX = this.x;
        if (data.left) {
            newX -= speed;
        }
        if (data.right) {
            newX + speed;
        }

        // Handle X collision
        if (world.isColliding(newX, this.y)) {
            newX = this.x;
        }
        this.x = newX;

        let newY = this.y;
        if (data.up) {
            newY -= speed;
        }
        if (data.down) {
            newY + speed;
        }

        // Handle X collision
        if (world.isColliding(this.x, newY)) {
            newY = this.y;
        }
        this.y = newY;

    }

    getPlayerPosition() {
        return { x: this.x, y: this.y };
    }

}

module.exports = {
    Player: Player
}