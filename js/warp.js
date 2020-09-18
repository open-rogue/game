class Warp extends Tile { 
  constructor(i, j, room_id, room_x, room_y) {
    super(i, j, "NULL");
    this.room_id = room_id;
    this.room_x = room_x;
    this.room_y = room_y;
  }
}