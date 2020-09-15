class Player {
  constructor(name, x, y, dir, is_player, is_moving, anim_frame) {
  	this.name = name
    this.x = x;
    this.y = y;
    this.room_id = START_ROOM;
    this.dir = dir;
    this.is_player = is_player;
    this.is_moving = is_moving;
    this.is_mouse_moving = false;
    this.is_arrow_moving = false;
    this.latestTime = Infinity;
    this.lastWarp = 0;
    this.warpCooldown = 1000;
    this.soundCooldown = 3;
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
    // Check dir
    if (this.checkPos(new_x, new_y)) {
      this.x = new_x;
      this.y = new_y;
      this.anim_count++;
      if (this.anim_count >= this.anim_speed) {
        this.anim_count = 0;
        this.anim_frame = (this.anim_frame == 0) ? 1 : 0;
      }
      this.submit();
      return true;
    }
    // Check only X vector
    if (this.checkPos(new_x, this.y)) {
      this.x = new_x;
      this.anim_count++;
      if (this.anim_count >= this.anim_speed) {
        this.anim_count = 0;
        this.anim_frame = (this.anim_frame == 0) ? 1 : 0;
      }
      this.submit();
      return true;
    }
    // Check only Y vector
    if (this.checkPos(this.x, new_y)) {
      this.y = new_y;
      this.anim_count++;
      if (this.anim_count >= this.anim_speed) {
        this.anim_count = 0;
        this.anim_frame = (this.anim_frame == 0) ? 1 : 0;
      }
      this.submit();
      return true;
    }
    return false;
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

  sound() {
    if (this.isMoving()) {
      if (this.soundCooldown == 0) {
        if (this.anim_count % 2 == 0) {
          step_left_sound.play(0, 1, 0.3);
          this.soundCooldown = 3;
        } else {
          step_right_sound.play(0, 1, 0.3);
          this.soundCooldown = 3;
        }
      } else {
        this.soundCooldown -= 1;
      }
    } else {
      this.soundCooldown = 0;
    }
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
    stroke(255, 255, 255);
    line(this.x, this.y, this.x + this.dir.x * TILESIZE, this.y + this.dir.y * TILESIZE);
    noStroke();
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
    var new_left   = new_x - (TILESIZE / 2);
    var new_right  = new_x + (TILESIZE / 2);
    var new_top    = new_y - (TILESIZE / 2);
    var new_bottom = new_y + (TILESIZE / 2);
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
    // Check wall tile collision
    for (var k = 0; k < room.tiles.length; k++) {
      var tile = room.tiles[k];
      if (tile.is_wall) {
        if ((new_right > tile.left()) && (new_left < tile.right())) {
          if ((new_bottom > tile.top()) && (new_top < tile.bottom())) {
            return false;
          }
        }
      }
    }
    // Check sign
    var is_sign = false;
    for (var k = 0; k < room.signs.length; k++) {
      var sign = room.signs[k];
      if (createVector(new_x - sign.x(), new_y - sign.y()).mag() < TILESIZE * 2) {
        setGameText(sign.text);
        is_sign = true;
      }
    }
    if (!is_sign) {
      clearGameText();
    }
    // Check warp collision
    for (var k = 0; k < room.warps.length; k++) {
      var warp = room.warps[k];
      if (createVector(new_x - warp.x(), new_y - warp.y()).mag() < TILESIZE * 0.8) {
        if (this.latestTime - this.lastWarp > this.warpCooldown) {
          this.lastWarp = this.latestTime;
          this.room_id = warp.room_id;
          room = new Room(warp.room_id);
          this.x = warp.room_x * TILESIZE;
          this.y = warp.room_y * TILESIZE;
          return false;
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