/**
 * Logic for filling in the server list
 */

export function buildHTMLForServer(server, fillage) {
    return `<tr><td><a href="" onclick="connectToServer(\'${server}\');"><div class="progress"><div class="progress-bar" role="progressbar" style="width: ${fillage}%" aria-valuenow="${fillage}" aria-valuemin="0" aria-valuemax="100">${server}</div></div></a></td></tr>`;
}

let serversList = document.getElementById("gen-servers");
export function addServerToList(serverHTML) {
    serversList.innerHTML += serverHTML;
}