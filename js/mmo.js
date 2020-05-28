function setup() {
	// Canvas
	canvas = createCanvas(16 * TILESIZE, 12 * TILESIZE);
	canvas.parent('wrapper');
	textAlign(CENTER, CENTER);
	frameRate(15);
	// Player
	var name = (getURLParams().name == null) ? "Null" : getURLParams().name;
	player = new Player(name, width/2, height/2, createVector(0, 0), true, false, 0);
	// Canvas events
  	// Map
  	if (rooms != null) {
		tilemap = new TileMap(1);
  	}
}

function mousePressed() {
	player.startMoving();
}

function mouseReleased() {
	player.stopMoving();
}

function draw() {
	background("#4E4A4E");
	// Move
	if (player.is_moving) {
		player.move(mouseX, mouseY);
	}
	// Display map
	if (tilemap != null) {
		tilemap.display();
	}
	// Display player
	player.display();
	// Display ghosts
	for (var k = 0; k < ghosts.length; k++) {
		ghosts[k].display();
	}
}

function gotPlayerData(data) {
	ghosts = [];
	var records = data.val();
	var names = Object.keys(records);
	for (var k = 0; k < names.length; k++) {
		var name = names[k];
		if (name != player.name) {
			var x = records[name].x;
			var y = records[name].y;
			var dir = createVector(records[name].dir[0], records[name].dir[1]);
			var time = records[name].lastAction;
			var is_moving = records[name].isMoving;
			var anim_frame = records[name].animFrame;
			// 10 minute timeout
			var timeout = 10 * 60 * 1000;
			if (player.latestTime - time < timeout) {
				ghosts.push(new Player(name, x, y, dir, false, is_moving, anim_frame));
			}
		} else {
			player.latestTime = records[name].lastAction;
		}
	}
	//draw();
}

function errPlayerData(err) {

}

function gotRoomData(data) {
	rooms = data.val();
	if (tilemap == null) {
		tilemap = new TileMap(0);
	}
}

function errRoomData(err) {

}