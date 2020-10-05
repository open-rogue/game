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
			var uid = names[k];
			print(uid);
			var name = (records[uid].name == null) ? "Undefined" : records[uid].name;
			var type = (records[uid].playerType == null) ? PLAYER_TYPES[0] : records[uid].playerType;
			var x = records[uid].x;
			var y = records[uid].y;
			var room_id = records[uid].room;
			var dir = createVector(records[uid].dir[0], records[uid].dir[1]);
			var time = records[uid].lastAction;
			var is_moving = records[uid].isMoving;
      		var anim_frame = records[uid].animFrame;
			var chat_text = records[uid].chatText;
			// Assign values
			if (uid != player_uid && player != null) {
				// Ghost
				if (player.latestTime - time < PLAYER_TIMEOUT && player.room_id == room_id) {
					ghosts.push(new Player(null, null, name, type, room_id, x, y, dir, false, is_moving, anim_frame, chat_text));
				}
			} else {
				// Player
				if (player_uid == uid && player == null) {
					is_new = false;
					if (validateSession(records[uid].session)) {
						var inventory = ("inventory" in records[uid]) ? records[uid].inventory : {};
						var session = generateSession();
						player = new Player(session, player_uid, name, type, room_id, x, y, dir, true, false, 0, chat_text, inventory);
						if (room != null) { player.changeRoom(room_id) }
					} else {
						print(`Session key "${session_key}" is invalid`);//, should be "${records[name].session}"`);
						window.location.href = "/index.html";
					}
				} else {
					if (player != null) {
						player.latestTime = records[uid].lastAction;
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
		player = new Player(session, player_uid, player_name, player_type, START_ROOM, x, y, createVector(0, 0), true, false, 0);
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