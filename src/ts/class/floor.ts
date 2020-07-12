import { b2d, world, b2Promise } from "../main.js";
import AnimPlayer from "../anim/player.js";
import { pxToB2d, b2dToPx } from "../helpers/coordConversion.js";

export default class Floor {
    b2body: typeof b2d.b2Body;

    width: number;
    height: number;
    x: number;
    y: number;
    init: boolean;

    type = 'wall';

    constructor(x, y, w, h) {
        this.x = x + w / 2;
        this.y = y;
        this.width = w;
        this.height = h;
        this.addB2Body();
    }

    update() {
        if (!this.init) return;
        let pos = this.b2body.GetPosition();
        // console.log(pos);
        let pxPos = b2dToPx(pos.x, pos.y)
        this.x = pxPos[0];
        this.y = pxPos[1];
    }

    async addB2Body() {
        await b2Promise;
        let shape = new b2d.b2PolygonShape();
        let w = pxToB2d(this.width)[0]
        let h = pxToB2d(this.height)[0]
        shape.SetAsBox(w / 2, h / 2);

        let bd = new b2d.b2BodyDef;
        bd.set_type(b2d.b2_staticBody);
        bd.set_position(new b2d.b2Vec2(...pxToB2d(this.x, this.y)));
        // bd.set_fixedRotation(true);
        bd.set_angle(0);

        this.b2body = world.CreateBody(bd);

        let fd = new b2d.b2FixtureDef;
        fd.set_density(5);
        fd.set_friction(0.5);
        fd.set_restitution(0.1);
        fd.set_shape(shape);

        let fixture = this.b2body.CreateFixture(fd)
        fixture._parent = this;

        this.init = true;
    }

    drawB2BB(ctx: CanvasRenderingContext2D, camera) {
        if (!this.init) return;
        ctx.strokeStyle = 'magenta';
        ctx.strokeRect(this.x - this.width / 2 - camera.x, this.y - this.height / 2 - camera.y, this.width, this.height);
    }

    draw(ctx: CanvasRenderingContext2D, camera) {
        // ctx.drawImage(this.sprite.cnv,this.x,this.y);
        ctx.fillStyle = 'black';
        ctx.fillRect(this.x - this.width / 2 - camera.x, this.y - this.height / 2 - camera.y, this.width, this.height);
    }

    collided() {

    }

    endCollided(fx) {
    }
}