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
        this.players.push(new player.Player(socket, username));

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

        // Add listener for player movement
        socket.on(commsg.USER_INPUT, (dat) => {
            for (let i = 0; i < outerClass.players.length; i++) {
                if (outerClass.players[i].socket == socket) {
                    // Handle this player's movement
                    outerClass.players[i].handleClientPacket(dat, outerClass.world);
                }
            }
        })

    }

    update() {

        // Build locations listing
        let locations = []
        this.players.forEach((player) => {
            locations.push({ username: player.username, x: player.x, y: player.y });
        });

        // Notify all players of movement
        this.players.forEach((player) => {
            player.socket.emit(commsg.GAME_FRAME, { player_positions: locations, health: player.health, ammo: player.ammo });
        })

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