
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

export function renderPlayer(x, y, isMe, name) {

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

    if (isMe) {
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

export function renderBullet(x, y) {
    let nx = (window.innerWidth / 2) - (cx - x);
    let ny = (window.innerHeight / 2) - (cy - y);

    // Checks for rendering
    let canRender = true;

    if (nx < 0 || ny < 0) {
        canRender = false;
    }

    if (nx > window.innerWidth || ny > window.innerHeight) {
        canRender = false;
    }

    if (canRender) {

        ctx.beginPath();
        ctx.fillStyle = Constants.theme.colors.hl1;
        ctx.arc(nx, ny, Constants.bulletSize, 0, 2 * Math.PI);
        ctx.fill();

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
    ctx.font = "40px Arial";
    ctx.textAlign = "center";
    ctx.fillStyle = Constants.theme.colors.hl1;
    let astr = (ammo > 99) ? "99+" : ammo;
    ctx.fillText(astr, window.innerWidth - 60, window.innerHeight - 30);
}


export function renderWorldBorder() {

    // Determine rel point
    let nx = (window.innerWidth / 2) - (cx - -(Constants.worldSize[0] / 2));
    let ny = (window.innerHeight / 2) - (cy - -(Constants.worldSize[1] / 2));

    // Render box
    ctx.fillStyle = Constants.theme.colors.mg;
    // ctx.rect(nx, ny, Constants.worldSize[0], Constants.worldSize[1]);

    ctx.fillRect(nx, 0, -10, window.innerHeight);
    ctx.fillRect(nx + Constants.worldSize[0], 0, 10, window.innerHeight);

    ctx.fillRect(0, ny, window.innerWidth, -10);
    ctx.fillRect(0, ny + Constants.worldSize[1], window.innerWidth, 10);


}


const leaderboard = document.getElementById("lb-players");
export function renderLeaderboard(players) {

    // Sort players based on time alive
    players.sort((a, b) => (a.timeAlive <= b.timeAlive) ? 1 : -1)

    // Clear players
    leaderboard.innerHTML = "";

    for (let i = 0; i < players.length; i++) {
        // Skip player if over leaderboard limie
        if (i + 1 > Constants.leaderboardMaxPlayers) {
            continue;
        }

        // Generate name HTML
        let html = `<p class="lb-player"><strong class="lb-number">${i + 1}) </strong>${players[i].username}</p>`

        // Add name to list
        leaderboard.innerHTML += html;

    }

}