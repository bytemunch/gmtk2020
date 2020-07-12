import AnimEye from "./anim/eye.js";
import AnimHead from "./anim/head.js";
import AnimPlayer from "./anim/player.js";
import * as b2dNs from "./b2d.types.js";
import Player from "./class/player.js";
import Floor from "./class/floor.js";

export let DEBUG = {
    BOUNDING_BOXES: true,
}

declare let Box2D: b2dNs.Box2D;

export let b2d: b2dNs.Box2D;

export let b2Promise = new Promise(async res => {
    b2d = await Box2D();
    b2loaded();
    res();
})

export let world: b2dNs.b2World;

let cnv = document.createElement('canvas');
let ctx = cnv.getContext('2d');

let contentDiv: HTMLDivElement;

let drawHandle;

let eye = new AnimEye(16, 16);

let head = new AnimHead(32, 32);

let player = new AnimPlayer(64, 96);

let b2player = new Player();

let floor = new Floor;

const loaded = () => {
    contentDiv = document.querySelector('#content');
    cnv.width = 480;
    cnv.height = 320;
    cnv.id = 'game';
    contentDiv.appendChild(cnv);

    document.addEventListener('keydown', keydownHandler);
    document.addEventListener('keyup', keyupHandler);
}

const keydownHandler = e => {
    switch (e.key) {
        case 'w':
        case 'W':
            console.log('noimplemented:', e.key)
            break;
        case 's':
        case 'S':
            console.log('noimplemented:', e.key)
            break;
        case 'a':
        case 'A':
            b2player.states.moveLeft = true;
            break;
        case 'd':
        case 'D':
            b2player.states.moveRight = true;
            break;
        case 'e':
        case 'E':
            console.log('noimplemented:', e.key)
            break;
        case 'f':
        case 'F':
            console.log('noimplemented:', e.key)
            break;
        case ' ':
            console.log('noimplemented:', e.key)
            break;
        default:
            console.log(e.key);
            break;
    }
}

const keyupHandler = e => {
    switch (e.key) {
        case 'w':
        case 'W':
            console.log('noimplemented:', e.key)
            break;
        case 's':
        case 'S':
            console.log('noimplemented:', e.key)
            break;
        case 'a':
        case 'A':
            b2player.states.moveLeft = false;
            break;
        case 'd':
        case 'D':
            b2player.states.moveRight = false;
            break;
        case 'e':
        case 'E':
            console.log('noimplemented:', e.key)
            break;
        case 'f':
        case 'F':
            console.log('noimplemented:', e.key)
            break;
        case ' ':
            console.log('noimplemented:', e.key)
            break;
        default:
            console.log(e.key);
            break;
    }
}



const b2loaded = () => {
    createBox2dWorld();
}

const createBox2dWorld = () => {
    let gravity = new b2d.b2Vec2(0, -10);
    world = new b2d.b2World(gravity);
    world.SetAllowSleeping(false);

    // Collision Stuffs
    let listener = new b2d.JSContactListener();
    listener.BeginContact = function (contactPtr: any) {
        let contact = b2d.wrapPointer(contactPtr, b2d.b2Contact);
        let fixtureA = contact.GetFixtureA();
        let fixtureB = contact.GetFixtureB();

        // now do what you wish with the fixtures
        fixtureA._parent.collided(fixtureB);
        fixtureB._parent.collided(fixtureA);
    }

    // Empty implementations for unused methods.
    listener.EndContact = function () { };
    listener.PreSolve = function () { };
    listener.PostSolve = function () { };

    world.SetContactListener(listener);
}

const draw = t => {
    world.Step(1 / 60, 3, 3);
    ctx.clearRect(0, 0, cnv.width, cnv.height);

    ctx.drawImage(eye.cnv, 200, 100)

    ctx.drawImage(head.cnv, 200, 200)
    ctx.drawImage(player.cnv, 300, 200)

    b2player.drawB2BB(ctx);
    b2player.update();
    b2player.draw(ctx);

    floor.drawB2BB(ctx);
    floor.draw(ctx);

    requestAnimationFrame(draw);
}

document.addEventListener('DOMContentLoaded', async e => {
    console.log('we got typescript');
    await b2Promise;
    loaded();
})

drawHandle = requestAnimationFrame(draw);