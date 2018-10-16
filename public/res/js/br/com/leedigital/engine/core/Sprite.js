import Entity from "./Entity.js";
import Level from "./Level.js";

/**
 * 
 */
export default class Sprite extends Entity {

    constructor(key = null) {
        super(key);
        this.spriteObject = null;
        /**
         * @type {Level}
         */
        this.level;
        this._scaleX = 1;
        this._scaleY = 1;
        this.xVelocity = 200;
        this.yVeleocity = 250;
    }

    set scale(value) {
        this._scaleX = value;
        this._scaleY = value;
    }

    get scale() {
        return this._scaleX;
    }

    set scaleX(value) {
        this._scaleX = value;
    }

    get scaleX() {
        return this._scaleX;
    }

    set scaleY(value) {
        this._scaleY = value;
    }

    get scaleY() {
        return this._scaleY;
    }

    create(scene) {
        this.spriteObject.scaleX = this.scaleX;
        this.spriteObject.scaleY = this.scaleY;
        super.create();
    }

    update(scene) {
        const position = this.position;
        position.x = this.spriteObject.x;
        position.y = this.spriteObject.y;
    }

}
