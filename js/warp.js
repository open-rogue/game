class Warp extends Tile { 
    constructor(i, j, room) {
      super(i, j, "NULL");
      this.room = room;
    }

    room() {
        return this.room;
    }
}