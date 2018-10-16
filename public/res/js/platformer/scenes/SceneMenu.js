import Scene from "../../br/com/leedigital/engine/core/Scene.js";
import TiledMap from "../../br/com/leedigital/engine/core/TiledMap.js";
import Menu from "../../br/com/leedigital/engine/core/Menu.js";
import Level from "../../br/com/leedigital/engine/core/Level.js";

/**
 *
 */
export default class SceneMenu extends Scene {
  constructor() {
    super({
      key: "SceneMenu"
    });
    this.pauser.active = false;
    // const tileMapMenu = new TiledMap();
    const menu = new Menu();
    menu.onClick = (scene, text) => {
      if (text === "start") {
        this.start("Scene1");
      } else if (text === "option") {} else if (text === "credits") {}
    };
    const menuLevel = new Level();
    menuLevel.addUrl({
      type: Level.Type.IMAGE,
      key: "generic_platformer_tiles",
      url: "/res/tiles/platform/generic_platformer_tiles.png"
    }, {
      type: Level.Type.IMAGE,
      key: "patformkenney-32-4x39",
      url: "/res/tiles/platform/patformkenney-32-4x39.png"
    }, {
      type: Level.Type.IMAGE,
      key: "coins",
      url: "/res/tiles/platform/coins.png"
    }, {
      type: Level.Type.JSON,
      key: "menu",
      url: "/res/json/levels/menu.json"
    });

    menuLevel.addLayerConfig({
      tilesetKey: "generic_platformer_tiles",
      layerName: "background"
    }, {
      tilesetKey: "generic_platformer_tiles",
      layerName: "clouds"
    }, {
      tilesetKey: "generic_platformer_tiles",
      layerName: "trees"
    }, {
      tilesetKey: "generic_platformer_tiles",
      layerName: "vegetation2"
    }, {
      tilesetKey: "generic_platformer_tiles",
      layerName: "vegetation"
    }, {
      tilesetKey: "generic_platformer_tiles",
      layerName: "walls"
    }, {
      tilesetKey: "patformkenney-32-4x39",
      layerName: "kenney"
    }, {
      tilesetKey: "coins",
      layerName: "coins"
    });

    menuLevel.addTileset("patformkenney-32-4x39");
    menuLevel.addTileset("generic_platformer_tiles");
    menuLevel.addTileset("coins");

    this.addEntities(menu);
    this.tiledMap.add(menuLevel);
    // tileMapMenu.add(menuLevel);
    // this.addEntities(tileMapMenu, menu);
  }
}
