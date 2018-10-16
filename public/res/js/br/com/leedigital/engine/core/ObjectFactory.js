import AnimatedCoin from "./AnimatedCoin.js";
import Scene from "./Scene.js";

/**
 * 
 */
export default class ObjectFactory {

    /**
     * 
     * @param {Scene} scene 
     * @param {String} objectLayerName 
     * @param {Number} gid 
     * @param {String} spriteKey 
     */
    createAnimatedCoin(scene, objectLayerName, gid, spriteKey) {
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
        // scene.physics.add.staticGroup()
        const coins = scene.tiledMap.tileMap.createFromObjects(objectLayerName, gid, {
            key: objectLayerName
        });
        // console.log(scene.tileMap.tileMap.createFromObjects);
        for (let coin of coins) {
            coin.play("goldCoin");
            coin.properties = {
                name: "animated_coin"
            }
            const animatedCoin = new AnimatedCoin(coin);
            scene.addEntities(animatedCoin);
            animatedCoin.create(scene);
            sprites.push(animatedCoin);
        }

        const objs = scene.tiledMap.tileMap.filterObjects(objectLayerName, (obj) => obj.gid === gid, scene);
        for (let i = 0, size = objs.length; i < size; i++) {
            const properties = objs[i].properties;
            const propertyObject = {};
            for (let property of properties) {
                propertyObject[property["name"]] = property["value"];
            }
            sprites[i].spriteObject.properties = propertyObject;
        }
        return sprites;
    }

}
