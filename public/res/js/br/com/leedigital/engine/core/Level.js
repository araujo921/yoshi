import Entity from "./Entity.js";

/**
 *
 */
export default class Level extends Entity {
  constructor() {
    super();
    this.urlMap = [];
    this.key = "";
    this.tileMap = null;
    this.tilesetArray = [];
    this.tilesetMap = new Map();
    this.layerConfigArray = [];
    this.layerMap = new Map();
  }

  /**
   *
   * @param { ...{type:,key:,url:,img: null,config: null}} obj
   */
  addUrl(...obj) {
    for (let tmp of obj) {
      this.urlMap.push({
        type: tmp.type,
        key: tmp.key,
        url: tmp.url,
        img: tmp.img,
        config: tmp.config
      });
    }
  }

  addTileset(tilesetName, key) {
    this.tilesetArray.push({
      tilesetName: tilesetName,
      key: key
    });
  }

  /**
   *
   * @param  {...{layerId:,tilesetKey:,layerName:,staticLayer:,}} layerConfig
   */
  addLayerConfig(...layerConfig) {
    this.layerConfigArray = layerConfig;
  }

  getLayer(name) {
    return this.layerMap.get(name);
  }

  getLayers() {
    return this.layerMap.values();
  }

  preload(scene) {
    const array = this.urlMap;
    for (let obj of array) {
      const key = obj.key;
      const url = obj.url;
      const img = obj.img;
      const config = obj.config;
      switch (obj.type) {
        case Level.Type.JSON:
          scene.load.tilemapTiledJSON(key, url);
          this.key = key;
          break;
        case Level.Type.IMAGE:
          scene.load.image(key, url);
          break;
        case Level.Type.ATLAS:
          scene.load.atlas(key, img, url);
          break;
        case Level.Type.SPRITESHEET:
          scene.load.spritesheet(key, url, config);
          break;
        case Level.Type.AUDIO:
          scene.load.audio(key, url);
          break;
      }
    }
  }

  create(scene) {
    this.tileMap = scene.add.tilemap(this.key);
    this.ownerObject.tileMap = this.tileMap;
    const array = this.tilesetArray;
    const layerConfigArray = this.layerConfigArray;
    // Camera.width = this.tilemap.widthInPixels;
    // Camera.height = this.tilemap.heightInPixels;
    for (let obj of array) {
      const tilesetName = obj.tilesetName;
      const key = obj.key || tilesetName;
      this.tilesetMap.set(
        key,
        this.tileMap.addTilesetImage(obj.tilesetName, key)
      );
    }
    for (let i = 0, size = layerConfigArray.length; i < size; i++) {
      const layerConfig = layerConfigArray[i];
      const layerName = layerConfig.layerName;
      const isStatic =
        layerConfig.staticLayer === undefined ? true : layerConfig.staticLayer;
      const tilesetKey = layerConfig.tilesetKey;
      const layerId =
        layerConfig.layerId === undefined ? layerName : layerConfig.layerId;
      if (isStatic) {
        const tileset = this.tilesetMap.get(tilesetKey);
        const layer = this.tileMap.createStaticLayer(layerName, tileset, 0, 0);
        this.layerMap.set(layerId, layer);
      } else {
        const dynamicLayer = this.tilesetMap.get(tilesetKey);
        const layer = this.tileMap.createDynamicLayer(layerName, dynamicLayer, 0, 0);
        this.layerMap.set(layerId, layer);
      }
    }
  }

  update(scene) {}
}

Level.Type = {
  JSON: "json",
  IMAGE: "image",
  ATLAS: "atlas",
  AUDIO: "audio",
  SPRITESHEET: "spritesheet"
};
