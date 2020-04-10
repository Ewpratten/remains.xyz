const player = require("./player")

class BotPlayer extends player.Player {

    updatePlayerPos(world) {

        // Handle death marking
        if (this.health <= 0) {
            this.alive = false;
        }

        // Set the time alive
        this.aliveTime = Math.round((new Date().getTime() / 1000) - this.spawnTime);

        // Get distance to closest player
        let closestDist = 1000000000;
        let closest = { x: 1, y: 0 };
        for (let i = 0; i < this.server.players.length; i++) {

            // Find distance to player
            let dist = Math.abs(Math.hypot(this.x - this.server.players[i].x, this.y - this.server.players[i].y));

            // If this is closer, set it
            if (dist < closestDist && dist != 0) {
                closest.x = this.x - this.server.players[i].x;
                closest.y = this.y - this.server.players[i].y;
                closestDist = dist;
            }
        }

        // Move to the closest player
        // Fix speed hax by doing speed calculations server-side
        let time = new Date().getTime() / 1000;
        let dt = time - this.lastTime;
        this.lastTime = time;
        let speed = this.speed * dt;

        // Clamp speed
        this.dx = Math.max(Math.min(closest.x, this.speed), -this.speed);
        this.dy = Math.max(Math.min(closest.y, this.speed), -this.speed);


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
    BotPlayer: BotPlayer
}