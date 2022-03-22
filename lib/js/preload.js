const FRAMERATE = 15;
const TILESIZE = 24;
const MAP_WIDTH = 24;
const MAP_HEIGHT = 16;
const PLAYER_SPEED = 12;
const PLAYER_TIMEOUT = 10 * 60 * 1000; // 10 MINUTES
const START_ROOM = "spawn";
const CHAT_COOLDOWN = 100;
const PLAYER_TYPES = ["man", "woman", "knight", "lizard", "wizard", "thing"];

const SPRITE_LEFT	 = 0;
const SPRITE_RIGHT	 = 1;
const SPRITE_LEFT_A	 = 2;
const SPRITE_LEFT_B	 = 3;
const SPRITE_RIGHT_A = 4;
const SPRITE_RIGHT_B = 5;

let player_left_img;
let player_right_img;
let step_left_sound;
let step_right_sound;

let tileset = {};
let colliders = [];
let image_paths = {}
let item_names = {}

let canvas;
let room;
let player;
let players;
let ghosts = [];
let particles;
let database;
let rooms;
let player_name;
let session_otp;
let bgm;
let stats;
let table;
let font;
let weather;
let sprites = [];
let is_retrieving = false;

function preload() {
	font = loadFont("/assets/pixel.ttf");
	// Get one-time password
	session_otp = getURLParams().otp;
	// Get session key
	player_uid  = (getURLParams().uid == null) ? "Null" : getURLParams().uid;
	session_key = (getURLParams().s == null) ? "Null" : getURLParams().s;
	// Get player name
	player_name = (getURLParams().n == null) ? "Null" : getURLParams().n;
	player_name = player_name.substr(0, 16);
	player_type = (getURLParams().type == null) ? PLAYER_TYPES[0] : getURLParams().type;

    // Firebase
    requirejs.config({
        paths: {
            text: "/lib/js/requirejs/text",
            json: "/lib/js/requirejs/json"
        }
    });
    require(['json!/firebase_config.json'], function (firebaseConfig) {
        console.log("Loaded firebase config")
		// Initialize Firebase
		firebase.initializeApp(firebaseConfig);
		firebase.analytics();
		database = firebase.database();
		// Player data event
		var ref = database.ref('mmo/players');
  		ref.on('value', gotPlayerData, errPlayerData);
		// Room data event
		var ref = database.ref('mmo/rooms');
		ref.on('value', gotRoomData, errRoomData);
		// Server config event
		var ref = database.ref('mmo/config');
		ref.on('value', gotConfigData, errConfigData);
    });
	// Create stats
	stats = new Stats();
	// Create weather
	weather = new Weather();
	// Sprites
	for (var index = 0; index < PLAYER_TYPES.length; index++) {
		var set = [];
		var type = PLAYER_TYPES[index];
		for (var k = 0; k < 6; k++) {
			set.push(loadImage(`/assets/img/sprites/${type}/${k}.png`));
		}
		sprites[type] = set;
	}
	// Sounds
	bgm = loadSound('/assets/sounds/little_town_orchestral.ogg');
	rain_sound = loadSound('/assets/sounds/rain.wav');
	step_left_sound = loadSound('/assets/sounds/stepwood_1.wav');
	step_right_sound = loadSound('/assets/sounds/stepwood_2.wav');
	// Import tile data
	var table_path = `/assets/tiles.csv?${(new Date()).getTime()}`;
	table = loadTable(table_path, 'csv', 'header', loadTiles);
}

function loadTiles() {
	for (let row = 0; row < table.getRowCount(); row++) {
		// Get values
		var id       = table.getString(row, 0);
		var name     = table.getString(row, 1);
		var path     = table.getString(row, 2);
		var collider = table.getString(row, 3);
		// Add data to local caches
		tileset[id]     = loadImage(path);
		image_paths[id] = path;
		item_names[id]  = name;
		if (collider == 'true') { colliders.push(id) }
		// Print to web console
		print(id, name, path, collider);
	}
}