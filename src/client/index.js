const styleBuilder = require("./stylebuilder.js");


// Load the game CSS
import './css/main.css';
import './css/menu.css';

// Inject auto-generated styles into page
console.log("Injecting document styles");
styleBuilder.setDocumentTheme();

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