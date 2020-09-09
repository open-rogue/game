class Room {
    constructor(room_id) {
        this.room_id = room_id;
        this.tiles = [];
        this.warps = [];
        this.data = rooms[this.room_id].data;
        this.north = rooms[this.room_id].north;
        this.east = rooms[this.room_id].east;
        this.south = rooms[this.room_id].south;
        this.west = rooms[this.room_id].west;
        // Set warps
        for (var j = 0; j < MAP_HEIGHT; j++) {
            for (var i = 0; i < MAP_WIDTH; i++) {
                var index = (j * MAP_WIDTH) + i;
                var room = rooms[this.room_id].warps[index];
                if (room != -1) {
                    this.warps.push(new Warp(i, j, room));
                }
            }
        }
        // Set tiles
        for (var j = 0; j < MAP_HEIGHT; j++) {
            for (var i = 0; i < MAP_WIDTH; i++) {
                var index = (j * MAP_WIDTH) + i;
                var type = this.data[index];
                this.tiles.push(new Tile(i, j, type));
            }
        }
    }

    display() {
        for (var k = 0; k < this.tiles.length; k++) {
            this.tiles[k].display();
        }
    }
}