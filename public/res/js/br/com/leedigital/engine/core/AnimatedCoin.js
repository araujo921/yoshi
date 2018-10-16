import Coin from "./Coin.js";
import Scene from "./Scene.js";

/**
 * 
 */
export default class AnimatedCoin extends Coin {

    constructor() {
        super();
    }

    get value() {
        return this.spriteObject.properties.amount;
    }

    preload(scene) {
        super.preload(scene);
    }

    /**
     * 
     * @param {Scene} scene 
     */
    create(scene) {
        this.spriteObject = scene.objectFactory.createAnimatedCoin(this, scene, "coinObject", 985, "goldCoinAnimation");
        super.create(scene);
    }

    collider(layer, sprite, tile) {
        tile.destroy();
        this.playEffect(sprite);
        this.destroyed = true;
    }
}
