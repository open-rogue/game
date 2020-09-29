function gotPlayerData(data) {
	if (is_retrieving) { return }
	is_retrieving = true;
	is_new = true;
	ghosts = [];
	var records = data.val();
	if (records != null) {
		var names = Object.keys(records);
		for (var k = 0; k < names.length; k++) {
			// Set variables
			var name = names[k];
			var type = (records[name].playerType == null) ? PLAYER_TYPES[0] : records[name].playerType;
			var x = records[name].x;
			var y = records[name].y;
			var room_id = records[name].room;
			var dir = createVector(records[name].dir[0], records[name].dir[1]);
			var time = records[name].lastAction;
			var is_moving = records[name].isMoving;
      		var anim_frame = records[name].animFrame;
			var chat_text = records[name].chatText;
			// Assign values
			if (name != player_name && player != null) {
				// Ghost
				if (player.latestTime - time < PLAYER_TIMEOUT && player.room_id == room_id) {
					ghosts.push(new Player(null, name, type, room_id, x, y, dir, false, is_moving, anim_frame, chat_text));
				}
			} else {
				// Player
				if (player_name == name && player == null && !is_validated) {
					is_new = false;
					if (validateSession(records[name].session)) {
						print("Valid");
						var inventory = ("inventory" in records[name]) ? records[name].inventory : {};
						var session = generateSession();
						player = new Player(session, player_name, type, room_id, x, y, dir, true, false, 0, chat_text, inventory);
						if (room != null) { player.changeRoom(room_id) }
					} else {
						print(player);
						print(is_validated);
						print(`Session key "${session_key}" is invalid, should be "${records[name].session}"`);
						//window.location.href = "http://www.google.com";
					}
				} else {
					if (player != null) {
						print("Set time")
						player.latestTime = records[name].lastAction;
						player.localTime = Date.now();
					}
				}
			}
		}
	}
	// Create player if not in database
	if (player == null && is_new) {
		print("Creating new player")
		var x = MAP_WIDTH  * TILESIZE * 0.5;
		var y = MAP_HEIGHT * TILESIZE * 0.5;
		var session = generateSession();
		player = new Player(session, player_name, player_type, START_ROOM, x, y, createVector(0, 0), true, false, 0);
	}
	//draw();
	is_retrieving = false;
}

function errPlayerData(err) {

}

function gotRoomData(data) {
	rooms = data.val();
	if (room == null) {
		var room_id = player == null ? START_ROOM : player.room_id;
		room = new Room(room_id in rooms ? room_id : START_ROOM);
	}
}

function errRoomData(err) {

}

function dbTimestamp() {
	return firebase.database.ServerValue.TIMESTAMP;
}