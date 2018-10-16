import TextButton from "./TextButton.js";
import Entity from "./Entity.js";
import Style from "./Style.js";
/**
 * @author araujo921
 */
export default class Menu extends Entity {
  constructor() {
    super();
    this._click = this._click.bind(this);
  }

  preload(scene) {
    this.sound.music.key = "menu_music_theme";
    this.sound.music.url = "/res/sounds/music/menu/kuno_title.mp3";
    this.sound.effects.key = "menu_effects_click";
    this.sound.effects.url = "/res/sounds/effects/click.mp3";
    scene.load.audio(this.sound.music.key, this.sound.music.url);
    scene.load.audio(this.sound.effects.key, this.sound.effects.url);
  }

  create(scene) {
    this.scene = scene;
    this.sound.music.audio = scene.sound.add(this.sound.music.key);
    this.sound.music.audio.loop = true;
    this.sound.music.audio.play();
    this.sound.effects.audio = scene.sound.add(this.sound.effects.key);
    // console.log(this.sound.audio);
    const config = scene.game.config;
    const width = config.width;
    const height = config.height;
    const sub = 137;
    this.startText = new TextButton(
      scene,
      width * 0.5 - sub,
      110,
      "Start",
      Style.defaultTextButtonStyle, {
        x: 120,
        y: 11
      },
      this._click
    );

    this.optionText = new TextButton(
      scene,
      width * 0.5 - sub,
      178,
      "Option",
      Style.defaultTextButtonStyle, {
        x: 104,
        y: 11
      },
      this._click
    );
    this.creditsText = new TextButton(
      scene,
      width * 0.5 - sub,
      246,
      "Credits",
      Style.defaultTextButtonStyle, {
        x: 95,
        y: 11
      },
      this._click
    );
    this.exitText = new TextButton(
      scene,
      width * 0.5 - sub,
      314,
      "Exit",
      Style.defaultTextButtonStyle, {
        x: 131,
        y: 11
      },
      this._click
    );
  }

  _click(textObject) {
    const text = textObject.text.toLowerCase();
    this.sound.effects.audio.play();
    if (text === "exit") {
      require("electron")
        .remote.getCurrentWindow()
        .close();
    } else {
      this.onClick(this.scene, text);
    }
  }

  onClick(scene, text) {}

  update(scene) {
    // this.text.x += scene.cameras.main._bounds.x;
  }
}
