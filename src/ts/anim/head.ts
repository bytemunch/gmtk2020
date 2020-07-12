import AnimationPart from "./animationPart.js";
import AnimEye from "./eye.js";

export default class AnimHead extends AnimationPart {
    eye: AnimEye;
    rotation = 0;

    constructor(w, h) {
        super(w, h);
        this.eye = this.addPart(new AnimEye(h / 3, h / 3));
    }

    draw() {
        this.ctx.clearRect(0, 0, this.cnv.width, this.cnv.height);
        this.ctx.translate(this.cnv.width / 2, this.cnv.height / 2);
        this.ctx.fillStyle = 'black';
        this.ctx.fillRect(-this.width / 2, -this.height / 2, this.width, this.height);
        this.ctx.drawImage(this.eye.cnv, this.width / 6, -this.height / 4);
        this.ctx.setTransform(1, 0, 0, 1, 0, 0);

        this.drawBB();
    }
}