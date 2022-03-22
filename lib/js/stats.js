class Stats {
  constructor() {
    this.gold = 0;
    this.pos = 0;
    this.item_count = 0;
  }

  display() {
    this.showInventory();
  }

  shiftSelected(shift) {
    this.pos += (shift < 0) ? -1 : 1;
    this.pos  = (this.pos >= this.item_count) ? 0 : this.pos;
    this.pos  = (this.pos < 0) ? this.item_count - 1 : this.pos;
    player.equipped = this.getEquipped();
  }

  showInventory() {
    var div = document.getElementById("inventory");
    div.innerHTML = "";
    this.item_count = Object.keys(player.inventory).length;
    if (this.item_count !== 0) {
      div.style.display = "flex";
      var index = 0;
      var table = createElement("table").parent(div);
      // Create items
      for (let item in player.inventory) {
        var image_path = (item in image_paths) ? image_paths[item] : image_paths["NULL"];
        var name = (item in item_names) ? item_names[item] : item;
        var quantity = beautifyNumber(player.inventory[item]);
        this.addInventoryRow(table, image_path, name, quantity, index);
        index += 1;
      }
    } else {
      div.style.display = "none";
    }
  }

  getEquipped() {
    var index = 0;
    for (let item in player.inventory) {
      if (index == this.pos) { return item }
      index += 1;
    }
    return "NULL";
  }

  addInventoryRow(table, image_path, name, quantity, index) {
    var row = createElement("tr").parent(table);
    createElement("td", `<img src = \"${image_path}\">`).class("icon").parent(row);
    var cell = createElement("td").class("name").parent(row);
    var span = createElement("span", name).parent(cell);
    if (index == this.pos) { span.class("selected") }
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