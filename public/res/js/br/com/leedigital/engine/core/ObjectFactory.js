import AnimatedCoin from "./AnimatedCoin.js";
import Scene from "./Scene.js";

/**
 * 
 */
export default class ObjectFactory {

    /**
     * 
     * @param {AnimatedCoin} ownerObject 
     * @param {Scene} scene 
     * @param {String} objectLayerName 
     * @param {Number} gid 
     * @param {String} spriteKey 
     */
    createAnimatedCoin(ownerObject, scene, objectLayerName, gid, spriteKey) {
        const sprites = [];
        const config = {
            key: 'goldCoin',
            frames: scene.anims.generateFrameNumbers(spriteKey, {
                start: 0,
                end: 9,
                first: 0
            }),
            frameRate: 10,
            repeat: -1
        };
        scene.anims.create(config);
        const group = scene.physics.add.staticGroup()
        const coins = scene.tiledMap.tileMap.createFromObjects(objectLayerName, gid, {
            key: objectLayerName
        });
        // console.log(scene.tileMap.tileMap.createFromObjects);
        for (let coin of coins) {
            coin.play("goldCoin");
            coin.ownerObject = ownerObject;
            group.add(coin);
        }
        const objs = scene.tiledMap.tileMap.filterObjects(objectLayerName, (obj) => obj.gid === gid, scene);
        for (let i = 0, size = objs.length; i < size; i++) {
            const properties = objs[i].properties;
            const propertyObject = {};
            for (let property of properties) {
                propertyObject[property["name"]] = property["value"];
            }
            group.children.entries[i].properties = propertyObject;
        }
        // console.log(group);
        return group;
    }

}
