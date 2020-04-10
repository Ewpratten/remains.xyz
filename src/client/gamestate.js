/**
 * This file handles the game state
 */

import { ingame, sendPointerInfo } from "./networking";
import { renderMe, renderPlayer, clear } from "./render";

export function handleGameFrame(data) {

    clear();

    // Get me location
    let me = data.me;
    renderMe(me.x, me.y);

    // Get all other players
    data.server.players.forEach((player) => {
        renderPlayer(player.x, player.y, player.username);
    })
}

let dx = 0.0;
let dy = 0.0;

function setPointer(x, y) {
    dx = (x - window.innerWidth / 2) / 30
    dy = (y - window.innerHeight / 2) / 30

    if (Math.abs(dx) < 1.5) {
        dx = 0;
    }

    if (Math.abs(dy) < 1.5) {
        dy = 0;
    }
}

function handleInputs() {
    if (ingame) {

        // Send a message with pointer info
        sendPointerInfo(dx, dy, false);

    }
}
setInterval(handleInputs, 100);
window.addEventListener('mousemove', (e) => {
    setPointer(e.clientX, e.clientY);
});
window.addEventListener('touchmove', (e) => {
    setPointer(e.touches[0].clientX, e.touches[0].clientY);
});