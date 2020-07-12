import AnimEye from "./anim/eye.js";
import AnimHead from "./anim/head.js";
import AnimPlayer from "./anim/player.js";
import * as b2dNs from "./b2d.types.js";
import Player from "./class/player.js";
import Floor from "./class/floor.js";
import TextDisplay from "./class/text.js";
import InteractHint from "./class/interactHint.js";
import Camera from "./class/camera.js";
import Trigger from "./class/trigger.js";

export let DEBUG = {
    BOUNDING_BOXES: false,
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

export let b2player = new Player();

let lwall = new Floor(-100, 0, 200, 800);

export let testTxt = new TextDisplay('hello');

export let testInteractHint = new InteractHint(50, 50);

let triggers = [];

let floors = [];

let camera = new Camera;

let signs;

(async () => {
    signs = (await (await fetch('./signs.txt')).text()).split('\n');

    let i = 0;
    for (let s of signs) {
        triggers.push(new Trigger(200 + 250 * i,  250 - i * 10, 70, 200, s));
        const newFloor = new Floor(100 + 250 * i, 350 - i * 10, 450, 20);
        newFloor.type = 'floor';
        floors.push(newFloor);

        const floorEdge = new Floor(99 + 250 * i, 350 - i * 10, 1, 20);
        floors.push(floorEdge);
        i++;
    }
})();

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
            if (b2player.states.grounded) b2player.states.jumping = true;
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
            testInteractHint.act();
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
    listener.EndContact = function (contactPtr) {
        let contact = b2d.wrapPointer(contactPtr, b2d.b2Contact);
        let fixtureA = contact.GetFixtureA();
        let fixtureB = contact.GetFixtureB();

        // now do what you wish with the fixtures
        fixtureA._parent.endCollided(fixtureB);
        fixtureB._parent.endCollided(fixtureA);
    };
    listener.PreSolve = function () { };
    listener.PostSolve = function () { };

    world.SetContactListener(listener);
}

const draw = t => {
    world.Step(1 / 60, 3, 3);

    ctx.clearRect(0, 0, cnv.width, cnv.height);

    // lwall.drawB2BB(ctx, camera);
    lwall.draw(ctx, camera);



    triggers.forEach(t => {
        t.update();
        // t.drawB2BB(ctx, camera);
        t.draw(ctx, camera);
    })

    // b2player.drawB2BB(ctx, camera);
    b2player.update();
    b2player.draw(ctx, camera);

    testInteractHint.update();
    testInteractHint.draw(ctx, camera);

    // floor.drawB2BB(ctx, camera);

    floors.forEach(f=>{
        f.draw(ctx,camera);
    })
    // floor.draw(ctx, camera);

    testTxt.draw(ctx, camera);

    camera.follow(b2player);

    requestAnimationFrame(draw);
}

document.addEventListener('DOMContentLoaded', async e => {
    console.log('we got typescript');
    await b2Promise;
    loaded();
})

drawHandle = requestAnimationFrame(draw);