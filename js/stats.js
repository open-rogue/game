class Stats {
  constructor() {
    this.gold = 0;
  }

  display() {
    this.showInventory();
  }

  showInventory() {
    var div = document.getElementById("inventory");
    div.innerHTML = "";
    if (Object.keys(player.inventory).length !== 0) {
      div.style.display = "flex";
      var table = createElement("table").parent(div);
      // Show gold
      var image_path = image_paths["GOLD"];
      var name = item_names["GOLD"];
      var quantity = beautifyNumber(player.inventory["GOLD"]);
      this.addInventoryRow(table, image_path, name, quantity);
      // Create items
      for (let item in player.inventory) {
        if (item != "GOLD") {
          var image_path = (item in image_paths) ? image_paths[item] : image_paths["NULL"];
          var name = (item in item_names) ? item_names[item] : item;
          var quantity = beautifyNumber(player.inventory[item]);
          this.addInventoryRow(table, image_path, name, quantity);
        }
      }
    } else {
      div.style.display = "none";
    }
  }

  addInventoryRow(table, image_path, name, quantity) {
    var row = createElement("tr").parent(table);
    createElement("td", `<img src = \"${image_path}\">`).class("icon").parent(row);
    createElement("td", name).class("name").parent(row);
    createElement("td", ":").class("quantity").parent(row);
    createElement("td", quantity).class("quantity").parent(row);
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
//   <tr>
//     <th colspan = "3">Inventory</th>
//   </tr>
//   <tr>
//     <td class = "icon"><img src = "./img/gold.png"></td>
//     <td class = "name">Gold</td>
//     <td class = "quantity">:</td>
//     <td class = "quantity">0</td>
//   </tr>
//   <tr>
//     <td class = "icon"><img src = "./img/potion.png"></td>
//     <td class = "name">Potion</td>
//     <td class = "quantity">:</td>
//     <td class = "quantity">0</td>
//   </tr>
//   </table>