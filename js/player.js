class Player {
  constructor(session, uid, name, type, room_id, x, y, dir, is_player, is_moving, anim_frame, chat_text = "", inventory = { "GOLD": 0 }) {
    this.session = session;
    this.uid = uid;
    this.name = name;
    this.playerType = this.checkPlayerType(type);
    this.x = x;
    this.y = y;
    this.room_id = room_id;
    this.home_id = "home_" + this.name.toLowerCase();
    this.dir = dir;
    this.is_player = is_player;
    this.is_moving = is_moving;
    this.is_mouse_moving = false;
    this.is_arrow_moving = false;
    this.latestTime = 0;
    this.localTime = Date.now();
    this.lastWarp = 0;
    this.warpCooldown = 1000;
    this.soundCooldown = 3;
    this.anim_speed = 4;
    this.anim_count = 0;
    this.inventory = inventory;
    this.anim_frame = anim_frame;
    this.chatText = chat_text;
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

  goHome() {
    if (room != null) {
      print(this.home_id);
      if (!(this.home_id in rooms)) {
        this.initializeRoom( function() {
          player.goHome();
        } );
      } else {
        this.changeRoom(this.home_id, 0.5 * mapWidth(), 0.5 * mapHeight());
      }
    } else {
      print("Room null")
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

  checkPlayerType(type) {
    if (type == null) { return PLAYER_TYPES[0] }
    return PLAYER_TYPES.includes(type) ? type : PLAYER_TYPES[0];
  }

  changePlayerType(type) {
		if (PLAYER_TYPES.includes(type)) {
      this.playerType = type;
      this.submit();
    } else {
      print(type, "NOT IN PLAYER_TYPES", PLAYER_TYPES);
    }
  }

  chat(callback) {
    if (chatExecute(chatValue()) == null) {
      this.chatText = chatValue();
      this.chatCooldown = CHAT_COOLDOWN;
      this.submit();
    }
    callback();
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
    var sprite = sprites[this.playerType];
    if (!this.isMoving()) {
      image((this.dir.x < 0) ? sprite[SPRITE_LEFT] : sprite[SPRITE_RIGHT], this.x - TILESIZE/2, this.y - TILESIZE/2, TILESIZE, TILESIZE);
    } else {
      if (this.anim_frame == 0) {
        image((this.dir.x < 0) ? sprite[SPRITE_LEFT_A] : sprite[SPRITE_RIGHT_A], this.x - TILESIZE/2, this.y - TILESIZE/2, TILESIZE, TILESIZE);
      } else {
        image((this.dir.x < 0) ? sprite[SPRITE_LEFT_B] : sprite[SPRITE_RIGHT_B], this.x - TILESIZE/2, this.y - TILESIZE/2, TILESIZE, TILESIZE);
      }
    }
    // Direction vector
    //stroke(255, 255, 255);
    //line(this.x, this.y, this.x + this.dir.x * TILESIZE, this.y + this.dir.y * TILESIZE);
    //noStroke();
    // Name
    noStroke();
    //this.is_player ? fill(255, 0, 0) : fill(128);
    if (this.is_player) {
      fill(255, 0, 0, 128);
      var bounds = font.textBounds(this.name + " ", 0, 0, TILESIZE / 2);
      rect(this.x - bounds.w / 2, this.y + TILESIZE - 6, bounds.w, bounds.h + 4);
    }
    fill(255);
    textAlign(CENTER, CENTER);
    textSize(TILESIZE / 2);
    text(this.name, this.x, this.y + TILESIZE);
    // Chat
    if (this.chatText != "") {
      fill(255);
      text(this.chatText, this.x, this.y - TILESIZE);
      if (this.is_player) {
        this.chatCooldown -= 1;
        if (this.chatCooldown == 0) { 
          this.chatText = ""
          this.submit();
        }
      }
    }
    // Inventory and particle test
    if (this.is_player && this.isMoving()) {
      if (random(1) < 0.05) {
        particles.push(new Particle("PLUS_GOLD", this.x, this.y - TILESIZE, 12));
        this.addItem("GOLD", 1);
      }
    }
  }

  round(num, places) {
    return parseFloat(parseFloat(num).toFixed(places));
  }

  submit() {
    if (Date.now() - this.localTime > 100) {
      var data = {
        room: this.room_id,
        x: this.round(this.x, 4),
        y: this.round(this.y, 4),
        dir: [
          this.round(this.dir.x, 4), 
          this.round(this.dir.y, 4)
        ],
        isMoving: this.isMoving(),
        animFrame: this.anim_frame,
        playerType: this.playerType,
        lastAction: dbTimestamp(),
        inventory: this.inventory,
        chatText: this.chatText,
        session: this.session,
        name: this.name
      };
      var ref = database.ref('mmo/players');
      ref.child(this.uid).set(data, this.gotData);
    }
  }

  gotData(data) {

  }

  changeRoom(room_id, x = null, y = null) {
    room_id = room_id.toLowerCase();
    print(room_id);
    if (room_id in rooms) {
      if (x != null) { this.x = parseFloat(x) }
      if (y != null) { this.y = parseFloat(y) }
      this.room_id = room_id;
      if (room == null || room.room_id != room_id) {
        print(`Moved to room ${room_id} [${this.round(this.x)}, ${this.round(this.y)}]`);
        room = new Room(room_id);
        this.submit();
      }
      
    }
  }

  checkPos(new_x, new_y) {
    // Check canvas edge collision and teleportation
    var new_left   = new_x - (TILESIZE / 2);
    var new_right  = new_x + (TILESIZE / 2);
    var new_top    = new_y - (TILESIZE / 2);
    var new_bottom = new_y + (TILESIZE / 2);
    // North
    if (new_y - (TILESIZE / 2) < 0) {
      if (room.north != null) {
        this.changeRoom(room.north, this.x, room.height - TILESIZE);
      }
      return false;
    }
    // East
    if (new_x + (TILESIZE / 4) > room.width) {
      if (room.east != null) {
        this.changeRoom(room.east, TILESIZE, this.y);
      }
      return false;
    }
    // South
    if (new_y + (TILESIZE / 2) > room.height) {
      if (room.south != null) {
        this.changeRoom(room.south, this.x, TILESIZE);
      }
      return false;
    }
    // West
    if (new_x - (TILESIZE / 4) < 0) {
      if (room.west != null) {
        this.changeRoom(room.west, room.width - TILESIZE, this.y);
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

  addItem(item, quantity) {
    if (item in this.inventory) {
      this.inventory[item] += quantity;
    } else {
      this.inventory[item] = quantity;
    }
    if (this.inventory[item] == 0) {
      delete this.inventory[item];
    }
  }

  initializeRoom(callback) {
    var data = {
      room_id: this.home_id,
      name: `${this.name}'s Home`,
      color: "#222223",
      tiles: getRoomData("example_home"),
      props: [[-1, -1, "NULL"]],
      signs: [[7, 6, `${this.name}'s Home`]],
      warps: [[-1, -1, -1, -1, -1]],
      weather: false
    };
  	var ref = database.ref('mmo/rooms');
    ref.child(this.home_id).set(data, this.gotData);
    callback();
  }
}