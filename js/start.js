const PAD = 32;
const BKG = "#222323";
const FRG = "#66B35B";
const RED = "#FF0000";
const WHT = "#FFFFFF";
const SEQ_DELAY = 500;

let box_a, box_b;
let stars = [];
let lines = [];
let font;
let name = "Test";

let sequence_locked = false;

function preload() {
    font = loadFont('files/pixel.ttf');
}

function setup() {
	// Create canvas
	canvas = createCanvas(640, 480);
	canvas.parent('game');
	//frameRate(5);
    noFill();
    noSmooth();
    strokeCap(SQUARE);
    textFont(font);
    textSize(16);
    noLoop();
    // Create canvas regions
    box_a = new Box(PAD, PAD, ((width - 3 * PAD) / 2), height - (2 * PAD));
    box_b = new Box(2 * PAD + ((width - 3 * PAD) / 2), PAD * 1.5, ((width - 3 * PAD) / 2), height - (3 * PAD) - 14)
    set_stars()
    background(BKG);
    draw_borders();
    //draw_stars()
    sequence();
}

function sequence(stage = 0) {
    if (sequence_locked) {
        setTimeout(function() { sequence(stage) }, SEQ_DELAY);
        return;
    }
    switch(stage) {
        case 0:
            background(BKG);
            draw_stars();
            draw_pointer(0, 0, 16, 0.6, 0.8, false);
            add_text("ENTER CREDENTIALS", FRG);
            break;
        case 1:
            background(BKG);
            draw_stars();
            draw_pointer(0, 0, 16, 0.6, 0.8, false);
            type_text(name, 100);
            break;
        case 2:
            background(BKG);
            draw_stars();
            draw_pointer(0, 0, 16, 0.6, 0.8, false);
            type_text("*************", 100);
            break;
        case 3:
            background(BKG);
            draw_stars();
            draw_pointer(0, 0, 16, 0.6, 0.8, false);
            add_text("USER VERIFIED", FRG);
            break;
        case 4:
            background(BKG);
            draw_stars();
            draw_pointer(0, 0, 16, 0.6, 0.8, false);
            add_text("INITIALIZING FTL DRIVE", FRG);
            break;
        case 5:
            background(BKG);
            draw_stars();
            draw_pointer(0, 0, 16, 0.6, 0.8, false);
            add_text("ENTER STELLAR COORDINATES", FRG);
            break;
        case 6:
            background(BKG);
            draw_stars();
            draw_pointer(0, 0, 16, 0.6, 0.8, false);
            type_text("7034.2186.9581", 100);
            break;
        case 7:
            background(BKG);
            draw_stars();
            add_text("SEARCHING", FRG);
            move_pointer(0, 0, 0.6, 0.8, 0.01, 20);
            break;
        case 8:
            background(BKG);
            draw_stars();
            add_text("LOCATED", FRG);
            draw_pointer(0.6, 0.8, 16, 0.6, 0.8, true);
            break;
        case 9:
            background(BKG);
            draw_stars();
            add_text("LIMA 289", FRG);
            draw_pointer(0.6, 0.8, 16, 0.6, 0.8, true);
            break;
        case 10:
            background(BKG);
            draw_stars();
            add_text("PROCEED (Y/N)", FRG);
            draw_pointer(0.6, 0.8, 16, 0.6, 0.8, true);
            break;
        case 11:
            background(BKG);
            draw_stars();
            type_text("Y", 200);
            draw_pointer(0.6, 0.8, 16, 0.6, 0.8, true);
            break;
        case 12:
            background(BKG);
            add_text("PLOTTING SUBSPACE ROUTE", FRG);
            draw_noise_plot();
            break;
        case 13:
            add_text("ROUTE FOUND", FRG);
            break;
        case 14:
            window.location.href = "./game.html?name=" + name;
            break;
      }
      setTimeout(function() { sequence(stage + 1) }, SEQ_DELAY);
      draw_borders();
      draw_console();
}

