/**
 * This file contains the code that powers the fake servers used ingame for player sorting
 */
const player = require("./player")
const bullet = require("./bullet")
const world = require("./world")
const Constants = require('../shared/constants');
const commsg = require("../shared/commsg");
const botplayer = require("./botplayer")
const namegen = require("./namegen")

const MAX_PLAYERS_PER_SERVER = Constants.usersPerServer;

class FakeServer {

    constructor(name) {
        this.name = name;
        this.bullets = [];
        this.players = [];
        this.realPlayerCount = 0;
        this.world = new world.World();
        this.lastAmmoDropTime = (new Date().getTime() / 1000);
    }

    getRealPlayerCount() {
        return Math.max(this.realPlayerCount, (Math.random()*Constants.usersPerServer*0.4));
    }

    addPlayer(socket, username) {

        // Add the new player
        this.players.push(new player.Player(socket, username, this, 0, 0));
        this.realPlayerCount += 1;

        // Add a listener for player disconnect
        let outerClass = this;
        socket.on('disconnect', () => {
            console.log(`${username} removed from server`);
            for (let i = 0; i < outerClass.players.length; i++) {
                if (outerClass.players[i].socket == socket) {
                    outerClass.players.splice(i, 1);
                    outerClass.realPlayerCount -= 1;
                }
            }
        })

    }

    update() {

        // Fill empty slots
        if (this.players.length < Constants.usersPerServer && this.realPlayerCount >0) {
            let bot = new botplayer.BotPlayer(null, namegen.randName(), this, Math.floor((Math.random() * Constants.worldSize[0]) + 1) - (Constants.worldSize[0] / 2), Math.floor((Math.random() * Constants.worldSize[1]) + 1) - (Constants.worldSize[1] / 2));
            bot.spawnTime = (new Date().getTime() / 1000) + (Math.random() * Constants.usersPerServer);
            this.players.push(bot);
        }

        // Kill bots if nobody is online
        if (this.realPlayerCount == 0) {
            this.players = [];
        }

        // Handle ammo distribution
        let shouldAllowAmmo = false;
        if (((new Date().getTime() / 1000) - this.lastAmmoDropTime) >= Constants.ammoTime.time) {
            shouldAllowAmmo = true;
            this.lastAmmoDropTime = (new Date().getTime() / 1000);
        }

        // Update all players
        for (let i = 0; i < this.players.length; i++) {
            this.players[i].updatePlayerPos(this.world);

            // Allow ammo if specified
            if (shouldAllowAmmo) {
                this.players[i].ammo += Constants.ammoTime.ammo;
            }

            // If the player is dead, kick them from the server
            if (!this.players[i].alive) {
                console.log(`${this.players[i].username} died`);
                this.players.splice(i, 1);
            }

        }

        // Update all bullets
        for (let i = 0; i < this.bullets.length; i++) {
            this.bullets[i].update();

            // Check for collisions
            if (this.world.isColliding(this.bullets[i].x, this.bullets[i].y)) {
                this.bullets.splice(i, 1);
                continue;
            }

            // Check for player<->bullet collisions

            for (let j = 0; j < this.players.length; j++) {
                if (this.bullets[i].collidesWith(this.players[j].x, this.players[j].y, Constants.playerSize)) {
                    this.bullets.splice(i, 1);
                    this.players[j].health -= Constants.bulletDamage;
                    break;
                }
            }
        }

    }

    getServerData() {

        // Build a list of all player positions
        let playerPositions = [];
        this.players.forEach((player) => {
            playerPositions.push({ username: player.username, x: player.x, y: player.y, timeAlive: player.aliveTime, health:player.health });
        })

        // Build a list of bullet positions
        let bulletPositions = [];
        this.bullets.forEach((bullet) => {
            bulletPositions.push({ x: bullet.x, y: bullet.y });
        })

        return { players: playerPositions, bullets: bulletPositions };
    }

    spawnBullet(bullet) {
        this.bullets.push(bullet);
    }
}

// Create a map of servers from those defined as constants
function buildServers() {
    let serverMap = {};
    Constants.servers.forEach((server) => {
        serverMap[server] = new FakeServer(server);
    })

    return serverMap;
}

module.exports = { serverMap: buildServers() };

// Server logic handling
function handleAllServerLogic() {
    Object.keys(module.exports.serverMap).forEach((key) => {
        module.exports.serverMap[key].update();
    })
}
setInterval(handleAllServerLogic, 50);