function setup() {
	// Create canvas
	//canvas = createCanvas(MAP_WIDTH * TILESIZE, (MAP_HEIGHT + 1.5) * TILESIZE);
	canvas = createCanvas(MAP_WIDTH * TILESIZE, MAP_HEIGHT * TILESIZE);
	canvas.parent('game');
	frameRate(15);
	noSmooth();
	textFont(font);
	// Set chat width
	//document.getElementById("chat").style.width = `${mapWidth()}px`;
	document.addEventListener('contextmenu', event => event.preventDefault());
	// Play audio
	bgm.loop();
	//document.getElementById("audio").play();
	particles = [];
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
		if (player.is_mouse_moving) { player.move(mouseX, mouseY) }
		// Display room
		room.display();
		// Display ghost players
		for (var k = 0; k < ghosts.length; k++) { ghosts[k].display() }
		// Show tile cursor
		mouseTileCursor();
		// Display player
		player.display();
		// Play player sounds
		player.sound();
		// Display particles
		for (var k = 0; k < particles.length; k++) { particles[k].display() }
		// Remove complete particles
		particles = particles.filter(function(particle) { return !particle.finished() });
		// Stats bar
		stats.display();
		// Weather
		if (!weather.clear() && room.weather) {
			weather.update();
			weather.display();
		}
	}
}

function mouseTileCursor() {
	if (mouseOnScreen()) {
		noFill();
		stroke(255);
		strokeWeight(2);
		rect(
			mouseX - (mouseX % TILESIZE), 
			mouseY - (mouseY % TILESIZE), 
			TILESIZE, TILESIZE,
			8
		);
	}
}

function mousePressed() {
	if (mouseButton == LEFT) {
		// Set moving flag on player
		if (player != null) {
			if (!stats.mouseClick()) {
				if (mouseOnScreen()) {
					player.startMouseMoving();
				}
			}
		}
	} else {
		room.interact(
			floor(mouseX / TILESIZE),
			floor(mouseY / TILESIZE)
		);
	}
}

function mouseReleased() {
	// Unset moving flag on player
	if (player != null) { player.stopMouseMoving() }
	document.getElementById("chat").focus(); 
}

function mouseOnScreen() {
	return inRange(mouseX, 0, width) && inRange(mouseY, 0, height);
}

function keyReleased() {
	if (keyCode === ENTER) {
		if (player != null && chatValue() != "") {
			player.chat(function() { clearChat() })
		}
	}
}

function isArrowKeyPressed() {
	return keyIsDown(LEFT_ARROW) || keyIsDown(RIGHT_ARROW) || keyIsDown(UP_ARROW) || keyIsDown(DOWN_ARROW);
}

function isEnterPressed() {
	return keyIsDown(ENTER);
}

function mapWidth() {
	return TILESIZE * MAP_WIDTH;
}

function mapHeight() {
	return TILESIZE * MAP_HEIGHT;
}

function inRange(n, min, max) {
    return ((n - min) * (n - max) <= 0);
}