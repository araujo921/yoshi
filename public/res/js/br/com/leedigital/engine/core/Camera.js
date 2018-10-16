import Sprite from "./Sprite.js";
import Player from "./Player.js";

/**
 * @author araujo921
 */
export default class Camera {

    constructor(scene) {
        this.scene = scene;
    }

    set x(x) {
        this._x = x;
    }

    get x() {
        return this._x || 0;
    }

    set y(y) {
        this._y = y;
    }

    get y() {
        return this._y || 0;
    }

    set width(width) {
        this._width = width;
    }

    get width() {
        return this._width;
    }

    set height(height) {
        this._height = height;
    }

    get height() {
        return this._height;
    }

    /**
     * @param {Sprite}
     */
    set follow(follow) {
        this._follow = follow;
    }

    /**
     * @returns {Player}
     */
    get follow() {
        return this._follow;
    }

    create() {
        const scene = this.scene;
        if (!this.follow) {
            return;
        }
        const game = scene.game;
        const config = game.config;
        this.width = config.width;
        this.height = config.height;
        // set bounds so the camera won't go outside the game world
        scene.cameras.main.setBounds(this.x, this.y, this.width, this.height);
        // scene.cameras.main.setViewport(0, 0, 800, 600);
        // make the camera follow the player
        scene.cameras.main.startFollow(this.follow.spriteObject, true);
        // set background color, so the sky is not black    
        scene.cameras.main.setBackgroundColor("#ccccff");
        // this.flashCamera = scene.cameras.add(0, 0, this.width, this.height);
        // this.fadeCamera = scene.cameras.add(0, 0, this.width, this.height);
        // this.shakeCamera = scene.cameras.add(0, 0, this.width, this.height);
        // this.cameras.main.zoom = 3;
        this.mainCamera = scene.cameras.main;
        // this.flashCamera.flash(1000 * 5);
        // this.fadeCamera._fadeAlpha = 0.0;
        // this.fadeCamera.fade(1000 * 5);
        // this.shakeCamera.shake(1000);
    }

    update() {
        const scene = this.scene;
        scene.cameras.main._bounds.x = this.x;
        scene.cameras.main._bounds.y = this.y;
        // this.minimap.scrollX = Phaser.Math.Clamp(position.x - 200, 800, 2000);
    }

    createMinimap() {
        const scene = this.scene;
        const zoom = 0.2;
        this.minimap = scene.cameras.add(this.width * 0.5, 0, this.width * zoom, this.height * zoom).setZoom(zoom).setName("miniMap").setOrigin(0);
        this.minimap.setBackgroundColor("#ccccff");
        this.minimap.scrollX = this.x;
        this.minimap.scrollY = this.y;
    }

}
