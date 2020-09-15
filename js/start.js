const PAD = 32;
const BKG = "#222323";
const FRG = "#66B35B";
const WHT = "#FFFFFF";

let box_a, box_b;
let stars = [];
let lines = [];
let font;

let frame = 0;

function preload() {
    font = loadFont('files/pixel.ttf');
}

function setup() {
	// Create canvas
	canvas = createCanvas(640, 480);
	canvas.parent('game');
	frameRate(5);
    noFill();
    noSmooth();
    strokeCap(SQUARE);
    textFont(font);
    textSize(16);
    // Create canvas regions
    box_a = new Box(PAD, PAD, ((width - 3 * PAD) / 2), height - (2 * PAD));
    box_b = new Box(2 * PAD + ((width - 3 * PAD) / 2), PAD * 1.5, ((width - 3 * PAD) / 2), height - (3 * PAD) - 14)
    set_stars()
}

function draw() {
    noLoop();
    background(BKG);
    // Animation
    draw_stars();
    draw_borders();
    draw_pointer(0, 0, 12);
    draw_console();
}

function draw_borders() {
    noFill();
    stroke(FRG);
    strokeWeight(4);
    rect(box_a.left(), box_a.top(), box_a.width(), box_a.height());
    rect(box_b.left(), box_b.top(), box_b.width(), box_b.height());
}

function set_stars() {
    for (var k=0; k<50; k++) {
        var r_x = random(box_a.width());
        var r_y = random(box_a.height());
        stars.push([r_x, r_y]);
    }
}

function draw_stars() {
    fill(WHT);
    noStroke();
    for (var k=0; k<stars.length; k++) {
        square(box_a.left() + stars[k][0] - 2, box_a.left() + stars[k][1] - 2, 4);
    }
}

function add_text(text, color) {
    lines.push([text, color]);
    if (lines.length > 18) {
        lines.shift();
    }
}

function edit_last_text(text, color) {
    lines[lines.length-1] = [text, color];
}

function clear_console() {
    fill(BKG);
    stroke(FRG);
    strokeWeight(3);
    rect(box_b.left(), box_b.top(), box_b.width(), box_b.height());
}

function draw_console() {
    clear_console();
    fill(FRG);
    noStroke();
    for (var k=0; k<lines.length; k++) {
        fill(lines[k][1]);
        text(lines[k][0], box_b.left() + 8, box_b.top() + ((k + 1) * 20));
    }
}

function draw_pointer(p_x, p_y, s) {
    stroke(FRG);
    strokeWeight(2);
    noFill();
    var x = (s * 2) + box_a.left() + (box_a.width()  - (s * 4)) * p_x;
    var y = (s * 2) + box_a.top()  + (box_a.height() - (s * 4)) * p_y;
    print(x, y);
    rect(x - s, y - s, s * 2, s * 2);
    line(x, box_a.top(), x, y - s);    // Top
    line(box_a.left(), y, x - s, y);   // Left
    line(x, y + s, x, box_a.bottom()); // Bottom
    line(x + s, y, box_a.right(), y);  // Right
}

class Box {
    constructor(l, t, w, h) {
        this.l = l;
        this.t = t;
        this.w = w;
        this.h = h;
    }

    left()   { return this.l }
    top()    { return this.t }
    right()  { return this.l + this.w }
    bottom() { return this.t + this.h }
    width()  { return this.w } 
    height() { return this.h }
}