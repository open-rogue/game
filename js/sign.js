class Sign extends Tile { 
  constructor(i, j, text) {
    super(i, j, "NULL");
    this.text = text;
  }

  display() {
    noStroke();
    fill(0, 0, 0, 192);
    var bounds = font.textBounds(this.text + " ", 0, 0, TILESIZE / 2);
    rect(this.x() - bounds.w / 2, this.y() - TILESIZE - 6, bounds.w, bounds.h + 4);
    fill(255);
    textAlign(CENTER, CENTER);
    text(this.text, this.x(), this.y() - TILESIZE);
  }
}