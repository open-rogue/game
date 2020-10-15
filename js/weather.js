const WEATHER_CLEAR = 0
const WEATHER_RAIN  = 1
const WEATHER_SNOW  = 2

class Weather {
    constructor() {
        this.state = WEATHER_CLEAR;
        this.particles = [];
        this.particleCount = 200;
    }

    set(state) {
        this.state = state;
        this.initialize();
    }

    toggle(state) {
        this.state = (this.state == state) ? WEATHER_CLEAR : state;
        this.initialize();
    }

    clear() {
        return this.state == WEATHER_CLEAR;
    }

    initialize() {
        if (this.clear()) { return null }
        this.particles = [];
        for (var k = 0; k < this.particleCount; k++) {
            this.particles.push(
                new Droplet(random(mapWidth()), random(mapHeight()), this.state)
            );
        }
    }

    current() {
        switch(this.state) {
            case WEATHER_CLEAR:
                return "CLEAR";
            case WEATHER_RAIN:
                return "RAIN";
            case WEATHER_SNOW:
                return "SNOW";
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
    constructor(x, y, state) {
        this.x = x;
        this.y = y;
        this.state = state;
        if (this.state == WEATHER_RAIN) {
            this.v_x = 5 + random(5);
            this.v_y = 10 + random(10);
            this.r = map(this.v_y, 20, 10, 1, 2);
        }
        if (this.state == WEATHER_SNOW) {
            this.v_x = 0;
            this.v_y = 2.5 + random(5);
            this.r = map(this.v_y, 5, 2.5, 2, 3);
        }
    }

    update() {
        if (this.state == WEATHER_RAIN) {
            this.x += this.v_x;
            this.y += this.v_y;
        }
        if (this.state == WEATHER_SNOW) {
            this.x += random(4) - 2;
            this.y += this.v_y;
        }
        // Wrap
        if (this.x > mapWidth()) { this.x = 0 }
        if (this.x < 0) { this.x = mapWidth() }
        if (this.y > mapHeight()) { this.y = 0 }
        if (this.y < 0) { this.y = mapHeight() }
    }

    display() {
        if (this.state == WEATHER_RAIN) {
            stroke(255, 50);
            strokeWeight(this.r);
            line(this.x, this.y, this.x - 0.5 * this.v_x, this.y - 0.5 * this.v_y);
        }
        if (this.state == WEATHER_SNOW) {
            fill(255, 200);
            noStroke();
            circle(this.x, this.y, this.r);
        }
    }
}