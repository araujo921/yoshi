import {
    main as Main
} from './main.js';
import SceneMenu from './platformer/scenes/SceneMenu.js';
import Scene1 from './platformer/scenes/Scene1.js';

Main.start(SceneMenu, Scene1);

Main.create = function () {
    const layersNames = [];
    const scene = this.scene;
    this.cursors = scene.input.keyboard.createCursorKeys();
    this.objectMap = {};
    const map = this.objectMap.map = scene.add.tilemap("level1");
    // scene.make.tilemap({
    //     key: "level1"
    // });
    const tileset = this.objectMap.tileset = map.addTilesetImage();
    const items = this.objectMap.tileset_items = map.addTilesetImage("coins");
    const jumpSoundEffect = this.sound.effect.jump = scene.sound.add("jumpEffect");
    // set the boundaries of our game world
    scene.physics.world.bounds.width = tileset.width;
    scene.physics.world.bounds.height = tileset.height;
    for (let i = 0, size = layersNames.length; i < size; i++) {
        const layerName = layersNames[i];
        this.objectMap[layerName] = map.createStaticLayer(layerName, tileset, 0, 0);
    }
    const itemsLayer = map.createDynamicLayer('coins', items, 0, 0);
    itemsLayer.setTileIndexCallback(1752, (sprite, tile) => {
        itemsLayer.removeTileAt(tile.x, tile.y); // remove the tile/coin
        return false;
    }, scene); // the coin id is 1752

    this.objectMap.walls

    // const debugGraphics = scene.add.graphics().setAlpha(0.75);
    // this.objectMap.walls.renderDebug(debugGraphics, {
    //     tileColor: null, // Color of non-colliding tiles
    //     collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
    //     faceColor: new Phaser.Display.Color(40, 39, 37, 255) // Color of colliding face edges
    // });
    // create the player sprite    
    const player = this.player = scene.physics.add.sprite(200, 200, "player");
    player.setBounce(0.2); // our player will bounce from items
    // player.setCollideWorldBounds(true); // don't go out of the map
    scene.physics.add.collider(this.objectMap.walls, player);
    scene.physics.add.overlap(player, itemsLayer);

    this.anims.create({
        key: 'idle',
        frames: [{
            key: 'player',
            frame: "Idle1"
        }]
    });
    this.anims.create({
        key: 'jump',
        frames: [{
            key: 'player',
            frame: "Jump1"
        }]
    });
    this.anims.create({
        key: 'walk',
        frames: this.anims.generateFrameNames('player', {
            prefix: "Walk",
            start: 1,
            end: 10
        }),
        frameRate: 7,
        repeat: -1
    });

    var config = {
        key: 'goldCoin',
        frames: this.anims.generateFrameNumbers("goldCoinAnimation", {
            start: 0,
            end: 9,
            first: 0
        }),
        frameRate: 10,
        repeat: -1
    };

    this.anims.create(config);
    const sprite = scene.add.sprite(400, 200, "goldCoinAnimation");
    sprite.collided = function () {
        this.destroy();
    };
    sprite.anims.play('goldCoin');
    this.addSprite2ArrayCollision(sprite);
};
//*/
