function chatValue() {
	return document.getElementById("chat").value;
}

function clearChat() {
	document.getElementById("chat").value = "";
}

function chatExecute(str) {
	if (str[0] != "/") { return null }
	command = str.substring(1).split(" ");
	if (command[0] == "spawn") {
		player.changeRoom(START_ROOM, 0.5 * mapWidth(), 0.5 * mapHeight());
		return true;
	}
	if (command[0] == "room") {
		if (command.length == 2) {
			player.changeRoom(command[1], 0.5 * mapWidth(), 0.5 * mapHeight());
			return true;
		} else if (command.length == 4) {
			player.changeRoom(command[1], command[2], command[3]);
			return true;
		}
	}
	if (command[0] == "rain") {
		weather.toggle(WEATHER_RAIN);
		return true;
	}
	if (command[0] == "snow") {
		weather.toggle(WEATHER_SNOW);
		return true;
	}
	if (command[0] == "skin") {
		print(command[1]);
		player.changePlayerType(command[1]);
		return true;
	}
}