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
    return true
    return session_otp == key;
}

function generateSession() {
    return floor(
        random(1000)
    );
}