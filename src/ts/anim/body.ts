import AnimationPart from "./animationPart.js";
import { DEBUG } from "../main.js";

export default class AnimBody extends AnimationPart {

    draw() {
        this.ctx.fillRect(0,0,this.width,this.height);
        this.ctx.strokeStyle = 'white';
        this.ctx.strokeRect(0,0,this.width,this.height);
        if (DEBUG.BOUNDING_BOXES) this.drawBB();
    }
}