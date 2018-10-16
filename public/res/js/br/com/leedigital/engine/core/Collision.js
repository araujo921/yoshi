import Level from "./Level.js";
import Sprite from "./Sprite.js";

const Phaser = require("phaser");

/**
 *
 */
export default class Collision {
  constructor(scene) {
    this.collisionByPropertyMap = new Map();
    this.collidesMap = new Map();
    this.spriteCollisionMap = new Map();
    this.scene = scene;
  }

  /**
   * 
   * @param {Sprite} sprite 
   * @param  {...Sprite} sprites 
   */
  addSprite2CollidesMap(sprite, ...sprites) {
    this.spriteCollisionMap.set(sprite, sprites);
  }

  clearSprite2CollisionMap() {
    this.spriteCollisionMap.clear();
  }

  /**
   *
   * @param {Level} level
   * @param {[String]} layerNames
   * @param {{property:value}} propertyObject
   */
  addCollisionByProperty(level, layerNames, propertyObject) {
    this.collisionByPropertyMap.set({
        level: level,
        layerNames: layerNames
      },
      propertyObject
    );
  }

  /**
   * @param {Level} level
   * @param {[String]} layerNames
   */
  addCollisionByCollidesProperty(level, ...layerNames) {
    const collidesTiledMapProperty = {
      collides: true
    };
    this.addCollisionByProperty(level, layerNames, collidesTiledMapProperty);
  }

  addObject2CollidesMap(obj1, obj2) {
    this.collidesMap.set(obj1, obj2);
  }

  clearCollidesMap() {
    this.collidesMap.clear();
  }

  clearCollisionByPropertyMap() {
    this.collisionByPropertyMap.clear();
  }

  /**
   * Called by Scene class
   */
  init() {
    const scene = this.scene;
    const collidesMap = this.collidesMap;
    for (let [keyArray, value] of collidesMap) {
      for (let keyObject of keyArray) {
        const level = keyObject.level;
        const layerConfig = keyObject.layerConfig;
        const tileIndexes = keyObject.tileIndexes;
        for (let config of layerConfig) {
          const layer = level.getLayer(config.layerName);
          for (let obj of value) {
            if (obj instanceof Sprite) {
              const spriteObject = obj.spriteObject;
              let func = null;
              const add = scene.physics.add;
              if (config.collisionType === "overlap") {
                func = scene.physics.add.overlap.bind(add);
              } else if (config.collisionType === "collider") {
                func = scene.physics.add.collider.bind(add);
              }
              func(
                layer,
                spriteObject,
                function (sprite, tile) {
                  const objectCallback = tileIndexes[tile.index];
                  if (objectCallback) {
                    tile.ownerObject = objectCallback;
                    objectCallback.spriteObject = tile;
                    objectCallback.collider(layer, sprite, tile);
                    const ownerObject = sprite.ownerObject || null;
                    if (ownerObject !== null) {
                      ownerObject.collider(layer, sprite, tile);
                    }
                  }
                },
                null,
                layer);
            }
          }
        }
      }
    }
    const mapArray = this.collisionByPropertyMap;
    for (let [key, value] of mapArray) {
      /**
       * @type {Level}
       */
      const level = key.level;
      const layerNames = key.layerNames;
      for (let layerName of layerNames) {
        const layer = level.getLayer(layerName);
        layer.setCollisionByProperty(value);
      }
    }
  }

  update(scene) {
    for (let [key, values] of this.spriteCollisionMap) {
      for (let value of values) {
        const player = key.spriteObject;
        // phaser StaticPhysicsGroup
        const staticPhysicsGroup = value.spriteObject;
        const sprites = staticPhysicsGroup.children.entries;
        for (let sprite of sprites) {
          const rect = Phaser.Geom.Rectangle.Intersection(player.getBounds(), sprite.getBounds());
          if (rect.width > 0 && rect.height > 0) {
            // sets properties in staticPhysicsGroup...
            // it's used by coin when collected.
            staticPhysicsGroup.properties = sprite.properties;
            value.collider(null, player, sprite);
            key.collider(null, player, sprite);
          }
        }
      }
    }
  }
}
