class Room {
    constructor(room_id) {
        this.room_id = room_id;
        this.raw     = rooms[this.room_id];
        this.name    = this.raw.name;
        this.owner   = this.raw.owner;
        this.tiles   = [];
        this.props   = [];
        this.warps   = [];
        this.signs   = [];
        this.north   = this.raw.north;
        this.east    = this.raw.east;
        this.south   = this.raw.south;
        this.west    = this.raw.west;
        this.color   = this.raw.color;
        this.weather = this.raw.weather;
        this.height  = TILESIZE * MAP_HEIGHT;
        this.width   = TILESIZE * MAP_WIDTH;
        // Set warps
        for (var k = 0; k < this.raw.warps.length; k++) {
            var warp = this.raw.warps[k];
            var warp_x  = warp[0];
            var warp_y  = warp[1];
            var room_id = warp[2];
            var room_x  = warp[3];
            var room_y  = warp[4];
            if (room_id != null) {
                this.warps.push(
                    new Warp(warp_x, warp_y, room_id, room_x, room_y)
                );
            }
        }
        // Set props
        for (var k = 0; k < this.raw.props.length; k++) {
            var prop   = this.raw.props[k];
            var prop_x = prop[0];
            var prop_y = prop[1];
            var text   = prop[2];
            if (text != "") {
                this.props.push(
                    new Prop(prop_x, prop_y, text)
                );
            }
        }
        // Set signs
        for (var k = 0; k < this.raw.signs.length; k++) {
            var sign   = this.raw.signs[k];
            var sign_x = sign[0];
            var sign_y = sign[1];
            var text   = sign[2];
            if (text != "") {
                this.signs.push(
                    new Sign(sign_x, sign_y, text)
                );
            }
        }
        // Set tiles
        for (var j = 0; j < MAP_HEIGHT; j++) {
            for (var i = 0; i < MAP_WIDTH; i++) {
                var index = (j * MAP_WIDTH) + i;
                var type  = this.raw.tiles[index];
                this.tiles.push(
                    new Tile(i, j, type)
                );
            }
        }
    }

    removeProp(i, j) {
        var index = -1;
        for (var k = 0; k < this.raw.props.length; k++) {
            var prop = this.raw.props[k];
            if ((i == prop[0]) && (j == prop[1])) {
                index = k;
            }
        }
        if (index > -1) {
            this.raw.props.splice(index, 1);
        }
    }
    
    setProp(i, j, type) {
        var index = -1;
        for (var k = 0; k < this.raw.props.length; k++) {
            var prop = this.raw.props[k];
            if ((i == prop[0]) && (j == prop[1])) {
                index = k;
            }
        }
        if (index == -1) {
            this.raw.props.push([i, j, type]);
        } else {
            this.raw.props[index] = [i, j, type];
        }
        this.update();
    }

    update() {
        var data = {
            room_id: this.room_id,
            name: this.name,
            owner: this.owner,
            color: this.color,
            tiles: this.raw.tiles,
            props: this.raw.props,
            signs: this.raw.signs,
            warps: this.raw.warps,
            weather: this.weather
        };
        var ref = database.ref('mmo/rooms');
        ref.child(this.room_id).set(data, this.gotData);
    }

    display() {
        background(this.color);
        //document.getElementById("game").style.backgroundColor = this.color;
        document.getElementById("room_name").innerHTML = this.name;
        for (var k = 0; k < this.tiles.length; k++) {
            this.tiles[k].display();
        }
        for (var k = 0; k < this.signs.length; k++) {
            this.signs[k].display();
        }
        for (var k = 0; k < this.props.length; k++) {
            this.props[k].display();
        }
    }

    tick() {
        for (var index in this.props) {
            this.props[index].tick();
        }
    }

    interact(i, j) {
        for (var index in this.props) {
            var prop = this.props[index];
            if ((prop.i == i) && (prop.j == j)) {
                prop.interact();
            }
        }
    }
}

function getRoomData(room_id) {
    if (room_id in rooms) {
        return rooms[room_id].tiles;
    } else {
        return [];
    }
}