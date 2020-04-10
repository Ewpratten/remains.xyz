/**
 * This file handles the game state
 */

import { ingame, sendPointerInfo } from "./networking";
import { renderMe, renderPlayer, clear, renderHealthAndAmmo, renderWorldBorder, renderBullet, renderLeaderboard } from "./render";

export function handleGameFrame(data) {

    // Handle death
    if (data.health <= 0) {
        console.log('Player died');
        document.getElementById('death-modal').classList.remove('hidden');
        document.getElementById('life-time').innerText = data.timeAlive;
        document.getElementById('restart-button').onclick = () => {
            window.location.reload();
        };
        return;
    }

    clear();

    // Get me location
    let me = data.me;
    renderMe(me.x, me.y);

    // Get all other players
    data.server.players.forEach((player) => {
        renderPlayer(player.x, player.y, player.username);
    })

    // Render all bullets
    data.server.bullets.forEach((bullet) => {
        renderBullet(bullet.x, bullet.y);
    })

    // Get border
    renderWorldBorder();

    // Render HUD
    renderHealthAndAmmo(data.health, data.ammo);
    renderLeaderboard(data.server.players);
}

let dx = 0.0;
let dy = 0.0;
let rdx = 0.0;
let rdy = 0.0;
let click = false;

function setPointer(x, y) {
    dx = (x - window.innerWidth / 2) / 20
    dy = (y - window.innerHeight / 2) / 20
    rdx = x - window.innerWidth / 2;
    rdy = y - window.innerHeight / 2;

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
        sendPointerInfo(dx, dy, rdx, rdy, click);
        click = false;

    }
}
setInterval(handleInputs, 100);
window.addEventListener('mousemove', (e) => {
    setPointer(e.clientX, e.clientY);
});
window.addEventListener('touchmove', (e) => {
    setPointer(e.touches[0].clientX, e.touches[0].clientY);
});
window.addEventListener('click', (e) => {
    click = true;
});