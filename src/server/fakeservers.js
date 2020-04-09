/**
 * This file contains the code that powers the fake servers used ingame for player sorting
 */

const Constants = require('../shared/constants');

const MAX_PLAYERS_PER_SERVER = 100;

class FakeServer{

    realPlayerCount = 0;

    constructor(name) {
        this.name = name;
    }

    export getRealPlayerCount() {
        return this.realPlayerCount;
    }
}

// Create a map of servers from those defined as constants
export let serverMap = {};
Constants.servers.forEach((server) => {
    serverMap[server] = new FakeServer(server);
})