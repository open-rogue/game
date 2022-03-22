function gotPlayerData(data) {
	if (is_retrieving) { return }
	is_retrieving = true;
	is_new = true;
	ghosts = [];
	players = data.val();
	if (players != null) {
		var names = Object.keys(players);
		for (var k = 0; k < names.length; k++) {
			// Set variables
			var uid = names[k];
			var name = (players[uid].name == null) ? "Undefined" : players[uid].name;
			var type = (players[uid].playerType == null) ? PLAYER_TYPES[0] : players[uid].playerType;
			var x = players[uid].x;
			var y = players[uid].y;
			var room_id = players[uid].room;
			var dir = createVector(players[uid].dir[0], players[uid].dir[1]);
			var time = players[uid].lastAction;
			var is_moving = players[uid].isMoving;
      		var anim_frame = players[uid].animFrame;
			var chat_text = players[uid].chatText;
			// Assign values
			if (uid != player_uid && player != null) {
				// Ghost
				if (player.latestTime != 0 && player.latestTime - time < PLAYER_TIMEOUT && player.room_id == room_id) {
					ghosts.push(new Player(null, null, name, type, room_id, x, y, dir, false, is_moving, anim_frame, chat_text));
				}
			} else {
				// Player
				if (player_uid == uid && player == null) {
					is_new = false;
					if (validateSession(players[uid].otp)) {
						var inventory = ("inventory" in players[uid]) ? players[uid].inventory : {};
						var session = generateSession();
						player = new Player(session, player_uid, name, type, room_id, x, y, dir, true, false, 0, chat_text, inventory);
						if (room != null) { player.changeRoom(room_id) }
						stats.display();
					} else {
						print(`One-time password "${session_otp}" is invalid`);//, should be "${players[name].session}"`);
						window.location.href = "/index.html";
					}
				} else {
					if (player != null) {
						player.latestTime = players[uid].lastAction;
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
		stats.display();
	}
	//draw();
	is_retrieving = false;
}

function errPlayerData(err) {

}

function gotRoomData(data) {
	rooms = data.val();
	var room_id = player == null ? START_ROOM : player.room_id;
	if (room == null) {
		room = new Room(room_id in rooms ? room_id : START_ROOM);
	} else {
		room = new Room(room_id);
	}
}

function errRoomData(err) {

}

function dbTimestamp() {
	return firebase.database.ServerValue.TIMESTAMP;
}

function playerName(uid) {
	var uids = Object.keys(players);
	for (var k = 0; k < uids.length; k++) {
		if (uids[k] == uid) {
			return players[uids[k]].name;
		}
	}
	return null;
}