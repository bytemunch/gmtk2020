import AnimationPart from "./animationPart.js";

export default class AnimBody extends AnimationPart {

    draw() {
        this.ctx.fillRect(0,0,this.width,this.height);
        this.drawBB();
    }
}