class Tile {
  constructor(i, j, type) {
  	this.i = i;
    this.j = j;
    this.type = type;
    this.is_wall = (type != 0);
  }

  display() {
    image(tileset[this.type], this.i * TILESIZE, this.j * TILESIZE);
  }

  x() {
    return (this.i * TILESIZE) + (TILESIZE / 2);
  }

  y() {
    return (this.j * TILESIZE) + (TILESIZE / 2);
  }
}

class TileMap {
  constructor(room_id) {
    this.room_id = room_id;
    this.tiles = [];
    this.data = rooms[this.room_id].data;
    this.north = rooms[this.room_id].north;
    this.east = rooms[this.room_id].east;
    this.south = rooms[this.room_id].south;
    this.west = rooms[this.room_id].west;
    // Set tiles
    for (var j = 0; j < MAP_HEIGHT; j++) {
      for (var i = 0; i < MAP_WIDTH; i++) {
        var index = (j * MAP_WIDTH) + i;
        var type = int(this.data.charAt(index));
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