const styleBuilder = require("./stylebuilder.js");
const serverListBuilder = require("./serverlistbuilder.js");
const Constants = require('../shared/constants');


// Load the game CSS
import './css/main.css';
import './css/menu.css';

// Inject auto-generated styles into page
console.log("Injecting document styles");
styleBuilder.setDocumentTheme();

// Configure the server list
Constants.servers.forEach(server => {

    // Ask the webserver how full the server is
    let fillage = Math.max(Math.floor(Math.random() * 101), 25);

    // Generate the HTML
    let html = serverListBuilder.buildHTMLForServer(server, fillage);

    // Add the server to the list
    serverListBuilder.addServerToList(html);
});

// Game setup elements
const serverSelectMenu = document.getElementById("server-select");
const usernameMenu = document.getElementById("username-input");
const usernameInput = document.getElementById("username-input-box");
const playButton = document.getElementById("play-button");

// Function for server connect
function connectToServer(server) {
    console.log("Player wants to connect to " + server);

    // Check with the server if we can connect 
    let canConnect = true;

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
        }
    }
}
window.connectToServer = connectToServer;

// SHow the server selection menu
serverSelectMenu.classList.remove('hidden');

Promise.all([
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