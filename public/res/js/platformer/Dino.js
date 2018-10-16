import Player from "../br/com/leedigital/engine/core/Player.js";
import Scene from "../br/com/leedigital/engine/core/Scene.js";

const Phaser = require("phaser");

/**
 * @author araujo921
 */
export default class Dino extends Player {

    constructor(key = "dino") {
        super(key);
        this.sound.effects.audio = {};
        this.sound.effects.key = "jumpEffect";
        this.scale = 0.7;
        this.collectedCoins = 0;
        this.collectedCoinsByLevel = 0;
    }

    collider(layer, sprite, tile) {
        const tileName = tile.properties.name.toLowerCase();
        if (tileName.endsWith("coin")) {
            this.collectedCoinsByLevel++;
            this.collectedCoins++;
            this.points += tile.ownerObject.value;
        }
    }


    preload(scene) {
        scene.load.atlas(this.key, "/res/tiles/platform/player.png", "/res/json/player.json");
        scene.load.audio(this.sound.effects.key, "/res/sounds/effects/jump.mp3");
    }

    /**
     * @param {Scene} scene
     */
    create(scene) {
        const position = this.position;
        const playerFromObject = scene.tiledMap.tileMap.createFromObjects("player", 11)[0];
        position.x = playerFromObject.x;
        position.y = playerFromObject.y;
        this.sound.effects.audio.jump = scene.sound.add(this.sound.effects.key);
        this.spriteObject = scene.physics.add.sprite(position.x, position.y, this.key);
        this.spriteObject.setBounce(0.1);
        this.spriteObject.body.width = 32;
        scene.anims.create({
            key: 'idle',
            frames: scene.anims.generateFrameNames(this.key, {
                prefix: "idle",
                start: 1,
                end: 10
            }),
            frameRate: 7,
            repeat: -1
        });
        scene.anims.create({
            key: 'jump',
            frames: [{
                key: this.key,
                frame: "jump1"
            }]
        });
        scene.anims.create({
            key: 'walk',
            frames: scene.anims.generateFrameNames(this.key, {
                prefix: "walk",
                start: 1,
                end: 10
            }),
            frameRate: 7,
            repeat: -1
        });
        super.create();
        // this.spriteObject.setVisible(false);
        // this.spriteObject.body.allowGravity = false;
        this.key_A = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.key_D = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.key_W = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    }

    stop() {
        this.stoped = true;
    }

    resume() {
        this.stoped = false;
    }

    update(scene) {
        const player = this.spriteObject;
        if (!player.visible || this.stoped) {
            return;
        }
        const cursors = this.cursors;
        player.body.setVelocityX(0);
        const idle = (!cursors.left.isDown && !cursors.right.isDown);
        if (idle) {
            player.anims.play('idle', true);
        }
        if (cursors.left.isDown || this.key_A.isDown) // if the left arrow key is down
        {
            player.body.setVelocityX(this.xVelocity * -1); // move left
            player.anims.play('walk', true); // play walk animation
            player.flipX = true; // flip the sprite to the left
        } else if (cursors.right.isDown || this.key_D.isDown) // if the right arrow key is down
        {
            player.body.setVelocityX(this.xVelocity); // move right
            player.anims.play('walk', true); // play walk animation
            player.flipX = false; // use the original sprite looking to the right
        }
        if ((cursors.space.isDown || cursors.up.isDown || this.key_W.isDown) && player.body.onFloor()) {
            player.body.setVelocityY(this.yVeleocity * -1); // jump up
            player.anims.play('jump');
            this.sound.effects.audio.jump.play();
        }
        super.update(scene);
    }

}
