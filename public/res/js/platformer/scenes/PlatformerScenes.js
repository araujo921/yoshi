import Scene from "../../br/com/leedigital/engine/core/Scene.js";

/**
 * 
 */
export default class PlatformerScenes extends Scene {
    constructor(config) {
        super(config);
        this.levelSound = {
            musicFolder: "/res/sounds/music/stages/",
            effectsFolder: "/res/sounds/effects/"
        }
    }

}
