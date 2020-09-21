class Weather {
    constructor() {
        this.raining = false;
        this.particles = [];
        for (var k = 0; k < 200; k++) {
            this.particles.push(
                new Droplet(random(mapWidth()), random(mapHeight()))
            );
        }
    }

    update() {
        for (var k = 0; k < this.particles.length; k++) {
            this.particles[k].update();
        }
    }

    display() {
        for (var k = 0; k < this.particles.length; k++) {
            this.particles[k].display();
        }
    }
}

class Droplet {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.v_x = 5 + random(5);
        this.v_y = 10 + random(10);
        this.r = map(this.v_y, 20, 10, 1, 2);
    }

    update() {
        this.x += this.v_x;
        this.y += this.v_y;
        if (this.x > mapWidth()) { this.x = 0 }
        if (this.x < 0) { this.x = mapWidth() }
        if (this.y > mapHeight()) { this.y = 0 }
        if (this.y < 0) { this.y = mapHeight() }
    }

    display() {
        stroke(255, 50);
        strokeWeight(this.r);
        line(this.x, this.y, this.x - 0.5 * this.v_x, this.y - 0.5 * this.v_y);
    }
}