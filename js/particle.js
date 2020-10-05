class Particle { 
    constructor(type, x, y, t, fade = true, rise = true, size = 16) {
        this.type = (type in tileset) ? type : "NULL";
        this.x = x;
        this.y = y;
		this.t = t; // Decremented value
		this.o = t; // Original value
		this.fade = fade;
		this.rise = rise;
        this.size = size;
    }
    
    display() {
		if (this.fade) { tint(255, 255 * this.t / this.o) }
    	image(tileset[this.type], this.x - this.size/2, this.y - this.size/2, this.size, this.size);
		noTint();
		this.decrease();
    }

    decrease() {
		if (this.rise) { this.y -= 2 }
        return this.t -= 1;
    }

    finished() {
        return this.t <= 0;
    }
}