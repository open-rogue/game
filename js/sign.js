class Sign extends Tile { 
  constructor(i, j, text) {
    super(i, j, "NULL");
    this.text = text;
  }
}

function setGameText(caption) {
  document.getElementById("game-text").innerHTML = "\"" + caption + "\"";
}

function clearGameText() {
  document.getElementById("game-text").innerHTML = "&nbsp;";
}