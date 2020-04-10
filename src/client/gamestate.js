/**
 * This file handles the game state
 */

import { ingame, sendPointerInfo } from "./networking";

export function handleGameFrame(data) {
    console.log(data)
}

let dx = 0.0;
let dy = 0.0;

function setPointer(x, y) {
    dx = x - window.innerWidth / 2
    dy = y - window.innerHeight / 2
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