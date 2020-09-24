class Stats {
    constructor() {
        this.gold = 0;
    }

    top() {
        return height - TILESIZE;
    }

    display() {
        fill("#FFFFFF");
        textAlign(LEFT, CENTER);
        textSize(16);
        // Gold
        var quantity = player.inventory.GOLD == null ? 0 : player.inventory.GOLD;
        image(tileset["GOLD"], 0, height - TILESIZE, TILESIZE, TILESIZE);
        text(" * " + quantity, TILESIZE * 1, height - TILESIZE - 1, TILESIZE * 4, TILESIZE);
        // Potion
        var quantity = player.inventory.POTION == null ? 0 : player.inventory.POTION;
        image(tileset["POTION"], TILESIZE * 4, height - TILESIZE, TILESIZE, TILESIZE);
        text(" * " + quantity, TILESIZE * 5, height - TILESIZE - 1, TILESIZE * 4, TILESIZE);
        // Home
        image(tileset["HOME"], mapWidth() - TILESIZE, height - TILESIZE, TILESIZE, TILESIZE);
    }

    mouseClick() {
        // Home
        if (inRange(mouseX, mapWidth() - TILESIZE, mapWidth())) {
            print("Home clicked");
            return true;
        }
    }

    updateCursor() {
        // Home
        if (inRange(mouseX, mapWidth() - TILESIZE, mapWidth())) {
            cursor(HAND);
            return true;
        }
    }
}