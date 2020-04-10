/**
 * This file contains the code that powers the fake servers used ingame for player sorting
 */
const player = require("./player")
const world = require("./world")
const Constants = require('../shared/constants');
const commsg = require("../shared/commsg");

const MAX_PLAYERS_PER_SERVER = Constants.usersPerServer;

class FakeServer {

    constructor(name) {
        this.name = name;
        this.players = [];
        this.world = new world.World();
    }

    getRealPlayerCount() {
        return this.players.length + 25; // 25 is for testing only
    }

    addPlayer(socket, username) {

        // Add the new player
        this.players.push(new player.Player(socket, username, this));

        // Add a listener for player disconnect
        let outerClass = this;
        socket.on('disconnect', () => {
            console.log(`${username} removed from server`);
            for (let i = 0; i < outerClass.players.length; i++) {
                if (outerClass.players[i].socket == socket) {
                    outerClass.players.splice(i - 1, 1);
                }
            }
        })

    }

    update() {

        // Update all players
        this.players.forEach((player) => {
            player.updatePlayerPos(this.world);
        });

    }

    getServerData() {

        // Build a list of all player positions
        let playerPositions = [];
        this.players.forEach((player) => {
            playerPositions.push({ username: player.username, x: player.x, y: player.y });
        })

        // Build a list of bullet positions
        let bulletPositions = [];

        return { players: playerPositions, bullets: bulletPositions };
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
setInterval(handleAllServerLogic, 100);