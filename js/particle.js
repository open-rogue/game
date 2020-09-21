class Particle { 
    constructor(type, x, y, t, size = 16) {
        this.type = (type in tileset) ? type : "NULL";
        this.x = x;
        this.y = y;
        this.t = t;
        this.size = size;
    }
    
    display() {
        image(tileset[this.type], this.x - this.size/2, this.y - this.size/2, this.size, this.size);
        this.decrease();
    }

    decrease() {
        return this.t -= 1;
    }

    finished() {
        return this.t <= 0;
    }
}