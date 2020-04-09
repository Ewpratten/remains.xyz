import io from 'socket.io-client';
import { handleGameFrame } from './gamestate';

const Constants = require('../shared/constants');
const commsg = require("../shared/commsg");

const socketProtocol = (window.location.protocol.includes('https')) ? 'wss' : 'ws';
const socket = io(`${socketProtocol}://${window.location.host}`, { reconnection: false });
const connectedPromise = new Promise(resolve => {
    socket.on('connect', () => {
        console.log('Connected to server!');
        resolve();
    });
});

export const connect = () => (
    connectedPromise.then(() => {
        // Register callbacks
        socket.on(commsg.GAME_FRAME, handleGameFrame);
        socket.on('disconnect', () => {
            console.log('Disconnected from server.');
            document.getElementById('disconnect-modal').classList.remove('hidden');
            document.getElementById('reconnect-button').onclick = () => {
                window.location.reload();
            };
        });
    })
);

export const getServerList = (callback) => {
    socket.emit(commsg.QUERY_SERVERS);
    socket.on(commsg.SERVER_LIST, callback);
}

export const joinGame = (server, username) => {
    socket.emit(commsg.JOIN_SERVER, { server: server, username: username });
}