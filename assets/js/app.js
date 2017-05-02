$(window).scroll(function() {
  var scroll = $(window).scrollTop();
	$(".uav-view").css({
		transform: 'scale('+(100 + scroll/5)/100+')',
	});
});
