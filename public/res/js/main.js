/**
 * @author araujo921
 */
class Main {

    constructor() {
        this.preload = null;
        this.create = null;
        this.update = null;
        this._preload = this._preload.bind(this);
        this._update = this._update.bind(this);
        this._create = this._create.bind(this);
        this.scene = null;
        this.player = null;
        this.cursors = null;
        this.cameras = null;
        this.anims = null;
        this.physics = null;
        this.spriteArrayCollision = [];
        this.sound = {};
        this.sound.effect = {};
    }

    addSprite2ArrayCollision(sprite = null) {
        if (sprite !== null) {
            sprite._arrayIndex_ = this.spriteArrayCollision.length;
            this.spriteArrayCollision[sprite._arrayIndex_] = sprite;
        }
    }

    removeSpriteFromArrayCollision(sprite = null) {
        if (sprite !== null) {
            this.spriteArrayCollision.splice(sprite._arrayIndex_, 1);
        }
    }

    _preload() {
        this.scene = this.game.scene.scenes[0];
        this.cameras = this.scene.cameras;
        this.anims = this.scene.anims;
        this.physics = this.scene.physics;
        if (this.preload instanceof Function) {
            this.preload();
        }
    }

    _create() {
        if (this.create instanceof Function) {
            this.create();
        }
    }

    _update() {
        const player = this.player;
        if (player !== null) {
            const arrayCollides = this.spriteArrayCollision;
            for (let sprite of arrayCollides) {
                const rect = Phaser.Geom.Rectangle.Intersection(player.getBounds(), sprite.getBounds());
                if (rect.width > 0 && rect.width > 0) {
                    this.removeSpriteFromArrayCollision(sprite);
                    sprite.collided(player);
                }
            }
        }
        if (this.update instanceof Function) {
            this.update();
        }
    }

    start(...scene) {
        const thiz = this;
        this.phaser = require("phaser");
        const request = new XMLHttpRequest();
        request.open("GET", "/res/json/config.json");
        request.onload = function () {
            if (this.readyState === 4 && this.status === 200) {
                const config = JSON.parse(this.responseText);
                // config.width = window.innerWidth;
                // config.height = window.innerHeight;
                // config.scene.preload = thiz._preload;
                // config.scene.create = thiz._create;
                // config.scene.update = thiz._update;
                config.scene = scene
                thiz.game = new thiz.phaser.Game(config);
            }
        };
        request.send();
    }
}

export const main = new Main();
