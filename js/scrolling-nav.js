//jQuery to collapse the navbar on scroll
$(window).scroll(function () {
    if ($(".navbar").offset().top > 10) {
        $(".navbar-fixed-top").addClass("top-nav-collapse");
    } else {
        $(".navbar-fixed-top").removeClass("top-nav-collapse");
    }
});

//jQuery for page scrolling feature - requires jQuery Easing plugin
$(function () {
    $('a.page-scroll').bind('click', function (event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top - 50
        }, 1500, 'easeInOutExpo');
        event.preventDefault();
    });
});

function screenResize() {
	var windowHeight = $(window).height();
	if (windowHeight < 320) {
		windowHeight = 320;
	}
    $('.full-height').height(windowHeight);
    $('.almost-full-height').height(windowHeight - 60);
}

// Initialize Parse with your Parse application & javascript keys
Parse.initialize("boR6jiYaE0qsDMzG1XF2bGM19QKGMLit2RaZisJC", "uRQ3bUgH2JWsRNygSRNXOjw6aWLr1fwZ3cnaYVma");

$(window).resize(screenResize);
screenResize();
