/**
 * This file contains the code that powers the fake servers used ingame for player sorting
 */
const player = require("./player")
const Constants = require('../shared/constants');

const MAX_PLAYERS_PER_SERVER = Constants.usersPerServer;

class FakeServer {

    constructor(name) {
        this.name = name;
        this.players = [];
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