import AnimationPart from "./animationPart.js";

export default class AnimEye extends AnimationPart {
    pupilX: number = 6;
    pupilY: number = 6;
    frame: number = 0;
    _state: string = 'crazed';
    lastState:string = 'neutral';

    constructor(w,h) {
        super(w,h);
    }

    update() {
        this.frame++;

        if (this._state == 'crazed') {
            this.height = this.cnv.height;
            this.pupilX += -1 + Math.random() * 2;
            this.pupilY += -1 + Math.random() * 2;
        }

        if (this._state == 'neutral') {
            this.height = this.cnv.height;
            this.pupilY = this.cnv.height * .375;
            if (this.frame % 300 < 30) {
                this.pupilX++;
            } else if (this.frame % 300 < 90) {
                this.pupilX--;
            }
        }

        if (this._state == 'blink') {
            if (this.frame % 300 < 30) {
                this.height--;
            } else if (this.frame % 300 < 60) {
                this.height++;
            } else if (this.frame % 300 == 61) {
                this._state = this.lastState;
            }
        }

        if (this._state == 'sleep') {
            this.height = 0;
        }

        if (this.height < 0) this.height = 0;
        if (this.height > this.cnv.height) this.height = this.cnv.height;

        if (this.pupilY > this.cnv.height * 0.75) this.pupilY = this.cnv.height * 0.75;
        if (this.pupilY < 0) this.pupilY = 0;
        if (this.pupilX > this.cnv.width * .75) this.pupilX = this.cnv.width * .75;
        if (this.pupilX < this.cnv.width * .5) this.pupilX = this.cnv.width * .5;

        if (Math.random() > 0.995) 
        {
            console.log('blink!');
            this._state = 'blink';
        }

        this.draw();
        requestAnimationFrame(this.update.bind(this));
    }

    draw() {
        this.ctx.clearRect(0, 0, this.cnv.width, this.cnv.height);
        this.ctx.fillStyle = 'white';
        this.ctx.fillRect(0, this.cnv.height/2-this.height/2, this.cnv.width, this.height);
        this.ctx.fillStyle = 'black';
        this.ctx.fillRect(this.pupilX, this.pupilY, this.cnv.width/4, this.cnv.height/4);
    }
}