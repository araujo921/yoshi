import Entity from "./Entity.js";
import Util from "./Util.js";
import Level from "./Level.js";
import Scene from "./Scene.js";

/**
 * @author araujo921
 */
export default class TiledMap extends Entity {

    constructor() {
        super();
        this.level = [];
        // pahser tilemap object
        this.tileMap = null;
    }

    /**
     * @param {Level} level
     */
    add(level) {
        level._arrayIndex_ = this.level.length;
        level.ownerObject = this;
        this.level[level._arrayIndex_] = level;
    }

    /**
     * @param {Scene} scene
     */
    preload(scene) {
        Util.invoker("preload", this.level, scene);
    }

    /**
     * @param {Scene} scene
     */
    create(scene) {
        Util.invoker("create", this.level, scene);
    }

    /**
     * @param {Scene} scene
     */
    update(scene) {
        Util.invoker("update", this.level, scene);
    }

}
