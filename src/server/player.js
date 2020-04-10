/**
 * This file handles player movement and interaction
 */

const Constants = require("../shared/constants");
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

        // Movement
        this.x = 0.0;
        this.dx = 0.0;
        this.y = 0.0;
        this.dy = 0.0;
        this.speed = 20;

        // Weapon
        this.weapon = 0;

        // Ammo
        this.ammo = Constants.startingAmmo;

        // dt
        this.lastTime = new Date().getTime() / 1000;

        // Configure movement callback
        let outerClass = this;
        socket.on(commsg.USER_INPUT, (data) => {
            // Set XY
            outerClass.dx = Math.max(Math.min(data.dx, outerClass.speed), -outerClass.speed);
            outerClass.dy = Math.max(Math.min(data.dy, outerClass.speed), -outerClass.speed);

            // Get list of all players & bullets
            let response = { server: outerClass.server.getServerData(), health: outerClass.health, ammo: outerClass.ammo, me: { x: outerClass.x, y: outerClass.y } };

            // Send back server data
            this.socket.emit(commsg.GAME_FRAME, response);
        });
    }


    updatePlayerPos(world) {

        // Fix speed hax by doing speed calculations server-side
        let time = new Date().getTime() / 1000;
        let dt = time - this.lastTime;
        this.lastTime = time;
        let speed = this.speed * dt;

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