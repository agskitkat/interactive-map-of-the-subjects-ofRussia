function ba(c) {
	$(c).each(function(){
		var container  = $(this);
		$(document).mousemove(function(){
			var c_width =  $(container).width();
			$(container).find('img').width(c_width + "px");
			$(container).find('.after img').width(c_width + "px");
		});
		$(container).mousemove(function(e) {
			var offset = $(this).offset();
			var X = (e.pageX - offset.left);
			console.log(X);
			$(container).find(".hover").css({left : X + "px"});
			$(container).find(".after").css({width : X + "px"});
		});
	});
}