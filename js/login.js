function showGame() {
    var game_div = document.getElementById("game");
    var menu_div = document.getElementById("menu");
    if (game_div.style.display == "none") {
        game_div.style.display = "flex";
        menu_div.style.display = "none";
    } else {
        game_div.style.display = "none";
        menu_div.style.display = "flex";
    }
}

function validateSession(key) {
    if (is_validated) { return true }
    if (key == session_key) { is_validated = true }
    return key == session_key;
}

function generateSession() {
    return floor(random(1000));
}