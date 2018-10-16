import Sprite from "./Sprite.js";

/**
 * 
 */
export default class Player extends Sprite {

    constructor(key = null) {
        super(key);
        this.points = 0;
    }
}
