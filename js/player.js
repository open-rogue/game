class Player {
  constructor(name, x, y, dir, is_player, is_moving, anim_frame) {
  	this.name = name
    this.x = x;
    this.y = y;
    this.dir = dir;
    this.is_player = is_player;
    this.is_moving = is_moving;
    this.latestTime = Infinity;
    this.anim_speed = 4;
    this.anim_count = 0;
    this.anim_frame = anim_frame;
    if (this.is_player) {
      this.submit();
    }
  }

  move(x, y) {
    var vector = createVector(x - this.x, y - this.y);
    var mag = (vector.mag() > PLAYER_SPEED) ? PLAYER_SPEED : vector.mag();
  	this.dir = vector.normalize();
    var new_x = this.x + this.dir.x * mag;
    var new_y = this.y + this.dir.y * mag;
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

  startMoving() {
    this.is_moving = true;
  }

  stopMoving() {
    this.is_moving = false;
    this.submit();    
  }

  display() {
    if (this.is_player) {
      fill(255, 0, 0);
    } else {
      fill(128);
    }
    //ellipse(this.x, this.y, 16, 16);
    if (!this.is_moving) {
      image((this.dir.x < 0) ? player_left_img : player_right_img, this.x - TILESIZE/2, this.y - TILESIZE/2);
    } else {
      if (this.anim_frame == 0) {
        image((this.dir.x < 0) ? player_left_walk_a_img : player_right_walk_a_img, this.x - TILESIZE/2, this.y - TILESIZE/2);
      } else {
        image((this.dir.x < 0) ? player_left_walk_b_img : player_right_walk_b_img, this.x - TILESIZE/2, this.y - TILESIZE/2);
      }
    }
    line(this.x, this.y, this.x + this.dir.x * TILESIZE, this.y + this.dir.y * TILESIZE);
    textAlign(CENTER, CENTER);
  	text(this.name, this.x, this.y + 32);
  }

  submit() {
  	var data = {
  		x: this.x,
  		y: this.y,
  		dir: [this.dir.x, this.dir.y],
      isMoving: this.is_moving,
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
        print(room.north);
        room = new Room(room.north);
        this.y = 32;
      }
      return false;
    }
    // East
    if (new_x + (TILESIZE / 4) > width) {
      if (room.east > -1) {
        print(room.east);
        room = new Room(room.east);
        this.x = 32;
      }
      return false;
    }
    // South
    if (new_y + (TILESIZE / 2) > height) {
      if (room.south > -1) {
        print(room.south);
        room = new Room(room.south);
        this.y = height - 32;
      }
      return false;
    }
    // West
    if (new_x - (TILESIZE / 4) < 0) {
      if (room.west > -1) {
        print(room.west);
        room = new Room(room.west);
        this.x = width - 32;
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
        if (createVector(new_x - tile.x(), new_y - tile.y()).mag() < 32) {
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