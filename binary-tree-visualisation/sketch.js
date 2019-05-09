var tree;
var level = 0;
vDiff = 30;
var fontSize = 200;
function setup() {
  tree = new Node();
  for (var i = 0; i < 1000; i++) {
    tree.add(floor(random(1000)));
  }

  createCanvas(displayWidth, displayHeight);
}

function draw() {
  background(0);
  translate(width / 2, fontSize / 2);
  textAlign(CENTER, CENTER);
  vDiff = fontSize / 4;
  tree.view();
}

function Node() {
  this.val = null;
  this.left = null;
  this.right = null;
}

Node.prototype.add = function(val) {
  if (this.val == null) {
    this.val = val;
  } else if (val < this.val) {
    if (this.left == null) this.left = new Node();
    this.left.add(val);
  } else if (val > this.val) {
    if (this.right == null) this.right = new Node();
    this.right.add(val);
  }
};

Node.prototype.view = function() {
  if (this.left != null) {
    level++;
    stroke(255, 50);
    strokeWeight(1);
    line(0, 0, -width / 2 / pow(2, level), vDiff);
    push();
    translate(-width / 2 / pow(2, level), vDiff);
    this.left.view();
    level--;
    pop();
  }
  if (this.val != null) {
    noStroke();
    fill(255);
    textSize(fontSize / pow(1.6, level));
    text(this.val, 0, 0);
  }
  if (this.right != null) {
    level++;
    stroke(255, 50);
    strokeWeight(1);
    line(0, 0, width / 2 / pow(2, level), vDiff);
    push();
    translate(width / 2 / pow(2, level), vDiff);
    this.right.view();
    level--;
    pop();
  }
};

Node.prototype.search = function(val) {
  console.log(this.val);
  if (val == this.val) {
    return this;
  } else if (val < this.val && this.left != null) {
    return this.left.search(val);
  } else if (val > this.val && this.right != null) {
    return this.right.search(val);
  }
};
