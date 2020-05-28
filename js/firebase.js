function gotPlayerData(data) {
	ghosts = [];
	var records = data.val();
	var names = Object.keys(records);
	for (var k = 0; k < names.length; k++) {
		// Set variables
		var name = names[k];
		var x = records[name].x;
		var y = records[name].y;
		var dir = createVector(records[name].dir[0], records[name].dir[1]);
		var time = records[name].lastAction;
		var is_moving = records[name].isMoving;
		var anim_frame = records[name].animFrame;
		// Assign values
		if (name != player_name && player != null) {
			// Ghost
			if (player.latestTime - time < PLAYER_TIMEOUT) {
				ghosts.push(new Player(name, x, y, dir, false, is_moving, anim_frame));
			}
		} else {
			// Player
			if (player == null) {
				player = new Player(player_name, x, y, dir, true, false, 0);
			} else {
				player.latestTime = records[name].lastAction;
			}
		}
	}
	// Create player if not in database
	if (player == null) {
		player = new Player(player_name, width/2, height/2, createVector(0, 0), true, false, 0);
	}
	//draw();
}

function errPlayerData(err) {

}

function gotRoomData(data) {
	rooms = data.val();
	if (room == null) {
		room = new Room(1);
	}
}

function errRoomData(err) {

}