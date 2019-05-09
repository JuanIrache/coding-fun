function setup() {
  difference = createSlider(0,100,0,0.1);
  speed = createSlider(0,100,0,0.1);
  for (var i=0; i<300;i++) {

    if (i%10==0) {
      createElement("br");
    }
    sliders[i] = createSlider(0,100,0);

  }
} 
var difference;
var speed;
var sliders = [];
function draw() {
  for (var i=0; i<sliders.length;i++) {
    sliders[i].value(50+50*tan((frameCount+i*difference.value())*speed.value()*.005));
  }
};
