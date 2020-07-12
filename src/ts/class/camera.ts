export default class Camera {
    x=0;
    y=0;
    width=480;
    height=320;

    constructor() {

    }

    follow(object) {
        this.x = object.x - 200;
        this.y = object.y - 270;
    }
}