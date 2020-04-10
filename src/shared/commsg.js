/**
 * Client-server communication message types
 */

module.exports = Object.freeze({
    NULL: 0,
    QUERY_SERVERS: 1,
    SERVER_LIST: 2,
    JOIN_SERVER: 3,
    GAME_FRAME: 4,
    USER_INPUT: 5,
    GAME_OVER: 6
})