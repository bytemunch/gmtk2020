export default abstract class AnimationPart {
    cnv: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    height: number;
    width:number;
    childParts: any[] = [];
    _state:string;

    constructor(w,h) {
        this.cnv = document.createElement('canvas');
        this.cnv.width = w;
        this.cnv.height = h;
        this.width = w;
        this.height = h;
        this.ctx = this.cnv.getContext('2d');
        requestAnimationFrame(this.update.bind(this));
    }

    set state(s) {
        this._state = s;
        this.childParts.forEach(p => p.state = s);
    }

    addPart(part) {
        this.childParts.push(part);
        return part;
    }

    update() {
        this.draw();
        requestAnimationFrame(this.update.bind(this));
    }

    draw() {
        this.ctx.clearRect(0,0,this.cnv.width,this.cnv.height);
    }

    drawBB() {
        this.ctx.strokeStyle = 'red';
        this.ctx.strokeRect(0,0,this.cnv.width, this.cnv.height);
    }
}