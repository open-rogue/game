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