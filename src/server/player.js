/**
 * This file handles player movement and interaction
 */

class Player{
    constructor(socket, username) {
        this.socket = socket;
        this.isReal = (socket != null);
        this.username = username;
    }
    
}
 
module.exports = {
    Player: Player
}