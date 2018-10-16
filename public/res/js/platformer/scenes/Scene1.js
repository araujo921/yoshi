import Dino from "../Dino.js";
import Level from "../../br/com/leedigital/engine/core/Level.js";
import Coin from "../../br/com/leedigital/engine/core/Coin.js";
import CloseDoor from "../../br/com/leedigital/engine/core/CloseDoor.js";
import OpenDoor from "../../br/com/leedigital/engine/core/OpenDoor.js";
import PlatformerScenes from "./PlatformerScenes.js";
import Score from "../../br/com/leedigital/engine/core/Score.js";
import AnimatedCoin from "../../br/com/leedigital/engine/core/AnimatedCoin.js";

/**
 *
 */
export default class Scene1 extends PlatformerScenes {

  constructor() {
    super({
      key: "Scene1"
    });
    this.maxCoin = 13;
    this.collider = this.collider.bind(this);
    this.player = new Dino();
    this.player.level = this.levelOne = new Level();
    this.levelOne.openDoor = false;
    this.coinObject = new Coin();
    this.closeDoorObject = new CloseDoor();
    this.openDoorObject = new OpenDoor();
    this.openDoorObject.collider = this.collider;
    this.score = new Score();
    this.animatedCoin = new AnimatedCoin();
    this.levels = {
      currentLevel: 0,
      array: [{
        xPlayer: 439,
        yPlayer: 173,
        xCam: 0,
        yCam: 0,
        closeDoor: {
          column: 23,
          row1: 1,
          row2: 2
        }
      }, {
        xPlayer: 35 * 32,
        yPlayer: 0,
        xCam: 32 * 32,
        yCam: 0,
        closeDoor: {
          column: 55,
          row1: 13,
          row2: 14
        }
      }, {
        xPlayer: 58 * 32,
        yPlayer: 13 * 32,
        xCam: 58 * 32,
        yCam: 0,
        closeDoor: {
          column: 58,
          row1: 13,
          row2: 14
        }
      }],
      nextLevel(scene) {
        ++this.currentLevel;
        if (this.currentLevel < this.array.length) {
          const object = this.array[this.currentLevel];
          scene.player.spriteObject.x = object.xPlayer;
          scene.camera.x = object.xCam;
        }
      },
      openDoor(scene) {
        const layerOpenDoor = scene.levelOne.getLayer("close_door");
        if (this.currentLevel < this.array.length) {
          const object = this.array[this.currentLevel];
          const closeDoor = object.closeDoor;
          layerOpenDoor.removeTileAt(closeDoor.column, closeDoor.row1);
          layerOpenDoor.removeTileAt(closeDoor.column, closeDoor.row2);
        }
      }
    }
    this.levelOne.addUrl({
      type: Level.Type.IMAGE,
      key: "platformerTiles",
      url: "/res/tiles/platform/generic_platformer_tiles.png"
    }, {
      type: Level.Type.IMAGE,
      key: "patformkenney32",
      url: "/res/tiles/platform/patformkenney-32-4x39.png"
    }, {
      type: Level.Type.SPRITESHEET,
      key: "coins",
      url: "/res/tiles/platform/coins.png"
    }, {
      type: Level.Type.SPRITESHEET,
      key: "goldCoinAnimation",
      url: "/res/tiles/platform/coins.png",
      config: {
        frameWidth: 32,
        frameHeight: 32,
        endFrame: 9
      }
    }, {
      type: Level.Type.JSON,
      key: "level1",
      url: "/res/json/levels/level1.json"
    });

    //#-----
    this.levelOne.addLayerConfig({
      tilesetKey: "platformerTiles",
      layerName: "background"
    }, {
      tilesetKey: "platformerTiles",
      layerName: "clouds"
    }, {
      tilesetKey: "platformerTiles",
      layerName: "water"
    }, {
      tilesetKey: "platformerTiles",
      layerName: "trees"
    }, {
      tilesetKey: "platformerTiles",
      layerName: "vegetation"
    }, {
      tilesetKey: "platformerTiles",
      layerName: "walls"
    }, {
      tilesetKey: "patformkenney32",
      layerName: "open_door",
      staticLayer: false
    }, {
      tilesetKey: "patformkenney32",
      layerName: "close_door",
      staticLayer: false
    }, {
      tilesetKey: "coins",
      layerName: "coins",
      staticLayer: false
    });
    this.levelOne.addTileset("coins");
    this.levelOne.addTileset("patformkenney32");
    this.levelOne.addTileset("platform", "platformerTiles");
    this.tiledMap.add(this.levelOne);
    this.addEntities(
      this.score,
      this.coinObject,
      this.animatedCoin,
      this.openDoorObject,
      this.player
    );
    this.camera.follow = this.player;
    this.collision.addSprite2CollidesMap(this.player, this.animatedCoin);
    this.collision.addCollisionByCollidesProperty(this.levelOne, "walls", "coins");
    this.collision.addObject2CollidesMap(
      [{
        level: this.levelOne,
        layerConfig: [{
            layerName: "walls",
            collisionType: "collider"
          },
          {
            layerName: "coins",
            collisionType: "overlap"
          },
          {
            layerName: "close_door",
            collisionType: "overlap"
          },
          {
            layerName: "open_door",
            collisionType: "overlap"
          }
        ],
        tileIndexes: {
          985: this.coinObject,
          990: this.coinObject,
          993: this.coinObject,
          1584: this.closeDoorObject,
          1588: this.closeDoorObject,
          1576: this.openDoorObject,
          1580: this.openDoorObject,
        }
      }],
      [this.player]
    );
  }

  getLayers() {
    return this.levelOne.getLayers();
  }

  preload() {
    super.preload();
    this.load.audio("level_sound_one", `${this.levelSound.musicFolder}happy_adveture.mp3`);
    // this.load.scenePlugin('AnimatedTiles', '/res/lib/js/AnimatedTiles.js', 'animatedTiles', 'animatedTiles');
  }

  create() {
    super.create();
    this.levelSound.one = this.sound.add("level_sound_one");
    this.levelSound.one.play();
    this.levelSound.one.loop = true;
    // this.debug();
  }

  update() {
    super.update();
    // this.coinObject.total = this.coinObject.total / this.levelOne.getLayer("coins").culledTiles.length * this.coinObject.total;
    // console.log(this.coinObject.total);
    this.score.points = this.player.points;
    if (this.player.collectedCoinsByLevel >= this.maxCoin) {
      // this.player.spriteObject.x = 35 * 32;
      // this.camera.x = 32 * 32;
      // console.log(this.player.collectedCoinsByLevel);
      this.player.collectedCoinsByLevel = 0;
      this.levels.openDoor(this);
      this.openedDoor = true;
      this.openDoorObject.open();
    }
  }

  pause() {
    super.pause();
    this.levelSound.one.pause();
  }

  stop() {
    super.stop();
    this.levelSound.one.stop();
  }

  resume() {
    super.resume();
    this.levelSound.one.resume();
  }

  collider(layer, sprite, tile) {
    const name = tile.properties.name.toLowerCase();
    if (name === "open_door" && this.openedDoor) {
      this.openedDoor = false;
      this.camera.mainCamera.fade(500);
      this.time.delayedCall(500, () => {
        this.camera.mainCamera.resetFX();
        this.levels.nextLevel(this);
      }, [], this);
    }
  }

}
