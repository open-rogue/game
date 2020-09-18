class Tile {
  constructor(i, j, type = "NULL") {
  	this.i = i;
    this.j = j;
    this.type = (type in tileset) ? type : "NULL";
    this.is_wall = colliders.includes(this.type);
  }

  display() {
    if (this.type in tileset) {
      image(tileset[this.type], this.i * TILESIZE, this.j * TILESIZE, TILESIZE, TILESIZE);
    }
  }

  x() {
    return (this.i * TILESIZE) + (TILESIZE / 2);
  }

  y() {
    return (this.j * TILESIZE) + (TILESIZE / 2);
  }

  left() {
    return this.i * TILESIZE;
  }

  right() {
    return this.left() + TILESIZE;
  }

  top() {
    return this.j * TILESIZE;
  }

  bottom() {
    return this.top() + TILESIZE;
  }
}