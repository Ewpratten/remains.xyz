const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const socketio = require('socket.io');
const webpackConfig = require('../../webpack.dev.js');
const commsg = require("../shared/commsg");
const fakeservers = require("./fakeservers.js");


// Setup an Express server
const app = express();
app.use(express.static('public'));

if (process.env.NODE_ENV === 'development') {
    // Setup Webpack for development
    const compiler = webpack(webpackConfig);
    app.use(webpackDevMiddleware(compiler));
} else {
    // Static serve the dist/ folder in production
    app.use(express.static('dist'));
}

// Listen on port
const port = process.env.PORT || 3000;
const server = app.listen(port);
console.log(`Server listening on port ${port}`);

// Setup socket.io
const io = socketio(server);

// Listen for socket.io connections
io.on('connection', socket => {
    console.log("Player connected", socket.id);

    // Set up socket listeners
    socket.on(commsg.QUERY_SERVERS, handleServerQuery);
    socket.on(commsg.JOIN_SERVER, handleNewPlayer);
});

function handleServerQuery(_) {
    console.log("User asked for server list");

    // Build a list of servers and their fullness
    let servers = {};
    console.log(fakeservers.serverMap);
    Object.keys(fakeservers.serverMap).forEach((key) => {
        servers[key] = fakeservers.serverMap[key].getRealPlayerCount();
    })

    this.emit(commsg.SERVER_LIST, servers);
}

function handleNewPlayer(dat) {
    if (Object.keys(fakeservers.serverMap).includes(dat.server)) {
        console.log(`${dat.username} has joined server ${dat.server}`);
        fakeservers.serverMap[dat.server].addPlayer(this, dat.username);
    } else {
        console.log(`${dat.username} tried to join non-existent server ${dat.server}`);
    }
}