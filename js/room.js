class Room {
    constructor(room_id) {
        this.room_id = room_id;
        this.tiles = [];
        this.warps = [];
        this.signs = [];
        this.data  = rooms[this.room_id].data;
        this.north = rooms[this.room_id].north;
        this.east  = rooms[this.room_id].east;
        this.south = rooms[this.room_id].south;
        this.west  = rooms[this.room_id].west;
        this.color = rooms[this.room_id].color;
        this.height = TILESIZE * MAP_HEIGHT;
        this.width = TILESIZE * MAP_WIDTH;
        // Set warps
        for (var k = 0; k < rooms[this.room_id].warps.length; k++) {
            var warp = rooms[this.room_id].warps[k];
            var warp_x  = warp[0];
            var warp_y  = warp[1];
            var room_id = warp[2];
            var room_x  = warp[3];
            var room_y  = warp[4];
            if (room_id != -1) {
                this.warps.push(new Warp(warp_x, warp_y, room_id, room_x, room_y));
            }
        }
        // Set signs
        for (var k = 0; k < rooms[this.room_id].signs.length; k++) {
            var sign = rooms[this.room_id].signs[k];
            var sign_x = sign[0];
            var sign_y = sign[1];
            var text   = sign[2];
            if (text != "") {
                this.signs.push(new Sign(sign_x, sign_y, text));
            }
        }
        // Set tiles
        for (var j = 0; j < MAP_HEIGHT; j++) {
            for (var i = 0; i < MAP_WIDTH; i++) {
                var index = (j * MAP_WIDTH) + i;
                var type  = this.data[index];
                this.tiles.push(new Tile(i, j, type));
            }
        }
    }

    display(only_colliders = false) {
        background(this.color);
		document.getElementById("game").style.backgroundColor = this.color;
        for (var k = 0; k < this.tiles.length; k++) {
            this.tiles[k].display();
        }
    }
}