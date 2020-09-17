class Stats {
    constructor() {
        this.gold = 0;
    }

    display() {
        image(tileset["GOLD"], 0, height - TILESIZE, TILESIZE, TILESIZE);
    }
}