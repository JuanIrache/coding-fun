function preload() {
  palettesJSON = loadJSON("palettes.json");

  //
}
var boxes = [];
var palettesJSON
function setup() {
  var palettes = palettesJSON.palettes;
  palette = palettes[floor(random(0,palettes.length))];
  createCanvas(800,600);
}

var palette;

function draw() {
  //background(255);
  for (let i=0; i<boxes.length;i++) {
    boxes[i].update();
  }
  for (let i=0; i<boxes.length;i++) {
    boxes[i].paint();
  }

};

function keyPressed() {
  var palettes = palettesJSON.palettes;
  palette = palettes[floor(random(0,palettes.length))];
  console.log(palette);
  for (let i=0; i<boxes.length;i++) {
    boxes[i].changeColour();
  }
}

var accel = .1;

function myBox(x,y,sx,sy,s) {
  this.pos = createVector(x,y);
  this.vel = createVector(sx,sy);
  this.size = s;
  this.rotation = random(-TWO_PI,TWO_PI);
  this.rotate = random(-QUARTER_PI/10,QUARTER_PI/10);
  let r = floor(random(0,palette.length));
  this.colour = color(palette[r]);

  this.update = function() {
    this.vel.y += accel;
    this.pos.x = (this.pos.x+this.vel.x)%width;
    this.pos.y = (this.pos.y+this.vel.y)%height;
    this.rotation += this.rotate;
  }
  this.changeColour = function() {
    let r = floor(random(0,palette.length));
    this.colour = color(palette[r]);
  }

  this.paint = function() {
    push();
    translate(this.pos.x,this.pos.y);
    rotate(this.rotation);
    rectMode(CENTER);
    noStroke();

    fill(this.colour);
    rect(0,0,this.size,this.size);
    pop();
  }
}



function mouseReleased() {
  boxes.push(new myBox(mouseX,mouseY,mouseX-pmouseX,mouseY-pmouseY,floor(random(10,50))));
}
