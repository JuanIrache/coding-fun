function City(i,j) {
	this.i = i;
	this.j = j;
}

City.prototype.draw = function() {
	noFill();
	stroke(255);
	strokeWeight(1);
	push();
	translate(this.i,this.j);
	ellipse(0,0,10);
	pop();
}
