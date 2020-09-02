const TILESIZE = 32;
const MAP_WIDTH = 24;
const MAP_HEIGHT = 16;
const PLAYER_SPEED = 8;
const PLAYER_TIMEOUT = 10 * 60 * 1000; // 10 MINUTES
const COLLIDERS = [
	"NULL",
	"STONE_TOP",
	"STONE_BRICK"
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
}