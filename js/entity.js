class Entity {
    constructor(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }

    left() {
        return this.x - this.w / 2;
    }

    top() {
        return this.y - this.h / 2;
    }

    right() {
        return this.x + this.w / 2;
    }

    bottom() {
        return this.y + this.h / 2;
    }

    contains(x, y) {
        return (
            inRange(x, this.left(), this.right() ) && 
            inRange(y, this.top(),  this.bottom())
        );
    }
}