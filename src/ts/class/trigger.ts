import { b2Promise, b2d, world, testInteractHint, testTxt } from "../main.js";
import { pxToB2d, b2dToPx } from "../helpers/coordConversion.js";
import { b2Body } from "../b2d.types.js";

export default class Trigger {
    b2body: b2Body;
    width;
    height;
    x;
    y;

    init = false;

    text;
    constructor(x, y, w, h, text) {
        this.x = x;
        this.y = y;
        this.width = w;
        this.height = h;
        this.text = text;

        console.log('0',this.text);

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

    act() {
        testTxt.string = this.text;
        testTxt.visible = true;
    }

    collided(fx) {
        console.log('triggercollided!', fx);
        testInteractHint.active = true;
        testInteractHint.action = this.act.bind(this);
    }

    endCollided(fx) {
        console.log('exitTrigger!', fx);
        testInteractHint.active = false;
        testTxt.visible = false;
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
        bd.set_fixedRotation(true);
        bd.set_angle(0);

        this.b2body = world.CreateBody(bd);

        let fd = new b2d.b2FixtureDef;
        fd.set_density(8);
        fd.set_friction(0.1);
        fd.set_restitution(0.1);
        fd.set_shape(shape);
        fd.set_isSensor(true);

        let fixture = this.b2body.CreateFixture(fd);
        fixture._parent = this;

        let filter = fixture.GetFilterData();
        // filter.set_groupIndex(-1);
        fixture.SetFilterData(filter);


        this.init = true;
    }


    drawB2BB(ctx: CanvasRenderingContext2D, camera) {
        if (!this.init) return;
        ctx.strokeStyle = 'magenta';
        ctx.strokeRect(this.x - this.width / 2 - camera.x, this.y - this.height / 2 - camera.y, this.width, this.height);
    }

    draw(ctx,camera) {
        if (!this.init) return;
        let sw = 75;
        ctx.strokeStyle = 'white';
        ctx.fillStyle = 'black';


        ctx.fillRect(this.x - sw/16 - camera.x, this.y - camera.y + sw*.75, sw/8, 50);
        ctx.strokeRect(this.x - sw/16 - camera.x, this.y - camera.y + sw*.75, sw/8, 50);

        ctx.fillRect(this.x - sw/2 - camera.x, this.y - camera.y, sw, sw*.75)
        ctx.strokeRect(this.x - sw/2 - camera.x, this.y - camera.y, sw, sw*.75);
        // ctx.fillRect(this.x - sw/2 - camera.x, this.y - camera.y, sw, sw*.75)

    }
}