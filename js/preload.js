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

let canvas;
let room;
let player;
let ghosts = [];
let particles;
let database;
let rooms;
let player_name;
let bgm;
let stats;
let table;
let font;
let weather;
let sprites = [];
let is_retrieving = false;
let is_validated = false;

function preload() {
	font = loadFont("files/pixel.ttf");
	// Get session key
	session_key = (getURLParams().s == null) ? "Null" : getURLParams().s;
	// Get player name
	player_name = (getURLParams().name == null) ? "Null" : getURLParams().name;
	player_name = player_name.substr(0, 16);
	player_type =  (getURLParams().type == null) ? PLAYER_TYPES[0] : getURLParams().type;
	// Firebase
	var firebaseConfig = {
		apiKey: "AIzaSyAmxjDLZrtiWjQGkekCdTXKx5zCbLDJP28",
		authDomain: "machin-dev.firebaseapp.com",
		databaseURL: "https://machin-dev.firebaseio.com",
		projectId: "machin-dev",
		storageBucket: "machin-dev.appspot.com",
		messagingSenderId: "471389656934",
		appId: "1:471389656934:web:de807290048ad37fa91aa7",
		measurementId: "G-2LDMEXJL3N"
	};
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
	ref.on('value', gotConfigData, gotConfigData);
	// Create stats
	stats = new Stats();
	// Create weather
	weather = new Weather();
	// Sprites
	for (var index = 0; index < PLAYER_TYPES.length; index++) {
		var set = [];
		var type = PLAYER_TYPES[index];
		for (var k = 0; k < 6; k++) {
			set.push(loadImage(`img/sprites/${type}/${k}.png`));
		}
		sprites[type] = set;
	}
	// Sounds
	bgm = loadSound('ogg/little_town_orchestral.ogg');
	step_left_sound = loadSound('ogg/stepwood_1.wav');
	step_right_sound = loadSound('ogg/stepwood_2.wav');
	// Tileset
	table = loadTable('files/tiles.csv?' + (new Date()).getTime(), 'csv', 'header', loadTiles);
}

function loadTiles() {
	//print(table.getRowCount() + ' total tiles in table');
	for (let row = 0; row < table.getRowCount(); row++) {
		print(id, path);
		var id = table.getString(row, 0);
		var path = table.getString(row, 1);
		var collider = table.getString(row, 2);
		tileset[id] = loadImage(path);
		if (collider == 'true') {
			colliders.push(id);
		}
	}
}