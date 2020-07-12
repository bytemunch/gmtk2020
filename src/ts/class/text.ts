export default class TextDisplay {
    string: string;
    height = 40;
    x;
    y;
    pad;

    visible = false;

    fontsize = 16;
    constructor(string: string) {
        this.string = string;

        this.pad = 5;

        this.x = 5;

        this.y = 320 - 5 - this.height - this.pad;
    }

    draw(ctx: CanvasRenderingContext2D, camera) {
        if (!this.visible) return;
        ctx.strokeStyle = 'white';

        ctx.fillStyle = `rgba(0,0,0,0.5)`;


        ctx.fillRect(5, 320 - 5 - this.height, 470, this.height)
        ctx.strokeRect(5, 320 - 5 - this.height, 470, this.height);

        ctx.fillStyle = 'white';

        ctx.font = `${this.fontsize}px monospace`

        ctx.fillText(this.string, this.x + this.pad, this.y + this.pad + this.fontsize, 470 - this.pad * 2);

    }
}