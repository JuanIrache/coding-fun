function Salesman(type,mutationRate) {
	this.orders = [];
	this.type = type;
	this.record = Infinity;
	this.best = [];
  this.fitness = [];
	this.mutationRate = mutationRate;
}

Salesman.prototype.init = function() {
	if (this.type == "random") {
    var baseOrder = [];
		for (var i=0; i<cities.length; i++) {
			baseOrder.push(i);
		}
    for (var i=0; i<ordersLen; i++) {
      this.orders[i] = baseOrder.slice();
      this.randomise(i);
      this.guiness(i);
    }
	} else if (this.type == "lexicographic") {
    this.orders[0] = [];
		for (var i=0; i<cities.length; i++) {
			this.orders[0].push(i);
		}
    for (var i=1; i<ordersLen; i++) {
      this.update(i);
      this.guiness(i);
    }
	} else if (this.type == "genetic" || this.type == "mutation") {
    var baseOrder = [];
		for (var i=0; i<cities.length; i++) {
			baseOrder.push(i);
		}
    for (var i=0; i<ordersLen; i++) {
      this.orders[i] = baseOrder.slice();
      this.randomise(i);
      this.guiness(i);
    }
	}

}

Salesman.prototype.renewMembers = function() {
	var totalDist = 0;
  var proportions = [];
  this.fitness = [];
  for (var i=0; i<this.orders.length; i++) {
		var dist = this.distance(this.orders[i]);
		totalDist += dist;
	}
	var average = totalDist/this.orders.length;
	for (var i=0; i<this.orders.length; i++) {
		if (this.distance(this.orders[i])> average){
			this.randomise(i);
		}
	}
}

Salesman.prototype.setFitness = function() {
  var totalInvDist = 0;
  var proportions = [];
  this.fitness = [];
  for (var i=0; i<this.orders.length; i++) {
		var dist = this.distance(this.orders[i]);
		dist = pow(dist,20);
    var invDist = 1/(1+dist);
    proportions.push(invDist);
    totalInvDist += invDist;
  }
	var dist = this.record;//aqui make differences bigger!
	dist = pow(dist,20);
	var invDist = 1/(1+dist);
	proportions.push(invDist);
	totalInvDist += invDist;
  for (var i=0; i<proportions.length; i++) { //normalise and invert
    var prop = proportions[i]/totalInvDist;
    this.fitness[i] = prop;
  }
}

Salesman.prototype.updateAll = function(position) {
	var oldOrders = [];
  if (this.type == "genetic") {
		this.renewMembers();
    this.setFitness();//
		oldOrders = this.orders.slice();
  }

	if (this.type == "mutation") {
		this.renewMembers();
  }
  for (var i=0; i<this.orders.length; i++) {
		if (this.type == "genetic") {
			this.update(i,oldOrders);
		} else {
			this.update(i);
		}
  }
}

Salesman.prototype.guiness = function(position) {
  var order = this.orders[position];
  var currentDist = this.distance(order);
  if (currentDist < this.record) {
    this.record = currentDist;
    this.best = order.slice();
  }
}

Salesman.prototype.randomise = function(position) {
    var order = this.orders[position];

		var newOrder = [];
		for (var i=0; i<cities.length; i++) {
			var pos = floor(random(order.length));
			newOrder.push(order.splice(pos,1)[0]);
		}
		this.orders[position] = newOrder;
}

