import AnimationPart from "./animationPart.js";
import AnimHead from "./head.js";
import AnimBody from "./body.js";
import { DEBUG } from "../main.js";

export default class AnimPlayer extends AnimationPart {
    head: AnimHead;
    body: AnimBody;

    constructor(w, h) {
        super(w, h);

        this.head = this.addPart(new AnimHead(32, 32));
        this.body = this.addPart(new AnimBody(16, 32));
    }

    draw() {
        this.ctx.translate(this.cnv.width / 2, this.cnv.height);
        this.ctx.drawImage(this.head.cnv, -this.head.cnv.width / 2, -this.body.cnv.height * .9 - this.head.cnv.height);
        this.ctx.drawImage(this.body.cnv, -this.body.cnv.width / 2, -this.body.cnv.height);
        this.ctx.setTransform(1, 0, 0, 1, 0, 0);
        if (DEBUG.BOUNDING_BOXES) this.drawBB();
    }
}