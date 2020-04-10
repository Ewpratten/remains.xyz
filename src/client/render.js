
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
    ctx.arc((window.innerWidth / 2), (window.innerHeight / 2), 10, 0, 2 * Math.PI);
    ctx.stroke();
}

export function renderPlayer(x, y, name) {

    let nx = x - cx + (window.innerWidth / 2);
    let ny = y - cy + (window.innerHeight / 2);

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
        ctx.arc(nx, ny, 10, 0, 2 * Math.PI);
        ctx.stroke();
    }

}

