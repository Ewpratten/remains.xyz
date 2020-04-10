
const Constants = require('../shared/constants');

const canvas = document.getElementById("game-canvas");
const ctx = canvas.getContext("2d");
ctx.canvas.width = window.innerWidth;
ctx.canvas.height = window.innerHeight;

let cx = 0.0;
let cy = 0.0;

export function clear() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

export function renderMe(x, y) {

    // Set frame center
    cx = x;
    cy = y;

    ctx.beginPath();
    ctx.arc((window.innerWidth / 2), (window.innerHeight / 2), Constants.playerSize, 0, 2 * Math.PI);
    ctx.stroke();
}

export function renderPlayer(x, y, name) {

    let nx = (window.innerWidth / 2) - (cx - x);
    let ny = (window.innerHeight / 2) - (cy - y);

    // Checks for rendering
    let canRender = true;

    if (nx == (window.innerWidth / 2) && ny == (window.innerHeight / 2)) {
        canRender = false;
    }

    if (nx < 0 || ny < 0) {
        canRender = false;
    }

    if (nx > window.innerWidth || ny > window.innerHeight) {
        canRender = false;
    }

    if (canRender) {
        ctx.beginPath();
        ctx.arc(nx, ny, Constants.playerSize, 0, 2 * Math.PI);
        ctx.stroke();

        ctx.font = "20px Arial";
        ctx.textAlign = "center";
        ctx.fillText(name, nx, ny - Constants.playerSize - 10);
    }

}

export function renderHealthAndAmmo(health, ammo) {

    health *= -1;
    health += 100;

    // Health
    let width = window.innerWidth * (health / 100);
    ctx.fillStyle = Constants.theme.colors.hl2;
    ctx.fillRect(width, window.innerHeight - 20, window.innerWidth, 20);

    // Ammo
}

