var body = $('html, body');
var hamburger = $('.hamburger');
var mainHeader = $('.main-header');
var mainNav = $('.main-nav');
var headerHeight = $('.main-header').outerHeight();
var uav = $('.uav-view');

$(window).scroll(function() {
  var scroll = $(window).scrollTop();
  if (scroll < 1000) {
    scroll = $(window).scrollTop();
  } else {
    scroll = 1000;
  }
	uav.css({
		transform: 'scale('+(100 + scroll/5)/100+')',
	});
});

hamburger.click(function() {
  mainNav.toggleClass('nav-open');
  $(this).toggleClass('navOpen');
  mainHeader.toggleClass('open');
	body.toggleClass('body-modal-open');
	body.toggleClass('disable-scrolling');
});

$('a[href*="#"]').click(function() {
  mainNav.removeClass('nav-open');
  mainHeader.removeClass('open');
  hamburger.removeClass('navOpen');
  body.removeClass('body-modal-open');
  body.removeClass('disable-scrolling');
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

/*
Fix to disable scrolling on mobile when a modal is open.
Needs to be converted to jQuery.
*/
document.ontouchmove = function ( event ) {
  var isTouchMoveAllowed = true, target = event.target;
  while ( target !== null ) {
    if ( target.classList && target.classList.contains( 'disable-scrolling' ) ) {
      isTouchMoveAllowed = false;
      break;
    }
    target = target.parentNode;
  }
  if ( !isTouchMoveAllowed ) {
    event.preventDefault();
  }
};
