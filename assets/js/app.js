var htmlBody = $('html, body');
var hamburger = $('.hamburger');
var mainHeader = $('.main-header');
var headerHeight = $('.main-header').outerHeight();

$(window).scroll(function() {
  var scroll = $(window).scrollTop();
	$(".uav-view").css({
		transform: 'scale('+(100 + scroll/5)/100+')',
	});
});

$('a[href*="#"]')
  // Remove links that don't actually link to anything
  .not('[href="#"]')
  .not('[href="#0"]')
  .click(function(event) {
    // On-page links
    if (
      location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') &&
      location.hostname == this.hostname
    ) {
      // Figure out element to scroll to
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      // Does a scroll target exist?
      if (target.length) {
        // Only prevent default if animation is actually gonna happen
        event.preventDefault();
        $('html, body').animate({
          scrollTop: target.offset().top
        }, 1000, function() {
          // Callback after animation
          // Must change focus!
          var $target = $(target);
          $target.focus();
          if ($target.is(":focus")) { // Checking if the target was focused
            return false;
          } else {
            $target.attr('tabindex','-1'); // Adding tabindex for elements not focusable
            $target.focus(); // Set focus again
          }
        });
      }
    }
  });

hamburger.click(function() {
  $('.main-nav').toggleClass('nav-open');
  $(this).toggleClass('navOpen');
  mainHeader.toggleClass('open');
  htmlBody.toggleClass('body-modal-open');
});

$('a[href*="#"]').click(function() {
  if ( $('.main-header').hasClass('open') ) {
    $('.main-nav').removeClass('nav-open');
    $('.main-header').removeClass('open');
    $('.hamburger').removeClass('navOpen');
  }
});

mainHeader.headroom({
  offset    : headerHeight,
  tolerance   : { up:10, down:10 },
  classes : {
    pinned   : "pinned",
    unpinned : "unpinned",
    top      : "onTop",
    bottom   : "onBottom",
    notTop   : "scrolled"
  },
  onTop : function() {
    mainHeader.removeClass('pinned');
  }
});
