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


// Promise.all([
//     connect(),
//     downloadAssets(),
//   ]).then(() => {
//     playMenu.classList.remove('hidden');
//     usernameInput.focus();
//     playButton.onclick = () => {
//       // Play!
//       play(usernameInput.value);
//       playMenu.classList.add('hidden');
//       initState();
//       startCapturingInput();
//       startRendering();
//       setLeaderboardHidden(false);
//     };
//   });