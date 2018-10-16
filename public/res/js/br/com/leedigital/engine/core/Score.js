import Entity from "./Entity.js";

/**
 * 
 */
export default class Score extends Entity {

    constructor(key = null) {
        super(key);
        this.style = {
            fontFamily: "titania",
            fontSize: "33px",
            backgroundColor: "rgba(0,0,0,.5)",
        }
        this.title = "Score";
        this.points = 0;
        this.cofactor = 5;
    }

    getText() {
        return (
            `${this.title}: ${this.points}   \
                                            \
                                            \
                                            \
                                            \
                                            `
        )
    }

    create(scene) {
        this.text = scene.add.text(0, 0, this.getText(), this.style);
        this.text.setScrollFactor(0);
        // this.text.setFixedSize(0);
    }

    update() {
        this.text.text = this.getText();
    }

}
