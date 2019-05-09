let game = {
	colors:[],
	squares:[],
	picked:null
}

game.init = function(grid) {
	$("h1").css("background-color","#478AA1");
	this.colors = this.generateColors(grid);
	this.squares = $(".color");
	this.picked = this.pickColor(this.colors.length);
	this.generateColors(grid);
	this.drawColors(this.squares,this.colors);
	this.setListenersColors(this.squares,this.picked,this.colors);
	$("#picked").text(this.colors[this.picked]);
	$("#feedback").text("");
}

game.setListenersColors = function(squares,picked,colors) {
	$(".color").unbind("click");
	for (let i=0; i<colors.length; i++) {
		if (i === picked) {
			$(".color").eq(i).click(function() {
				$("#feedback").text("Well done!");
				$(".color").css("background-color",colors[i]);
				$("h1").css("background-color",colors[i]);
				$("#new").text("Play Again");
				$(".color").unbind("click");			
			});	
		} else {
			$(".color").eq(i).click(function() {			
				$(this).css("background-color","#232323");
				$("#feedback").text("Try Again");
			});	
		}
	}
}

game.setListenersButtons = function() {
	$("button").click(function() {
		if ($(this).text() === "Easy") {
			$("button").removeClass("selected");
			$(this).addClass('selected');
			game.init(3);
		} else if ($(this).text() === "Hard") {
			$("button").removeClass("selected");
			$(this).addClass('selected');
			game.init(6);
		} else {
			game.init(game.colors.length);
			$(this).text("New Colors");
		}
	});
}

game.drawColors = function(squares,colors) {
	for (let i=0; i<squares.length; i++) {
		if (i<colors.length) {
			squares.eq(i).css("background-color",colors[i]);
			squares.eq(i).show();
		} else {
			squares.eq(i).hide();
		}
	}
}

game.pickColor = function(length) {
	return Math.floor(Math.random()*length);
}

game.generateColors = function(grid) {
	let result = [];
	for (let i=0; i<grid; i++) {
		result.push(game.generateColor())
	}
	return result;
}

game.generateColor = function() {
	let r = Math.floor(Math.random()*256);
	let g = Math.floor(Math.random()*256);
	let b = Math.floor(Math.random()*256);
	return "rgb("+r+","+g+","+b+")";
}

game.setListenersButtons();
game.init(6);