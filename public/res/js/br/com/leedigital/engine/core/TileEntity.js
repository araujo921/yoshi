import Entity from "./Entity.js";

/**
 * @author araujo921
 */
export default class TileEntity extends Entity {
  constructor() {
    super();
    // como essa é uma entidade Tile que 
    // vem do TiledMap, ele será configurado
    // em runtime quando houver uma colisão
    // com o player ou com algum outro
    // objeto.
    this.spriteObject = {};
  }

  collider(layer, sprite, tile) {
    layer.removeTileAt(tile.x, tile.y);
  }
}
