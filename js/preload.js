const TILESIZE = 24;
const MAP_WIDTH = 24;
const MAP_HEIGHT = 16;
const PLAYER_SPEED = 8;
const PLAYER_TIMEOUT = 10 * 60 * 1000; // 10 MINUTES
const START_ROOM = 2;
const COLLIDERS = [
	"NULL",
	"STONE_TOP",
	"STONE_BRICK",
	"OAK_TREE",
	"FIR_TREE",
	"PINE_TREE",
	"WALL_EW",
	"WALL_ES",
	"WALL_SW",
	"WALL_NE",
	"WALL_NW",
	"WALL_NSE",
	"WALL_NSW",
	//"WALL_NSE_N",
	"WALL_NSE_S",
	//"WALL_NSW_N",
	"WALL_NSW_S"
]

let player_left_img;
let player_right_img;

let tileset = {};

let canvas;
let room;
let player;
let ghosts = [];
let database;
let rooms;
let player_name;

function preload() {
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
	// Player tiles
	player_left_img = loadImage('img/player_left.png');
	player_right_img = loadImage('img/player_right.png');
	player_left_walk_a_img = loadImage('img/player_left_walk_a.png');
	player_right_walk_a_img = loadImage('img/player_right_walk_a.png');
	player_left_walk_b_img = loadImage('img/player_left_walk_b.png');
	player_right_walk_b_img = loadImage('img/player_right_walk_b.png');
	// Tileset
	tileset["NULL"] = loadImage('img/null.png');
	tileset["STONE_FLOOR"] = loadImage('img/stone_floor.png');
	tileset["STONE_TOP"] = loadImage('img/stone_top.png');
	tileset["STONE_BRICK"] = loadImage('img/stone_brick.png');
	tileset["GROUND"] = loadImage('img/ground.png');
	tileset["GRASS"] = loadImage('img/grass.png');
	tileset["FLOWERS"] = loadImage('img/flowers.png');
	tileset["OAK_TREE"] = loadImage('img/oak_tree.png');
	tileset["PINE_TREE"] = loadImage('img/pine_tree.png');
	tileset["FIR_TREE"] = loadImage('img/fir_tree.png');
	tileset["WALL_EW"] = loadImage('img/wall_ew.png');
	tileset["WALL_ES"] = loadImage('img/wall_es.png');
	tileset["WALL_SW"] = loadImage('img/wall_sw.png');
	tileset["WALL_NE"] = loadImage('img/wall_ne.png');
	tileset["WALL_NW"] = loadImage('img/wall_nw.png');
	tileset["WALL_NSE"] = loadImage('img/wall_nse.png');
	tileset["WALL_NSW"] = loadImage('img/wall_nsw.png');
	tileset["WALL_NSE_N"] = loadImage('img/wall_nse_n.png');
	tileset["WALL_NSE_S"] = loadImage('img/wall_nse_s.png');
	tileset["WALL_NSW_N"] = loadImage('img/wall_nsw_n.png');
	tileset["WALL_NSW_S"] = loadImage('img/wall_nsw_s.png');
	tileset["STAIRS_UP"] = loadImage('img/stairs_up.png');
	tileset["STAIRS_DOWN"] = loadImage('img/stairs_down.png');
}