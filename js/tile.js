class Tile {
  constructor(i, j, type = "NULL") {
  	this.i = i;
    this.j = j;
    this.type = (type in tileset) ? type : "NULL";
    this.is_wall = COLLIDERS.includes(this.type);
  }

  display() {
    image(tileset[this.type], this.i * TILESIZE, this.j * TILESIZE, TILESIZE, TILESIZE);
  }

  x() {
    return (this.i * TILESIZE) + (TILESIZE / 2);
  }

  y() {
    return (this.j * TILESIZE) + (TILESIZE / 2);
  }
}