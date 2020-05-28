function setup() {
	// Canvas
	canvas = createCanvas(MAP_WIDTH * TILESIZE, MAP_HEIGHT * TILESIZE);
	canvas.parent('wrapper');
	frameRate(15);
}

function draw() {
	background("#4E4A4E");
	// Move
	if (player != null && player.is_moving) {
		player.move(mouseX, mouseY);
	}
	// Display room, player, and ghosts
	if (player != null && room != null) {
		room.display();
		player.display();
		for (var k = 0; k < ghosts.length; k++) {
			ghosts[k].display();
		}
	}
}

function mousePressed() {
	if (player != null) {
		player.startMoving();
	}
}

function mouseReleased() {
	if (player != null) {
		player.stopMoving();
	}
}