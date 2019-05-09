function setup() {
  createCanvas(windowWidth, windowHeight);

  for (var i = 0; i < citiesLen; i++) {
    var ii = floor(random(width));
    var jj = floor(random(height));
    cities.push(new City(ii, jj));
  }

  //salesMen.push(new Salesman("random"));
  //salesMen.push(new Salesman("lexicographic"));
  //salesMen.push(new Salesman("genetic",0.005));
  salesMen.push(new Salesman('genetic', 0.01));
  //salesMen.push(new Salesman("genetic",.05));
  //salesMen.push(new Salesman("genetic",0.1));
  salesMen.push(new Salesman('mutation', 0.05));

  for (var i = 0; i < salesMen.length; i++) {
    salesMen[i].init();
  }
}

var citiesLen = 50;
var ordersLen = 200;
var cities = [];
var order = [];
var salesMen = [];

var showBest = 0;
var showNotBest = 0;

function draw() {
  var cells = ceil(sqrt(salesMen.length));
  background(0);
  var initialT = millis();
  while (millis() - initialT < 1000 / 25) {
    for (var x = 0; x < salesMen.length; x++) {
      salesMen[x].updateAll();
    }
  }
  var i = 0;
  for (var y = 0; y < cells; y++) {
    for (var x = 0; x < cells; x++) {
      if (i < salesMen.length) {
        push();
        translate((x * width) / cells, (y * height) / cells);
        scale(1 / cells);
        salesMen[i].draw();
        pop();
        i++;
      }
    }
  }
  //console.log(100*showBest/(showBest+showNotBest));
}

function swap(array, a, b) {
  var newArr = [];
  for (var i = 0; i < array.length; i++) {
    if (i == a) {
      newArr.push(array[b]);
    } else if (i == b) {
      newArr.push(array[a]);
    } else {
      newArr.push(array[i]);
    }
  }
  return newArr;
}
