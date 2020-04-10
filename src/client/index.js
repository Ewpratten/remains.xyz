const styleBuilder = require("./stylebuilder.js");
const serverListBuilder = require("./serverlistbuilder.js");
const Constants = require('../shared/constants');
import { getServerList, connect, joinGame, setupGameHandler } from './networking';
import { setServerFrame } from "./gamestate";

// Load the game CSS
import './css/main.css';
import './css/menu.css';
import './css/leaderboard.css';

// Inject auto-generated styles into page
console.log("Injecting document styles");
styleBuilder.setDocumentTheme();

// Configure the server list
let serverList = {};
function updateServerList() {
    getServerList((servers) => {
        serverList = {};
        serverList = servers;
        serverListBuilder.clearServerList();
        Object.keys(servers).forEach((key) => {

            // Determine the number of players to show
            let fillage = Math.max(servers[key], 25);

            console.log(`Server ${key} has ${fillage} players online`);

            // Generate the HTML
            let html = serverListBuilder.buildHTMLForServer(key, fillage);

            // Add the server to the list
            serverListBuilder.addServerToList(html);
        })
    });
}
setInterval(updateServerList, 30000);
updateServerList();

// Game setup elements
const serverSelectMenu = document.getElementById("server-select");
const usernameMenu = document.getElementById("username-input");
const usernameInput = document.getElementById("username-input-box");
const playButton = document.getElementById("play-button");
const leaderboard = document.getElementById("leaderboard")

// Function for server connect
function connectToServer(server) {
    console.log("Player wants to connect to " + server);

    // Check the user count for the selected server
    let userCount = serverList[server];

    // Check with the server if we can connect 
    let canConnect = userCount < Constants.usersPerServer;

    if (canConnect) {
        // Hide the server connection menu
        serverSelectMenu.classList.add("hidden");

        // Show the username menu
        usernameMenu.classList.remove("hidden");
        usernameInput.focus();

        // Handle play button
        playButton.onclick = () => {
            console.log("Starting game");
            usernameMenu.classList.add("hidden");
            joinGame(server, usernameInput.value);
            setupGameHandler(setServerFrame);
            leaderboard.classList.remove("hidden");
        }
    } else {
        document.getElementById("too-many-users-error").classList.remove("hidden");
    }
}
window.connectToServer = connectToServer;

// SHow the server selection menu
serverSelectMenu.classList.remove('hidden');

Promise.all([
    connect()
]).then(() => {

    // SHow the server selection menu
    serverSelectMenu.classList.remove('hidden');

    // usernameInput.focus();
    // playButton.onclick = () => {
    //     // Play!
    //     play(usernameInput.value);
    //     playMenu.classList.add('hidden');
    //     initState();
    //     startCapturingInput();
    //     startRendering();
    //     setLeaderboardHidden(false);
    // };
});