class Player {
  constructor(name, x, y, dir, is_player, is_moving, anim_frame) {
  	this.name = name
    this.x = x;
    this.y = y;
    this.room_id = 1;
    this.dir = dir;
    this.is_player = is_player;
    this.is_moving = is_moving;
    this.is_mouse_moving = false;
    this.is_arrow_moving = false;
    this.latestTime = Infinity;
    this.lastWarp = 0;
    this.warpCooldown = 2;
    this.anim_speed = 4;
    this.anim_count = 0;
    this.anim_frame = anim_frame;
    if (this.is_player) {
      this.submit();
    }
  }

  move(x, y) {
    var vector = createVector(x - this.x, y - this.y).limit(PLAYER_SPEED);
    var new_x = this.x + vector.x;
    var new_y = this.y + vector.y;
    this.dir = vector.normalize();
    if (this.checkPos(new_x, new_y)) {
      this.x = new_x;
      this.y = new_y;
      this.anim_count++;
      if (this.anim_count >= this.anim_speed) {
        this.anim_count = 0;
        this.anim_frame = (this.anim_frame == 0) ? 1 : 0;
      }
      this.submit();      
    }
  }

  startMouseMoving() {
    this.is_mouse_moving = true;
  }

  stopMouseMoving() {
    this.is_mouse_moving = false;
    this.submit();    
  }

  startArrowMoving() {
    this.is_arrow_moving = true;
  }

  stopArrowMoving() {
    if (this.is_arrow_moving) {
      this.is_arrow_moving = false;
      this.submit();
    }
  }

  isMoving() {
    return this.is_moving || this.is_arrow_moving || this.is_mouse_moving;
  }

  display() {
    if (this.is_player) {
      fill(255, 0, 0);
    } else {
      fill(128);
    }
    //ellipse(this.x, this.y, 16, 16);
    if (!this.isMoving()) {
      image((this.dir.x < 0) ? player_left_img : player_right_img, this.x - TILESIZE/2, this.y - TILESIZE/2, TILESIZE, TILESIZE);
    } else {
      if (this.anim_frame == 0) {
        image((this.dir.x < 0) ? player_left_walk_a_img : player_right_walk_a_img, this.x - TILESIZE/2, this.y - TILESIZE/2, TILESIZE, TILESIZE);
      } else {
        image((this.dir.x < 0) ? player_left_walk_b_img : player_right_walk_b_img, this.x - TILESIZE/2, this.y - TILESIZE/2, TILESIZE, TILESIZE);
      }
    }
    line(this.x, this.y, this.x + this.dir.x * TILESIZE, this.y + this.dir.y * TILESIZE);
    textAlign(CENTER, CENTER);
  	text(this.name, this.x, this.y + TILESIZE);
  }

  submit() {
  	var data = {
  		x: this.x,
      y: this.y,
      room: this.room_id,
  		dir: [this.dir.x, this.dir.y],
      isMoving: this.isMoving(),
      animFrame: this.anim_frame,
      lastAction: firebase.database.ServerValue.TIMESTAMP
  	};
  	var ref = database.ref('mmo/players');
  	ref.child(this.name).set(data, this.gotData);
  }

  gotData(data) {

  }

  checkPos(new_x, new_y) {
    // Check canvas edge collision and teleportation
    // North
    if (new_y - (TILESIZE / 2) < 0) {
      if (room.north > -1) {
        print("Moved to room", room.north);
        this.room_id = room.north;
        room = new Room(room.north);
        this.y = height - TILESIZE;
      }
      return false;
    }
    // East
    if (new_x + (TILESIZE / 4) > width) {
      if (room.east > -1) {
        print("Moved to room", room.east);
        this.room_id = room.east;
        room = new Room(room.east);
        this.x = TILESIZE;
      }
      return false;
    }
    // South
    if (new_y + (TILESIZE / 2) > height) {
      if (room.south > -1) {
        print("Moved to room", room.south);
        this.room_id = room.south;
        room = new Room(room.south);
        this.y = TILESIZE;
      }
      return false;
    }
    // West
    if (new_x - (TILESIZE / 4) < 0) {
      if (room.west > -1) {
        print("Moved to room", room.west);
        this.room_id = room.west;
        room = new Room(room.west);
        this.x = width - TILESIZE;
      }
      return false;
    }
    //if (new_x - (TILESIZE / 4) < 0 || new_x + (TILESIZE / 4) > width) {
    //  return false;
    //}
    //if (new_y - (TILESIZE / 2) < 0 || new_y + (TILESIZE / 2) > height) {
    //  return false;
    //}
    // Check wall tile collision
    for (var k = 0; k < room.tiles.length; k++) {
      var tile = room.tiles[k];
      if (tile.is_wall) {
        if (createVector(new_x - tile.x(), new_y - tile.y()).mag() < TILESIZE * 0.8) {
          return false;
        }
      }
    }
    // Check warp collision
    for (var k = 0; k < room.warps.length; k++) {
      var warp = room.warps[k];
      if (warp.room != -1) {
        if (createVector(new_x - warp.x(), new_y - warp.y()).mag() < TILESIZE * 0.8) {
          if (this.latestTime - this.lastWarp > this.warpCooldown * 1000) {
            this.lastWarp = this.latestTime;
            this.room_id = warp.room;
            room = new Room(warp.room);
            return false;
          }
        }
      }
    }
    return true;
  }

  left() {
    return this.x;
  }

  top() {
    return this.y;
  }

  right() {
    return this.x + TILESIZE;
  }

  bottom() {
    return this.y + TILESIZE;
  }
}