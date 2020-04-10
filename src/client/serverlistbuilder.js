/**
 * Logic for filling in the server list
 */
const Constants = require('../shared/constants');


export function buildHTMLForServer(server, fillage) {

    // Convert fillage to percent
    let perc = Math.max((fillage / Constants.usersPerServer) * 100, 25);

    // Determine bar color
    let bar_color = "success";
    if (perc > 25 && perc <= 50) {
        bar_color = "info";
    } else if (perc > 50 && perc <= 90) {
        bar_color = "warning";
    } else if (perc > 90) {
        bar_color = "danger";
    }

    // Build the HTML
    return `<tr><td><a href="#" onclick="window.connectToServer(\'${server}\');"><div class="progress"><div class="progress-bar bg-${bar_color}" role="progressbar" style="width: ${perc}%" aria-valuenow="${perc}" aria-valuemin="0" aria-valuemax="100">${server}</div></div></a></td></tr>`;
}

let serversList = document.getElementById("gen-servers");
export function addServerToList(serverHTML) {
    serversList.innerHTML += serverHTML;
}

export function clearServerList() {
    serversList.innerHTML = "";
}