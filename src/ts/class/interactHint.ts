import { b2player } from "../main.js";

export default class InteractHint {
    x;
    y;
    active = false;
    action:()=>void;

    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    act() {
        if (!this.active) return;
        this.action();
    }

    update() {
        this.x = b2player.x - 8;
        this.y = b2player.y - b2player.height;
    }

    draw(ctx:CanvasRenderingContext2D, camera) {
        if (!this.active) return;
        ctx.strokeStyle = 'white';
        ctx.fillStyle = 'black';

        ctx.fillRect(this.x-camera.x,this.y-camera.y,16,16);
        ctx.strokeRect(this.x-camera.x,this.y-camera.y,16,16);

        ctx.fillStyle = 'white';
        ctx.font = '12px monospace';
        ctx.fillText('E', this.x+4-camera.x, this.y+11-camera.y);
    }


}