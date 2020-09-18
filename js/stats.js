class Stats {
    constructor() {
        this.gold = 0;
    }

    display() {
        fill("#FFFFFF");
        image(tileset["GOLD"], 0, height - TILESIZE, TILESIZE, TILESIZE);
        textAlign(LEFT, CENTER);
        textSize(16);
        text(" * " + player.inventory.GOLD, TILESIZE * 1, height - TILESIZE - 1, TILESIZE * 4, TILESIZE);
    }
}