function draw_noise_plot(lines = 1) {
    sequence_locked = true;
    v = vertex;
    noFill();
    stroke(FRG);
    strokeWeight(2);
	for(var k=0; k<lines; k++) {
        y = (box_a.top() + 100) + (64 * k);
        beginShape()
        for(x=box_a.left(); x<box_a.right(); x++) {
            v(x, y-80/(1+pow(x-box_a.width()/2,4)/8e6)*noise(x/30+y))
        }
	    endShape()
    }
    if (lines < 5) {
        setTimeout(function() { draw_noise_plot(lines + 1) }, 200);
    } else {
        draw_noise_route();
    }
}

function draw_noise_route(limit = (box_a.top() + 10)) {
    noFill();
    stroke(RED);
    strokeWeight(2);
    beginShape()
    for(y=box_a.top(); y<box_a.bottom(); y+=1) {
        if (limit > y) {
            v(box_a.left() + (box_a.width()/4) + (box_a.width()/2)*noise(y/100), y);
        }
    }
    endShape()
    if (limit < box_a.bottom()) {
        setTimeout(function() { draw_noise_route(limit + 10) }, 50);
    } else {
        sequence_locked = false;
    }
}

function move_pointer(from_x, from_y, to_x, to_y, step, delay) {
    sequence_locked = true;    
    setTimeout(function() { step_pointer(from_x, from_y, to_x, to_y, step, delay) }, delay);
}

function step_pointer(from_x, from_y, to_x, to_y, step, delay) {
    if ((from_x == to_x) && (from_y == to_y)) {
        draw_pointer(from_x, from_y, 16, to_x, to_y, true);
        sequence_locked = false;
        return;
    }
    background(BKG);
    draw_stars();
    draw_borders();
    draw_console();
    if (from_y < to_y) {
        from_y += step;
        if (from_y > to_y) { from_y = to_y; }
        draw_pointer(from_x, from_y, 16, to_x, to_y);
    } else {
        if (from_x < to_x) {
            from_x += step;
            if (from_x > to_x) { from_x = to_x; }
            draw_pointer(from_x, from_y, 16, to_x, to_y);
        }
    }
    setTimeout(function() { step_pointer(from_x, from_y, to_x, to_y, step, delay) }, delay);
}

function type_text(text, delay) {
    sequence_locked = true;
    add_text("", WHT);
    setTimeout(function() { type_letter(text, delay) }, delay);
}

function type_letter(text, delay, length = 1) {
    if (length <= text.length) {
        edit_last_text(text.substring(0, length) + "/", WHT);
        setTimeout(function() { type_letter(text, delay, length + 1) }, delay);
    } else if (length > text.length) {
        edit_last_text(text, FRG);
        sequence_locked = false;
    }
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

function draw_star(x, y, color = WHT) {
    fill(color);
    noStroke();
    square(box_a.left() + x - 2, box_a.left() + y - 2, 4);
}

function draw_stars() {
    for (var k=0; k<stars.length; k++) {
        draw_star(stars[k][0], stars[k][1], WHT)
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

function draw_pointer(p_x, p_y, s = 16, s_x = -1, s_y = -1, found = false) {
    stroke(FRG);
    strokeWeight(2);
    noFill();
    var x = (s * 2) + box_a.left() + (box_a.width()  - (s * 4)) * p_x;
    var y = (s * 2) + box_a.top()  + (box_a.height() - (s * 4)) * p_y;
    rect(x - s, y - s, s * 2, s * 2);
    line(x, box_a.top(), x, y - s);    // Top
    line(box_a.left(), y, x - s, y);   // Left
    line(x, y + s, x, box_a.bottom()); // Bottom
    line(x + s, y, box_a.right(), y);  // Right
    if ((s_x > -1) && (s_y > -1)) {
        var x = (s * 2) + box_a.left() + (box_a.width()  - (s * 4)) * s_x;
        var y = (s * 2) + box_a.top()  + (box_a.height() - (s * 4)) * s_y;
        draw_star(x - s * 2, y - s * 2, (found ? RED : WHT));
    }
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