import TileEntity from "./TileEntity.js";

/**
 * @author araujo921
 */
export default class Coin extends TileEntity {
  constructor() {
    super();
    this.sound.effects.key = "coin_effects_audio";
    this.sound.effects.url = "/res/sounds/effects/coin.mp3";
  }

  get value() {
    return 5;
  }

  preload(scene) {
    scene.load.audio(this.sound.effects.key, this.sound.effects.url);
    scene.load.image("coin_particles", "/res/tiles/platform/part.png");
  }

  create(scene) {
    this.sound.effects.audio = scene.sound.add(this.sound.effects.key);
    this.particles = scene.add.particles("coin_particles");
    this.emitter = this.particles.createEmitter();
    this.emitter.stop();
    this.emitter.setSpeed(19);
    super.create();
  }

  collider(layer, sprite, tile) {
    layer.removeTileAt(tile.x, tile.y);
    this.playEffect(sprite);
  }

  playEffect(sprite) {
    this.sound.effects.audio.play();
    this.emitter.explode(19, sprite.x, sprite.y);
  }
}
