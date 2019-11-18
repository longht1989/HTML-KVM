// init function
var isMobile, isTablet, isDesktop;

$(function() {
    /*check device width*/
    bsContainerWidth = $("body").find('.wrapper').outerWidth();
    if (bsContainerWidth < 768) {
        console.log("mobile");
        isMobile = true;
    } else if (bsContainerWidth < 960) {
        console.log("tablet");
        isTablet = true;
    } else {
        console.log("desktop");
        isDesktop = true;
    }

    /*pin header */
    window.onscroll = function() { windowScroll() };

    // fix URL click on bxslider
    if (window.navigator.userAgent.toLowerCase().indexOf("chrome") > 0) {
        $("body").on("mousedown", ".bx-viewport a", function() {
            if ($(this).attr("href") && $(this).attr("href") != "#") {
                window.location = $(this).attr("href");
            }
        });
    }

    /*slider*/
    // index slider
    var highlightSlider = $('.zone--highlight .slider')
    if (highlightSlider.length > 0) {
        highlightSlider.bxSlider({
            auto: 1,
            minSlides: 1,
            maxSlides: 1,
            pager: 0,
            nextText: '',
            prevText: '',
            nextSelector: ".slider-next",
            prevSelector: ".slider-prev"
        });
    }
    // detail slider
    var detailSlider = $('.detail-wrap .bxslider')
    if (detailSlider.length > 0) {
        detailSlider.bxSlider({
            auto: 1,
            minSlides: 1,
            maxSlides: 1,
            pagerType: 'short',
            captions: true,
            controls: 0
        });
    }
    // button click
    $('#site-header .btn-expand').on('click', btnExpandClick);

    // tab zone calendar
    if ($('.zone--calendar').length > 0) {
        $(".zone__nav a").on('click', function() {
            var direction = $(this).attr('aria-controls');
            $('.zone--calendar .zone__title').removeClass('active');
            $('.zone--calendar #' + direction + '-title').addClass('active');
        });
    }
    // swap thumb for vertical story
    if (isMobile) {
        var newSrc = $('.logo img').attr('data-src');
        $('.logo img').attr('src', newSrc);
    }
});

/*customise function*/
// scoll down & pin site header
function windowScroll() {
    var headerHeight = $("#site-header").outerHeight();
    if (document.body.scrollTop > (headerHeight + 20) || document.documentElement.scrollTop > (headerHeight + 20)) {
        $("#site-header").addClass('is-pinned');
    } else {
        $("#site-header").removeClass('is-pinned');
    }
}

function btnExpandClick(e) {
    e.preventDefault();
    e.stopPropagation();
    expandNav();
}

function expandNav() {
    $('#site-header .nav').toggle();
    $('.btn-expand .fa-bars').toggle();
    $('.btn-expand .fa-times').toggle();
}

// Normalize Carousel Heights - pass in Bootstrap Carousel items.
$.fn.carouselHeights = function() {

    var items = $(this), //grab all slides
        heights = [], //create empty array to store height values
        tallest; //create variable to make note of the tallest slide

    var normalizeHeights = function() {

        items.each(function() { //add heights to array
            heights.push($(this).height());
        });
        tallest = Math.max.apply(null, heights); //cache largest value
        items.each(function() {
            $(this).css('min-height', tallest + 'px');
        });
    };

    normalizeHeights();

    $(window).on('resize orientationchange', function() {
        //reset vars
        tallest = 0;
        heights.length = 0;

        items.each(function() {
            $(this).css('min-height', '0'); //reset min-height
        });
        normalizeHeights(); //run it again 
    });

};

jQuery(function($) {

    $(window).on('load', function() {
        $('#carousel-hero .carousel-item').carouselHeights();
    });

});