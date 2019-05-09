var rect = new Path.Rectangle({
    point: [0, 0],
    size: [view.size.width, view.size.height],
    fillColor: '#000',
    selected: true
});
rect.sendToBack();
var circles = [];
var sounds = [];
var filesArr = ['bubbles','clay','confetti','corona','dotted-spiral','flash-1','flash-2','flash-3','glimmer','moon','pinwheel','piston-1','piston-2','piston-3','prism-1','prism-2','prism-3','splits','squiggle','strike','suspension','timer','ufo','veil','wipe','zig-zag'];
filesArr.forEach(function(file) {
  var sound =new Howl({
    src: ['sounds/'+file+'.mp3']
  });
  sounds.push(sound);
});

function onKeyDown(event) {
  var x = Math.random()*view.size.width;
  var y = Math.random()*view.size.height;
  var path = new Path.Circle(new Point(x,y), 300);
  path.fillColor = '#55dd55';
  path.strokeWidth = 0;
  path.fillColor.hue = event.event.keyCode*10 % 360;
  sounds[event.event.keyCode*10 % sounds.length].play();
  path.opacity = .4;
  circles.push(path);
}

function onFrame(event) {
  for (var i=circles.length-1; i>=0; i--) {
    circles[i].scale(.9);
    if (circles[i].area < 1) {
      circles.splice(i,1);
    }
  }
}
