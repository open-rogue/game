class Particle { 
    constructor(type, x, y, t, size = 16) {
        this.type = type;
        this.x = x;
        this.y = y;
        this.t = t;
        this.size = size;
    }
    
    display() {
        if (this.type in tileset) {
            image(tileset[this.type], this.x - this.size/2, this.y - this.size/2, this.size, this.size);
        } else {
            print(this.type + " does not exist in tileset");
        }
    }

    decrease() {
        return this.t -= 1;
    }

    finished() {
        return this.t <= 0;
    }
}
 