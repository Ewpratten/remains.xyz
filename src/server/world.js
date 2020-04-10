/**
 * This file defines the explorable world
 */

const Constants = require("../shared/constants");

class World {

    isColliding(x, y) {

        let collide = false;

        // Check world edges
        if (x < -(Constants.worldSize[0] / 2) || x > (Constants.worldSize[0] / 2)) {
            collide = true;
        }
        if (y < -(Constants.worldSize[1] / 2) || y > (Constants.worldSize[1] / 2)) {
            collide = true;
        }


        return collide;
    }

}


module.exports = {
    World: World
}