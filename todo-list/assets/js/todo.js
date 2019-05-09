$(".fa-plus").click(function() {
	$("#addInput").toggle();
});

$("#addInput").keypress(function(e) {
	if (e.which === 13) {
		$("#list").append("<li><i class='fas fa-trash-alt'></i> <span class='item'>"+$(this).val()+"</span></li>");
		$(this).val("");
	}
});

$("#list").on("click","li",function() {
	$(this).find(".item").toggleClass("done");
});

$("#list").on("click",".fa-trash-alt", function() {
	$(this).parent().fadeOut("500",function() {
		$(this).remove();
	});
})

// $("#list").on("mouseenter","li", function() {
// 	$(this).find(".fa-trash-alt").show();
// });

// $("#list").on("mouseleave","li", function() {
// 	$(this).find(".fa-trash-alt").hide();
// });
