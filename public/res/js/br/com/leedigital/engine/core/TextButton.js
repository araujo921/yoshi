const Phaser = require("phaser");
/**
 * 
 */
export default class TextButton extends Phaser.GameObjects.Text {

    constructor(scene, x, y, text, style, padding, callback) {
        super(scene, x, y, text, style);
        const config = scene.world.config;
        const width = config.width;
        this.setPadding(padding.x, padding.y).setInteractive({
            useHandCursor: true
        }).on('pointerover', () => {
            this.setFill("#0ff");
        }).on('pointerout', () => {
            this.setFill("#f0f0f0");
        }).on('pointerdown', (pointer) => {
            this.graphics = scene.add.graphics();
            this.graphics.lineStyle(3, 0x00ffff, 1);
            this.graphics.strokeCircle(pointer.x, pointer.y, 31);
            if (callback instanceof Function) {
                callback(this);
            }
        }).on('pointerup', () => {
            if (this.graphics) {
                this.graphics.destroy();
            }
        }).on('pointermove', (pointer) => {});
        scene.add.existing(this);
    }
}
