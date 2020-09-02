class Tile {
  constructor(i, j, type) {
  	this.i = i;
    this.j = j;
    this.type = type;
    this.is_wall = COLLIDERS.includes(type);
  }

  display() {
    var key = (this.type in tileset) ? this.type : "NULL";
    image(tileset[key], this.i * TILESIZE, this.j * TILESIZE);
  }

  x() {
    return (this.i * TILESIZE) + (TILESIZE / 2);
  }

  y() {
    return (this.j * TILESIZE) + (TILESIZE / 2);
  }
}