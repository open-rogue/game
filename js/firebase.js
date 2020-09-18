function gotPlayerData(data) {
	ghosts = [];
	var records = data.val();
	if (records != null) {
		var names = Object.keys(records);
		for (var k = 0; k < names.length; k++) {
			// Set variables
			var name = names[k];
			var x = records[name].x;
			var y = records[name].y;
			var room_id = records[name].room;
			var dir = createVector(records[name].dir[0], records[name].dir[1]);
			var time = records[name].lastAction;
			var is_moving = records[name].isMoving;
			var anim_frame = records[name].animFrame;
			// Assign values
			if (name != player_name && player != null) {
				// Ghost
				//print("Player:", player.room_id, "Ghost:", room_id)
				if (player.latestTime - time < PLAYER_TIMEOUT && player.room_id == room_id) {
					ghosts.push(new Player(name, x, y, dir, false, is_moving, anim_frame));
				}
			} else {
				// Player
				if (player_name == name && player == null) {
					print(records[name]);
					var inventory = ("inventory" in records[name]) ? records[name].inventory : {};
					player = new Player(player_name, x, y, dir, true, false, 0, inventory);
				} else {
					if (player != null) {
						player.latestTime = records[name].lastAction;
					}
				}
			}
		}
	}
	// Create player if not in database
	if (player == null) {
		print("Creating new player")
		var x = MAP_WIDTH  * TILESIZE * 0.5;
		var y = MAP_HEIGHT * TILESIZE * 0.5;
		player = new Player(player_name, x, y, createVector(0, 0), true, false, 0);
	}
	//draw();
}

function errPlayerData(err) {

}

function gotRoomData(data) {
	rooms = data.val();
	if (room == null) {
		room = new Room(START_ROOM);
	}
}

function errRoomData(err) {

}

function dbTimestamp() {
	return firebase.database.ServerValue.TIMESTAMP;
}