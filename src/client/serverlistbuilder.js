/**
 * Logic for filling in the server list
 */

export function buildHTMLForServer(server, fillage) {
    // Determine bar color
    let bar_color = "success";
    if (fillage > 25 && fillage <= 50) {
        bar_color = "info";
    } else if (fillage > 50 && fillage <= 90) {
        bar_color = "warning";
    } else if (fillage > 90) {
        bar_color = "danger";
    }

    // Build the HTML
    return `<tr><td><a href="#" onclick="window.connectToServer(\'${server}\');"><div class="progress"><div class="progress-bar bg-${bar_color}" role="progressbar" style="width: ${fillage}%" aria-valuenow="${fillage}" aria-valuemin="0" aria-valuemax="100">${server}</div></div></a></td></tr>`;
}

let serversList = document.getElementById("gen-servers");
export function addServerToList(serverHTML) {
    serversList.innerHTML += serverHTML;
}

export function clearServerList() {
    serversList.innerHTML = "";
}