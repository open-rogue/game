function setup() {
	// Create canvas
	canvas = createCanvas(MAP_WIDTH * TILESIZE, MAP_HEIGHT * TILESIZE);
	canvas.parent('game');
	frameRate(15);
	noSmooth();
	// Play audio
	bgm.loop();
	//document.getElementById("audio").play();
}

function draw() {
	// Reset canvas
	background("#222323");
	// If player and room are defined
	if (player != null && room != null) {
		// Move player with keyboard
		if (!player.is_mouse_moving) {
			isArrowKeyPressed() ? player.startArrowMoving() : player.stopArrowMoving()
			if (keyIsDown(LEFT_ARROW )) { player.move(player.x - TILESIZE, player.y) }
			if (keyIsDown(RIGHT_ARROW)) { player.move(player.x + TILESIZE, player.y) }
			if (keyIsDown(UP_ARROW   )) { player.move(player.x, player.y - TILESIZE) }
			if (keyIsDown(DOWN_ARROW )) { player.move(player.x, player.y + TILESIZE) }
		}
		// Move player with mouse
		if (player.is_mouse_moving) { player.move(mouseX, mouseY); }
		// Display room
		room.display();
		// Display ghost players
		for (var k = 0; k < ghosts.length; k++) { ghosts[k].display(); }
		// Display player
		player.display();
	}
}

function mousePressed() {
	// Set moving flag on player
	if (player != null) { player.startMouseMoving(); }
}

function mouseReleased() {
	// Unset moving flag on player
	if (player != null) { player.stopMouseMoving(); }
}

function isArrowKeyPressed() {
	return keyIsDown(LEFT_ARROW) || keyIsDown(RIGHT_ARROW) || keyIsDown(UP_ARROW) || keyIsDown(DOWN_ARROW);
}