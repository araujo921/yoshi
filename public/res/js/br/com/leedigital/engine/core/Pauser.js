import Style from "./Style.js";

/**
 *
 */
export default class Pauser {
  constructor(scene) {
    this.scene = scene;
    this.active = true;
    this.paused = false;
    this.sound = {
      pause: {
        key: "pauser_pause",
        url: "/res/sounds/effects/pause.mp3",
        audio: null
      },
      unpause: {
        key: "pauser_unpause",
        url: "/res/sounds/effects/unpause.mp3",
        audio: null
      }
    };
  }

  init() {
    document.onkeyup = evt => {
      if (evt.key === "Enter") {
        this.handler();
      }
    };
    // this.scene.input.keyboard.on("keydown_ENTER", this.handler, this);
  }

  preload() {
    this.scene.load.audio(this.sound.pause.key, this.sound.pause.url);
    this.scene.load.audio(this.sound.unpause.key, this.sound.unpause.url);
  }

  create() {
    if (this.active) {
      this.sound.pause.audio = this.scene.sound.add(this.sound.pause.key);
      this.sound.unpause.audio = this.scene.sound.add(this.sound.unpause.key);
      const world = this.scene.world;
      const config = world.config;
      this.text = this.scene.add
        .text(0, 0, "Paused", Style.defaultTextButtonStyle)
        .setPadding(32, 16);
      Phaser.Display.Align.In.Center(
        this.text,
        this.scene.add.zone(
          world.config.width / 2,
          world.config.height / 2,
          config.width,
          config.height
        )
      );
      this.text.visible = false;
      this.text.setScrollFactor(0);
    }
  }

  handler() {
    if (this.active) {
      if (this.paused) {
        this.text.visible = this.paused = false;
        this.sound.pause.audio.play();
        this.scene.resume();
      } else {
        this.text.visible = this.paused = true;
        this.sound.unpause.audio.play();
        this.scene.pause();
      }
    }
  }
}
