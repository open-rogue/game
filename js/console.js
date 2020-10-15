function printToConsole(text) {
  var console = document.getElementById("console");
  createElement("p", text).parent(console);
  console.scrollTop = console.scrollHeight;
}

function clearConsole() {
  document.getElementById("console").innerHTML = "";
}