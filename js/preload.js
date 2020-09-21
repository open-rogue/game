const TILESIZE = 24;
const MAP_WIDTH = 24;
const MAP_HEIGHT = 16;
const PLAYER_SPEED = 8;
const PLAYER_TIMEOUT = 10 * 60 * 1000; // 10 MINUTES
const START_ROOM = 2;
const CHAT_COOLDOWN = 100;

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

function preload() {
	font = loadFont("files/pixel.ttf");
	// Get player name
	player_name = (getURLParams().name == null) ? "Null" : getURLParams().name;
	player_name = player_name.substr(0, 16);
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
	// Create stats
	stats = new Stats();
	// Create weather
	weather = new Weather();
	// Player tiles
	player_left_img 		= loadImage('img/player_left.png');
	player_right_img 		= loadImage('img/player_right.png');
	player_left_walk_a_img 	= loadImage('img/player_left_walk_a.png');
	player_right_walk_a_img = loadImage('img/player_right_walk_a.png');
	player_left_walk_b_img 	= loadImage('img/player_left_walk_b.png');
	player_right_walk_b_img = loadImage('img/player_right_walk_b.png');
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