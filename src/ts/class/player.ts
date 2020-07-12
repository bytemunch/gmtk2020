import { b2d, world, b2Promise } from "../main.js";
import AnimPlayer from "../anim/player.js";
import { pxToB2d, b2dToPx } from "../helpers/coordConversion.js";

export default class Player {
    b2body: typeof b2d.b2Body;
    states = {
        moveLeft: false,
        moveRight: false,
        grounded: false,
        jumping: false,
        wall: false
    };
    width = 32;
    height = 64;
    x: number;
    y: number;
    init: boolean;

    walkSpeed = 4;

    sprite: AnimPlayer;

    velocity: typeof b2d.b2Vec2;
    lastLook: number;

    constructor() {
        this.sprite = new AnimPlayer(64, 96);
        this.x = 100;
        this.y = 300;
        this.addB2Body();
    }

    get currentVelocity() {
        return this.b2body.GetLinearVelocity();
    }

    update() {
        if (!this.init) return;
        let pos = this.b2body.GetPosition();
        // console.log(pos);
        let pxPos = b2dToPx(pos.x, pos.y)
        this.x = pxPos[0];
        this.y = pxPos[1];

        if (this.states.moveLeft) {
            this.velocity.set_x(-this.walkSpeed);
        } else if (this.states.moveRight) {
            this.velocity.set_x(this.walkSpeed);
        } else {
            this.velocity.set_x(0);
        }

        if (this.states.wall) {
            this.velocity.set_x(0);
            if (this.states.grounded) this.states.wall = false;
        }

        if (this.states.jumping) {
            this.velocity.set_y(this.walkSpeed);
            this.states.grounded = false;
            this.states.jumping = false;
        } else {
            this.velocity.set_y(this.currentVelocity.y)
        }

        this.b2body.SetLinearVelocity(this.velocity);

        if (this.y > 500) {
            this.b2body.SetTransform(new b2d.b2Vec2(...pxToB2d(100, 300)), 0);
            console.log(this.b2body.GetPosition());
        }
    }

    async addB2Body() {
        await b2Promise;
        let shape = new b2d.b2PolygonShape();
        let w = pxToB2d(this.width)[0]
        let h = pxToB2d(this.height)[0]
        shape.SetAsBox(w / 2, h / 2);

        let bd = new b2d.b2BodyDef;
        bd.set_type(b2d.b2_dynamicBody);
        bd.set_position(new b2d.b2Vec2(...pxToB2d(this.x, this.y)));
        bd.set_fixedRotation(true);
        bd.set_angle(0);

        this.b2body = world.CreateBody(bd);

        let fd = new b2d.b2FixtureDef;
        fd.set_density(8);
        fd.set_friction(0.1);
        fd.set_restitution(0.1);
        fd.set_shape(shape);

        let fixture = this.b2body.CreateFixture(fd)
        fixture._parent = this;

        let filter = fixture.GetFilterData();
        // filter.set_groupIndex(-1);
        fixture.SetFilterData(filter);

        this.velocity = new b2d.b2Vec2(0, 0);

        this.init = true;
    }

    drawB2BB(ctx: CanvasRenderingContext2D, camera) {
        if (!this.init) return;
        ctx.strokeStyle = 'magenta';
        ctx.strokeRect(this.x - this.width / 2 - camera.x, this.y - this.height / 2 - camera.y, this.width, this.height);
    }

    draw(ctx: CanvasRenderingContext2D, camera) {
        if (this.states.moveLeft) {
            ctx.setTransform(-1, 0, 0, 1, 0, 0);
            ctx.translate(-this.x + camera.x * 2, this.y);
            ctx.drawImage(this.sprite.cnv, -this.width - camera.x, -this.height - camera.y);
            this.lastLook = -1;
        } else if (this.states.moveRight) {
            ctx.setTransform(1, 0, 0, 1, 0, 0);
            ctx.translate(this.x, this.y);
            ctx.drawImage(this.sprite.cnv, -this.width - camera.x, -this.height - camera.y);
            this.lastLook = 1;
        } else if (this.lastLook == -1) {
            ctx.setTransform(-1, 0, 0, 1, 0, 0);
            ctx.translate(-this.x + camera.x * 2, this.y);
            ctx.drawImage(this.sprite.cnv, -this.width - camera.x, -this.height - camera.y);
        } else {
            ctx.setTransform(1, 0, 0, 1, 0, 0);
            ctx.translate(this.x, this.y);
            ctx.drawImage(this.sprite.cnv, -this.width - camera.x, -this.height - camera.y);
        }

        ctx.resetTransform();
    }

    collided(fx) {
        if (fx._parent.type == 'floor') this.states.grounded = true;
        if (fx._parent.type == 'wall' && !this.states.grounded) this.states.wall = true;
    }

    endCollided(fx) {
    }
}