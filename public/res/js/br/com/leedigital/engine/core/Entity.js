import Position from "./Position.js";

/**
 * 
 */
export default class Entity {

    constructor(key = null) {
        if (key === null) {
            key = this.constructor.name;
        }
        this.ownerObject = null;
        this.destroyed = false;
        this.key = key;
        this.position = new Position;
        this.scene = null;
        this.sound = {
            effects: {
                audio: null,
                key: "",
                url: "",
                folder: "/res/sounds/effects/"
            },
            music: {
                audio: null,
                key: "",
                url: "",
                folder: "/res/sounds/music/"
            },
            stop() {
                const audio = this.music.audio;
                if (audio) {
                    audio.stop();
                }
            },
            pause() {
                const audio = this.music.audio;
                if (audio) {
                    audio.pause();
                }
            },
            resume() {
                const audio = this.music.audio;
                if (audio) {
                    audio.play();
                }
            }
        };
    }

    isDestroyed() {
        return this.destroyed;
    }

    stop() {
        this.sound.stop();
    }

    pause() {
        this.sound.pause();
    }

    resume() {
        this.sound.resume();
    }

    collider(layer, sprite, tile) {

    }

    playEffect() {

    }

    init(scene) {
        this.cursors = scene.input.keyboard.createCursorKeys();
        this.scene = scene;
    }

    preload(scene) {}

    create(scene) {
        this.spriteObject.ownerObject = this;
    }

    update(scene) {}

}
