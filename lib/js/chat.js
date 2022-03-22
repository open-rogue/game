function chatValue() {
	return document.getElementById("chat").value;
}

function setChat(value = "") {
	document.getElementById("chat").value = value;
}

function clearChat() {
	setChat()
}


function chatExecute(str) {
	if (str[0] != "/") { return null }
	command = str.substring(1).split(" ");
	if (command[0] == "spawn") {
		player.changeRoom(START_ROOM, 0.5 * mapWidth(), 0.5 * mapHeight());
        printToConsole(`Warped to [SPAWN]`);
		return true;
	}
	if (command[0] == "room") {
		if (command.length == 2) {
			player.changeRoom(command[1], 0.5 * mapWidth(), 0.5 * mapHeight());
			printToConsole(`Warped to [${command[1]}]`);
			return true;
		} else if (command.length == 4) {
			player.changeRoom(command[1], command[2], command[3]);
			printToConsole(`Warped to [${command[1]}]`);
			return true;
		}
	}
	if (command[0] == "rain") {
		setConfig("weather", weather.state == WEATHER_RAIN ? WEATHER_CLEAR : WEATHER_RAIN);
		weather.state == WEATHER_RAIN ? rain_sound.loop() : rain_sound.stop();
        printToConsole(`Set weather state to [${weather.current()}]`);
		return true;
	}
	if (command[0] == "snow") {
		setConfig("weather", weather.state == WEATHER_SNOW ? WEATHER_CLEAR : WEATHER_SNOW);
		weather.state == WEATHER_RAIN ? rain_sound.loop() : rain_sound.stop();
        printToConsole(`Set weather state to [${weather.current()}]`);
		return true;
	}
	if (command[0] == "skin") {
		if (player.changePlayerType(command[1])) {
			printToConsole(`Changed skin to [${command[1]}]`);
		}
		return true;
	}
	if (command[0] == "home") {
		if (command.length == 1) {
			player.goHome();
			printToConsole(`Warped to [HOME]`);
		} else {
			player.changeRoom("home_" + command[1], 0.5 * mapWidth(), 0.5 * mapHeight());
			printToConsole(`Warped to [HOME_${command[1].toUpperCase()}]`);
		}
		return true;
	}
	if ((command[0] == "give") && (command.length == 3)) {
		player.addItem(command[1].toUpperCase(), parseInt(command[2]));
		return true;
	}
	if (command[0] == "clear") {
		clearConsole();
		return true;
	}
	if (command[0] == "owner") {
		printToConsole(`Room owner is [${playerName(room.owner)}]`);
		return true;
	}	
	if (command[0] == "host") {
		printToConsole(`Room host is [${playerName(room.host)}]`);
		return true;
	}
}