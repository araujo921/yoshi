import Coin from "./Coin.js";

/**
 * 
 */
export default class AnimatedCoin extends Coin {

    constructor(spriteObject) {
        super();
        this.spriteObject = spriteObject;
    }

    get value() {
        return this.spriteObject.properties.amount;
    }

    preload(scene) {
        super.preload(scene);
    }

    create(scene) {
        super.create(scene);
    }

    collider(layer, sprite, tile) {
        tile.destroy();
        this.playEffect(sprite);
        this.destroyed = true;
    }
}
