var start;
var end;

var scl;
var lab;
var ww = 16*2;
var hh = 9*2;

var breakable = .05;//chances of breaking a wall when stuck to create alternative paths

var crawler;

function setup() {
	scl = (windowWidth*.7)/(ww+2);
	createCanvas((ww+2)*scl, (hh+2)*scl);
	lab = new Lab();
	start = new Searcher(0,0,true);
	end = new Searcher(ww-1,hh-1,false);

	background(0);
	lab.paint(false);
}

function draw() {
	//background(0);
	var complete;
	if (lab.cells) complete = true;
	for (var i=0;i<lab.cells.length;i++) {
		if (!lab.cells[i].visited) complete = false;
	}

	if (complete && !lab.found) {
		lab.complete();
		background(0);
		lab.paint(false);
	}

	if (!lab.found) {
		background(0);
		lab.paint(false);
		start.paint(false);
		end.paint(false);
		start.search(end);


	} else if (crawler.openSet && !crawler.found) {

			crawler.setCurrent();

			crawler.crawl();

			crawler.paint();
			//lab.paint();
			end.paint(false);

		} else if (crawler.found) {

			var current = lab.getCell(end.pos.x,end.pos.y);
			for (var i=0;i<foundProgress;i++) {
				if (i+1==foundProgress) current.paint(true);
				if (current.cameFrom) {
					current= current.cameFrom;
				} else {
					break;
				}
			}
			//lab.paint();
			foundProgress++;


	}
}

var foundProgress = 1;
