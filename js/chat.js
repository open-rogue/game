function chatValue() {
	return document.getElementById("chat").value;
}

function clearChat() {
  document.getElementById("chat").value = "";
}

function chatExecute(str) {
  if (str[0] != "/") { return null }
  command = str.substring(1);
  if (command == "spawn") {
    var x = 0.5 * TILESIZE * MAP_WIDTH;
    var y = 0.5 * TILESIZE * MAP_HEIGHT;
    print(x, y);
    player.changeRoom(START_ROOM, x, y);
    return true;
  }
}