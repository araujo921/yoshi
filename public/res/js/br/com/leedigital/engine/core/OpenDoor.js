import TileEntity from "./TileEntity.js";

/**
 *
 */
export default class OpenDoor extends TileEntity {

  constructor() {
    super();
  }

  preload(scene) {
    this.sound.effects.key = "open_door_effect"
    this.sound.effects.url = `${this.sound.effects.folder}opendoor.mp3`;
    scene.load.audio(this.sound.effects.key, this.sound.effects.url);
    super.preload();
  }

  create(scene) {
    this.sound.effects.audio = scene.sound.add(this.sound.effects.key);
    super.create();
  }

  open() {
    this.sound.effects.audio.play();
  }

  collider(layer, sprite, tile) {

  }

}
