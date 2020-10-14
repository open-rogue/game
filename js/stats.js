class Stats {
    constructor() {
        this.gold = 0;
    }

    top() {
        return height - TILESIZE;
    }

    display() {
        this.showInventory();
    }

    oldDisplay() {
        fill("#FFFFFF");
        textAlign(LEFT, CENTER);
        textSize(TILESIZE * 0.75);
        // Gold
        var quantity = player.inventory.GOLD == null ? 0 : player.inventory.GOLD;
        image(tileset["GOLD"], 0, height - TILESIZE, TILESIZE, TILESIZE);
        text(" * " + quantity, TILESIZE * 1, height - TILESIZE - 1, TILESIZE * 4, TILESIZE);
        // Potion
        var quantity = player.inventory.POTION == null ? 0 : player.inventory.POTION;
        image(tileset["POTION"], TILESIZE * 4, height - TILESIZE, TILESIZE, TILESIZE);
        text(" * " + quantity, TILESIZE * 5, height - TILESIZE - 1, TILESIZE * 4, TILESIZE);
        // Home
        image(tileset["HOME"], mapWidth() - TILESIZE, height - TILESIZE, TILESIZE, TILESIZE);
        // Spawn
        image(tileset["CASTLE"], mapWidth() - 2.5 * TILESIZE, height - TILESIZE, TILESIZE, TILESIZE);
    }

    mouseClick() {
        // Home
        if (inRange(mouseX, mapWidth() - TILESIZE, mapWidth())) {
            player.goHome();
            return true;
        }
        // Spawn
        if (inRange(mouseX, mapWidth() - 2.5 * TILESIZE, mapWidth() - 1.5 * TILESIZE)) {
            player.changeRoom(START_ROOM, 0.5 * mapWidth(), 0.5 * mapHeight());
            return true;
        }
    }

    updateCursor() {
        // Home
        if (inRange(mouseX, mapWidth() - TILESIZE, mapWidth())) {
            cursor(HAND);
            return true;
        }
        // Spawn
        if (inRange(mouseX, mapWidth() - 2.5 * TILESIZE, mapWidth() - 1.5 * TILESIZE)) {
            cursor(HAND);
            return true;
        }
    }

    showInventory() {
        var div = document.getElementById("right");
        div.innerHTML = "";
        if (Object.keys(player.inventory).length !== 0) {
            var table = createElement("table").id("inventory").parent(div);
            // Create header
            var row = createElement("tr").parent(table);
            createElement("th", "Inventory").id("inventory-header").parent(row);
            document.getElementById("inventory-header").colSpan = "3";
            // Create items
            for (let item in player.inventory) {
                var quantity = beautifyNumber(player.inventory[item]);
                var image_path = (item in image_paths) ? image_paths[item] : image_paths["NULL"];
                var name = (item in item_names) ? item_names[item] : item;
                row = createElement("tr").parent(table);
                createElement("td", `<img src = \"${image_path}">`).class("icon").parent(row);
                createElement("td", name).class("name").parent(row);
                createElement("td", quantity).class("quantity").parent(row);
            }
        }
    }
}

function beautifyNumber(number) {
    if (number > 1000000000) {
        return floor(number / 1000000000).toString() + "b";
    }
    if (number > 1000000) {
        return floor(number / 1000000).toString() + "m";
    }
    if (number > 1000) {
        return floor(number / 1000).toString() + "k";
    }
    return number.toString();
}

//   <table id = "inventory">
//     <tr>
//       <th colspan = "3">Inventory</th>
//     </tr>
//     <tr>
//       <td class = "icon"><img src = "./img/gold.png"></td>
//       <td class = "name">Gold</td>
//       <td class = "quantity">0</td>
//     </tr>
//     <tr>
//       <td class = "icon"><img src = "./img/potion.png"></td>
//       <td class = "name">Potion</td>
//       <td class = "quantity">0</td>
//     </tr>
//   </table>