Salesman.prototype.update = function(position,oldOrders) {
	if (this.type == "random") {
    this.randomise(position);
    this.guiness(position);
  } else if (this.type == "lexicographic") {
    var baseOrder;

    if (position > 0) {
      baseOrder = this.orders[position - 1];
    } else {
      baseOrder = this.orders[this.orders.length - 1];
    }

    var order = baseOrder.slice();
    var currentDist = this.distance(order);

    var largestI = -1;
		if (currentDist < this.record) {
			this.record = currentDist;
			this.best = order.slice();
		}

		for (var i=0; i<order.length-1; i++) {
			if (order[i]<order[i+1]) largestI = i;
		}
		if (largestI >= 0) {
			var largestJ = 0;
			for (var j=0; j<order.length; j++) {
				if (order[largestI]<order[j]) largestJ = j;
			}
      order = swap(order,largestI,largestJ);
      var endOrder = order.splice(largestI+1);
      endOrder.reverse();
      this.orders[position] = order.concat(endOrder);
		}

	} else if (this.type == "genetic") {
		this.guiness(position);
    var order = oldOrders[position];
    var newOrder = [];
		var i = 0;

		var r = random();
    var sourceIndex = 0;
    while (r>0) {//pick based on fitness
      r -=  this.fitness[sourceIndex];
      sourceIndex++;
    }
    sourceIndex--;
		var sourceOrder1;
		if (sourceIndex >= this.orders.length) {
			showBest++;
			sourceOrder1 = this.best.slice();
		} else {
			showNotBest++;
			sourceOrder1 = oldOrders[sourceIndex].slice();
		}
		var portion = floor(random(order.length/2,order.length-2));
		var start = floor(random(order.length));
		while (i<portion) {
			var index = (start+i)%order.length;
			newOrder[index] = sourceOrder1[index];
			i++;
		}

		r = random();
    var sourceIndex2 = 0;
    while (r>0) {//pick based on fitness
      r -=  this.fitness[sourceIndex2];
      sourceIndex2++;
    }
    sourceIndex2--;
		if (sourceIndex2 == sourceIndex) {
			sourceIndex2 = (sourceIndex2-1+oldOrders.length)%oldOrders.length;
		}
		var sourceOrder2;
		if (sourceIndex2 >= this.orders.length) {
			sourceOrder2 = this.best.slice();
		} else {
			sourceOrder2 = oldOrders[sourceIndex2].slice();
		}
		while (i< order.length) {
			var index = (start+i)%order.length;
			var diff = 0;
			var indexSource = (start+i+diff)%order.length;
			while (newOrder.includes(sourceOrder2[indexSource])) {
				indexSource = (start+i+diff)%order.length;
				diff++;
			}
			newOrder[index] = sourceOrder2[indexSource];
			i++;
		}
		for (var i=0; i<newOrder.length; i++) {
			if (random() < this.mutationRate) {
	      var indexB = floor(random(newOrder.length));
	      newOrder = swap(newOrder,i,indexB);
	    }
		}
    this.orders[position] = newOrder;

	} else if (this.type == "mutation") {
		this.guiness(position);
		var newOrder = this.best.slice();
		for (var i=0; i<newOrder.length; i++) {
			if (random() < this.mutationRate) {
	      var indexB = floor(random(newOrder.length));
	      newOrder = swap(newOrder,i,indexB);
	    }
		}
    this.orders[position] = newOrder;
		if (random() < this.mutationRate) {
			this.randomise(position);
		}
	}

}

Salesman.prototype.draw = function() {


	if (mouseIsPressed) {
		stroke(255,1+254/ordersLen);
		strokeWeight(1);
	  for (var i=0; i<this.orders.length; i++) {
	  	this.drawOrder(this.orders[i]);
		}
	} else {

		stroke(255,0,0,100);
		strokeWeight(4);
		this.drawOrder(this.best);
		for (var i=0; i<cities.length; i++) {
			cities[i].draw();
		}
	}
	this.stats();
}

Salesman.prototype.distance = function(order) {
	var totalDist = 0;
	for (var i=0; i<order.length-1; i++) {
		var cityA = cities[order[i]];
		var cityB = cities[order[i+1]];
		totalDist += dist(cityA.i,cityA.j,cityB.i,cityB.j);
	}
	return totalDist;
}

Salesman.prototype.drawOrder = function(order) {

	noFill();
	for (var i=0; i<order.length-1; i++) {
		var cityA = cities[order[i]];
		var cityB = cities[order[i+1]];
		line(cityA.i,cityA.j,cityB.i,cityB.j);
	}
}

Salesman.prototype.stats = function() {
	totalDist = 0;
	for (var i=0; i<this.orders.length; i++) {
		totalDist+= this.distance(this.orders[i]);
	}
	push();
	translate(width/2,height*.95);
	textAlign(CENTER,BOTTOM);
	textSize(40);
	noStroke();
	fill(255);
	var string = this.type+" "+this.mutationRate*100+"% best: "+round(this.record)+"\nTotal: "+round(totalDist/100000);
	text(string,0,0);
	pop();
}
