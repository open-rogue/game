GROW_RATE = 0.01; // Between 0 and 1

class Prop extends Tile { 
  constructor(i, j, text) {
    super(i, j, text);
  }

  interact() {
    switch(this.type) {
      case "FARM_PUMPKIN_2":
        player.addItem("PUMPKIN", 1);
        room.setProp(this.i, this.j, "FARM_PUMPKIN_0");
        break;
      case "FARM_WHEAT_2":
        player.addItem("WHEAT", 1);
        room.setProp(this.i, this.j, "FARM_WHEAT_0");
        break;
      case "FARM_BERRIES_2":
        player.addItem("BERRIES", 1);
        room.setProp(this.i, this.j, "FARM_BERRIES_0");
        break;
    }
  }

  tick() {
    switch(this.type) {
      case "FARM_PUMPKIN_0":
        if (random(1) < GROW_RATE) { room.setProp(this.i, this.j, "FARM_PUMPKIN_1") }
        break;
      case "FARM_PUMPKIN_1":
        if (random(1) < GROW_RATE) { room.setProp(this.i, this.j, "FARM_PUMPKIN_2") }
        break;
      case "FARM_WHEAT_0":
        if (random(1) < GROW_RATE) { room.setProp(this.i, this.j, "FARM_WHEAT_1") }
        break;
      case "FARM_WHEAT_1":
        if (random(1) < GROW_RATE) { room.setProp(this.i, this.j, "FARM_WHEAT_2") }
        break;
      case "FARM_BERRIES_0":
        if (random(1) < GROW_RATE) { room.setProp(this.i, this.j, "FARM_BERRIES_1") }
        break;
      case "FARM_BERRIES_1":
        if (random(1) < GROW_RATE) { room.setProp(this.i, this.j, "FARM_BERRIES_2") }
        break;
    }
  }
}