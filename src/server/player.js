/**
 * This file handles player movement and interaction
 */

const Constants = require("../shared/constants");
const bullet = require("./bullet")
const commsg = require("../shared/commsg");

class Player {
    constructor(socket, username, server) {

        // Connection
        this.socket = socket;
        this.isReal = (socket != null);
        this.username = username;
        this.server = server;

        // Health
        this.health = 100;
        this.alive = true;

        // Movement
        this.x = 0.0;
        this.dx = 0.0;
        this.y = 0.0;
        this.dy = 0.0;
        this.speed = 15;

        // Weapon
        this.weapon = 0;

        // Ammo
        this.ammo = Constants.startingAmmo;

        // dt
        this.lastTime = new Date().getTime() / 1000;
        this.spawnTime = new Date().getTime() / 1000;
        this.aliveTime = 0.0;

        // Configure movement callback
        let outerClass = this;
        socket.on(commsg.USER_INPUT, (data) => {
            // Set XY
            outerClass.dx = data.dx;
            outerClass.dy = data.dy;

            // Get vector normal
            let length = Math.sqrt(data.rdx * data.rdx + data.rdy * data.rdy);
            let normdx = data.rdx / length;
            let normdy = data.rdy / length;

            // Handle bullets
            if (data.click && (normdx != 0.0 || normdy != 0.0)) {
                let b = new bullet.Bullet(outerClass.x, outerClass.y, normdx, normdy);

                // Force the bullet to "teleport" away from player
                b.update();
                outerClass.server.spawnBullet(b);

            }

            // Set the time alive
            outerClass.aliveTime = Math.round((new Date().getTime() / 1000) - outerClass.spawnTime);

            // Get list of all players & bullets
            let response = { server: outerClass.server.getServerData(), health: outerClass.health, ammo: outerClass.ammo, me: { x: outerClass.x, y: outerClass.y }, timeAlive: outerClass.aliveTime };

            // Send back server data
            if (outerClass.alive) {
                this.socket.emit(commsg.GAME_FRAME, response);
            }

            // As soon as we notify the client of death, mark this player for removal
            if (outerClass.health <= 0) {
                outerClass.alive = false;
            }
        });
    }


    updatePlayerPos(world) {

        // Fix speed hax by doing speed calculations server-side
        let time = new Date().getTime() / 1000;
        let dt = time - this.lastTime;
        this.lastTime = time;
        let speed = this.speed * dt;

        // Clamp speed
        this.dx = Math.max(Math.min(this.dx, this.speed), -this.speed);
        this.dy = Math.max(Math.min(this.dy, this.speed), -this.speed);

        // Handle movement
        let newX = this.x + this.dx;

        // Handle X collision
        if (world.isColliding(newX, this.y)) {
            newX = this.x;
        }

        this.x = newX;

        let newY = this.y + this.dy;

        // Handle Y collision
        if (world.isColliding(this.x, newY)) {
            newY = this.y;
        }
        this.y = newY;
    }
}

module.exports = {
    Player: Player
}