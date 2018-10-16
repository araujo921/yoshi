import Util from "./Util.js";
import Collision from "./Collision.js";
import Camera from "./Camera.js";
import Pauser from "./Pauser.js";
import TiledMap from "./TiledMap.js";
import ObjectFactory from "./ObjectFactory.js";

const Phaser = require("phaser");

/**
 *
 */
export default class Scene extends Phaser.Scene {
  constructor(config) {
    super(config);
    this._config = config;
    this.entities = [];
    this.collision = new Collision(this);
    this.pauser = new Pauser(this);
    this.camera = new Camera(this);
    this.objectFactory = new ObjectFactory;
    this.tiledMap = new TiledMap;
  }

  static get defaultConfig() {
    return {
      key: this.constructor.name,
      // active: true,
      physics: {
        default: "arcade",
        arcade: {
          debug: false,
          gravity: {
            y: 300
          }
        }
      }
    };
  }

  addEntities(...entities) {
    for (let entity of entities) {
      this.entities.push(entity);
    }
  }

  /**
   *
   * @param {String} key
   */
  start(key) {
    this.stop();
    this.scene.start(key);
  }

  stop() {
    const entities = this.entities;
    for (let entity of entities) {
      entity.stop(this);
    }
    this.scene.stop();
  }

  pause() {
    this.invoker("pause");
    this.scene.pause();
  }

  resume() {
    this.invoker("resume");
    this.scene.resume();
  }

  init(data) {
    const game = this.game;
    this.world = {
      config: game.config
    };
    this.invoker("init");
    this.pauser.init();
  }

  preload() {
    this.invoker("preload");
    this.pauser.preload();
  }

  create() {
    this.invoker("create");
    // inicializa o colisor depois
    // de inicializar todas as entidades
    this.collision.init();
    this.camera.create();
    this.pauser.create();
  }

  update() {
    this.invoker("update");
    this.collision.update();
    this.camera.update();
  }

  invoker(name) {
    this.tiledMap[name](this);
    Util.invoker(name, this.entities, this);
  }

  getLayers() {

  }

  debug() {
    const layers = this.getLayers();
    for (let layer of layers) {
      const debugGraphics = this.add.graphics().setAlpha(0.75);
      layer.renderDebug(debugGraphics, {
        tileColor: null, // Color of non-colliding tiles
        collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
        faceColor: new Phaser.Display.Color(40, 39, 37, 255) // Color of colliding face edges
      });
    }
  }
}
