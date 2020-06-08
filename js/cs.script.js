/* SHARED VARS */
var firstrun = true,
    touch = false,
    clickEv = 'click';


var isMobile = {
    Android: function () {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function () {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function () {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function () {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function () {
        return navigator.userAgent.match(/IEMobile/i);
    },
    any: function () {
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
    }
};

/* Fucntion get width browser */
function getWidthBrowser() {
    "use strict";
    var myWidth;

    if (typeof( window.innerWidth ) == 'number') {
        //Non-IE
        myWidth = window.innerWidth;
        //myHeight = window.innerHeight;
    }
    else if (document.documentElement && ( document.documentElement.clientWidth || document.documentElement.clientHeight )) {
        //IE 6+ in 'standards compliant mode'
        myWidth = document.documentElement.clientWidth;
        //myHeight = document.documentElement.clientHeight;
    }
    else if (document.body && ( document.body.clientWidth || document.body.clientHeight )) {
        //IE 4 compatible
        myWidth = document.body.clientWidth;
        //myHeight = document.body.clientHeight;
    }

    return myWidth;
}

/* Function: Refresh Zoom */
function alwaysUpdateZoom() {
    "use strict";

    if (touch == false) {

        if ($('.elevatezoom').length) {

            var zoomImage = $('.elevatezoom .img-zoom');

            zoomImage.elevateZoom({
                gallery: 'gallery_main',
                galleryActiveClass: 'active',
                zoomType: 'window',
                cursor: 'pointer',
                zoomWindowFadeIn: 300,
                zoomWindowFadeOut: 300,
                zoomWindowWidth: 330,
                zoomWindowHeight: 400,
                scrollZoom: true,
                easing: true
            });


            //pass the images to Fancybox
            $(".elevatezoom .img-zoom").bind("click", function (e) {
                var ez = $('.elevatezoom .img-zoom').data('elevateZoom');
                $.fancybox(ez.getGalleryList(), {
                    closeBtn: false,
                    helpers: {
                        buttons: {}
                    }
                });
                return false;
            });

        }

    }
    // is touch
    else {

    }
}

// handle quickshop position
function positionQuickshop() {
    "use strict";
    if (touch == false) {
        var quickshops = $('.quick_shop');

        quickshops.each(function () {
            var parent = $(this).parents('.hoverBorder');
            $(this).css({
                'top': ((parent.height() / 2) - ($(this).outerHeight() / 2)) + 'px',
                'left': ((parent.width() / 2) - ($(this).outerWidth() / 2)) + 'px',
            });
        });
    }
}


// handle Animate
function handleAnimate() {
    "use strict";

    if (touch == false) {
        $('[data-animate]').each(function () {

            var $toAnimateElement = $(this);

            var toAnimateDelay = $(this).attr('data-delay');

            var toAnimateDelayTime = 0;

            if (toAnimateDelay) {
                toAnimateDelayTime = Number(toAnimateDelay);
            } else {
                toAnimateDelayTime = 200;
            }

            if (!$toAnimateElement.hasClass('animated')) {

                $toAnimateElement.addClass('not-animated');

                var elementAnimation = $toAnimateElement.attr('data-animate');

                $toAnimateElement.appear(function () {

                    setTimeout(function () {
                        $toAnimateElement.removeClass('not-animated').addClass(elementAnimation + ' animated');
                    }, toAnimateDelayTime);

                }, {accX: 0, accY: -100}, 'easeInCubic');

            }
        });
    }
}

// handle scroll-to-top button
function handleScrollTop() {
    "use strict";
    function totop_button(a) {
        var b = $("#scroll-to-top");
        b.removeClass("off on");
        if (a == "on") {
            b.addClass("on")
        } else {
            b.addClass("off")
        }
    }

    $(window).scroll(function () {
        var b = $(this).scrollTop();
        var c = $(this).height();
        if (b > 0) {
            var d = b + c / 2;
        }
        else {
            var d = 1;
        }

        if (d < 1e3 && d < c) {
            totop_button("off");
        }
        else {

            totop_button("on");
        }
    });

    $("#scroll-to-top").click(function (e) {
        e.preventDefault();
        $('body,html').animate({scrollTop: 0}, 800, 'swing');
    });
}

/* Function update scroll product thumbs */
function updateScrollThumbs() {
    "use strict";
    if ($('#gallery_main').length) {

        if (touch) {
            $('#product-image .main-image').on('click', function () {
                var _items = [];
                var _index = 0;
                var product_images = $('#product-image .image-thumb');
                product_images.each(function (key, val) {
                    _items.push({'href': val.href, 'title': val.title});
                    if ($(this).hasClass('active')) {
                        _index = key;
                    }
                });
                $.fancybox(_items, {
                    closeBtn: false,
                    index: _index,
                    openEffect: 'none',
                    closeEffect: 'none',
                    nextEffect: 'none',
                    prevEffect: 'none',
                    helpers: {
                        buttons: {}
                    }
                });
                return false;
            });
        }
        else {

        }

        $('#product-image').on('click', '.image-thumb', function () {

            var $this = $(this);
            var background = $('.product-image .main-image .main-image-bg');
            var parent = $this.parents('.product-image-wrapper');
            var src_original = $this.attr('data-image-zoom');
            var src_display = $this.attr('data-image');

            background.show();

            parent.find('.image-thumb').removeClass('active');
            $this.addClass('active');

            parent.find('.main-image').find('img').attr('data-zoom-image', src_original);
            parent.find('.main-image').find('img').attr('src', src_display).load(function () {
                background.hide();
            });

            return false;
        });
    }
}

/* Function update scroll product thumbs */
function updateScrollThumbsQS() {
    "use strict";
    if ($('#gallery_main_qs').length) {

        $('#quick-shop-image .fancybox').on(clickEv, function () {
            var _items = [];
            var _index = 0;
            var product_images = $('#gallery_main_qs .image-thumb');
            product_images.each(function (key, val) {
                _items.push({'href': val.href, 'title': val.title});
                if ($(this).hasClass('active')) {
                    _index = key;
                }
            });
            $.fancybox(_items, {
                closeBtn: true,
                index: _index,
                helpers: {
                    buttons: {}
                }
            });
            return false;
        });

        $('#quick-shop-image').on(clickEv, '.image-thumb', function () {

            var $this = $(this);
            var background = $('.product-image .main-image .main-image-bg');
            var parent = $this.parents('.product-image-wrapper');
            var src_original = $this.attr('data-image-zoom');
            var src_display = $this.attr('data-image');

            background.show();

            parent.find('.image-thumb').removeClass('active');
            $this.addClass('active');

            parent.find('.main-image').find('img').attr('data-zoom-image', src_original);
            parent.find('.main-image').find('img').attr('src', src_display).load(function () {
                background.hide();
            });

            return false;
        });
    }
}

/* Handle Carousel */
function handleCarousel() {
    "use strict";

    /* Handle main slideshow */
    if ($('#home-slider').length) {
        $('#home-slider').camera({
            height: '36%',
            pagination: false,
            thumbnails: false,
            autoAdvance: true
        });
    }

    /* Handle Featured Collections */
    if ($("#home_collections").length) {
        $("#home_collections").owlCarousel({
            navigation: true,
            pagination: false,
            slideSpeed: 300,
            paginationSpeed: 800,
            rewindSpeed: 1000,
            items: 4,
            itemsDesktop: [1199, 4],
            itemsDesktopSmall: [979, 4],
            itemsTablet: [768, 3],
            itemsTabletSmall: [540, 2],
            itemsMobile: [360, 1],
            //scrollPerPage: true,
            navigationText: ['<i class="fa fa-chevron-left btooltip" title="Пред."></i>', '<i class="fa fa-chevron-right btooltip" title="След."></i>'],
            beforeMove: function (elem) {
                if (touch == false) {
                }
            },
            afterInit: function (elem) {
                elem.find('.btooltip').tooltip();
            }
        });
    }

    /* Handle Featured Products */

    if ($("#home_products_2").length) {
        $("#home_products_2").owlCarousel({
            navigation: true,
            pagination: false,
            items: 4,
            slideSpeed: 300,
            paginationSpeed: 800,
            rewindSpeed: 1000,
            itemsDesktop: [1199, 4],
            itemsDesktopSmall: [979, 4],
            itemsTablet: [768, 3],
            itemsTabletSmall: [540, 2],
            itemsMobile: [360, 1],
            //scrollPerPage: true,
            navigationText: ['<i class="fa fa-chevron-left btooltip" title="Пред."></i>', '<i class="fa fa-chevron-right btooltip" title="След."></i>'],
            beforeMove: function (elem) {
                if (touch == false) {
                }
            },
            afterUpdate: function () {
                positionQuickshop();
            },
            afterInit: function (elem) {
                elem.find('.btooltip').tooltip();
            }
        });
    }


    /* Handle Partners Logo */
    if ($('#partners').length) {
        imagesLoaded('#partners', function () {
            $("#partners").owlCarousel({
                navigation: true,
                pagination: false,
                items: 8,
                itemsDesktop: [1199, 6],
                itemsDesktopSmall: [979, 5],
                itemsTablet: [768, 4],
                itemsTabletSmall: [540, 2],
                itemsMobile: [360, 1],
                scrollPerPage: true,
                navigationText: ['<i class="fa fa-caret-left btooltip" title="Пред."></i>', '<i class="fa fa-caret-right btooltip" title="След."></i>'],
                beforeMove: function (elem) {
                    if (touch == false) {
                        var items = elem.find('.not-animated');
                        items.removeClass('not-animated').unbind('appear');
                    }
                },
                afterInit: function (elem) {
                    elem.find('.btooltip').tooltip();
                }
            });
        });
    }

    /* Handle product thumbs */
    if ($("#gallery_main").length) {
        $("#gallery_main").owlCarousel({
            navigation: true,
            pagination: false,
            items: 4,
            itemsDesktop: [1199, 3],
            itemsDesktopSmall: [979, 3],
            itemsTablet: [768, 3],
            itemsMobile: [479, 3],
            scrollPerPage: true,
            navigationText: ['<i class="fa fa-caret-left btooltip" title="Пред."></i>', '<i class="fa fa-caret-right btooltip" title="След."></i>'],
            afterInit: function (elem) {
                elem.find('.btooltip').tooltip();
            }
        });
    }

    /* Handle related products */
    if ($(".prod-related").length) {
        $(".prod-related").owlCarousel({
            navigation: true,
            pagination: false,
            items: 4,
            slideSpeed: 200,
            paginationSpeed: 800,
            rewindSpeed: 1000,
            itemsDesktop: [1199, 3],
            itemsDesktopSmall: [979, 3],
            itemsTablet: [768, 2],
            itemsTabletSmall: [540, 2],
            itemsMobile: [360, 1],
            //scrollPerPage: true,
            navigationText: ['<i class="fa fa-chevron-left btooltip" title="Пред."></i>', '<i class="fa fa-chevron-right btooltip" title="След."></i>'],
            beforeMove: function (elem) {
                if (touch == false) {
                }
            },
            afterUpdate: function () {
                positionQuickshop();
            },
            afterInit: function (elem) {
                elem.find('.btooltip').tooltip();
            }
        });
    }
}

/* Handle search box on mobile */
function callbackSearchMobile() {
    "use strict";
    var button = $('.is-mobile .is-mobile-search i');
    var form = $('.is-mobile .is-mobile-search .search-form');
    button.mouseup(function (search) {
        form.show();
    });
    form.mouseup(function () {
        return false;
    });
    $(this).mouseup(function (search) {
        if (!($(search.target).parent('.is-mobile .is-mobile-search').length > 0)) {
            form.hide();
        }
    });
}
/* Handle search box on pc */
function handleBoxSearch() {
    "use strict";
    if ($('#header-search input').length) {
        $('#header-search input').focus(function () {
            $(this).parent().addClass('focus');
        }).blur(function () {
            $(this).parent().removeClass('focus');
        });
    }
}

/* Handle Map with GMap */
function handleMap() {
    "use strict";
    if (jQuery().gMap) {
        if ($('#contact_map').length) {
            $('#contact_map').gMap({
                zoom: 17,
                scrollwheel: false,
                maptype: 'ROADMAP',
                markers: [
                    {
                        address: '249 Ung Văn Khiêm, phường 25, Ho Chi Minh City, Vietnam',
                        html: '_address'
                    }
                ]
            });
        }
    }
}

/* Handle Grid - List */
function handleGridList() {
    "use strict";
    if ($('#goList').length) {
        $('#goList').on(clickEv, function (e) {
            $(this).parent().find('li').removeClass('active');
            $(this).addClass('active');

            $('#sandBox .element').addClass('full_width');
            $('#sandBox .element .row-left').addClass('col-md-6');
            //$('#sandBox .element .row-left').addClass('col-sm-6');
            $('#sandBox .element .row-right').addClass('col-md-14');
            //$('#sandBox .element .row-right').addClass('col-sm-14');

            $('#sandBox').isotope('reLayout');
            if (clickEv == 'touchstart') {
                $(this).click();
                return true;
            }

            /* re-call handle position */
            positionQuickshop();
        });
    }

    if ($('#goGrid').length) {
        $('#goGrid').on(clickEv, function (e) {
            $(this).parent().find('li').removeClass('active');
            $(this).addClass('active');

            $('#sandBox .element').removeClass('full_width');
            $('#sandBox .element .row-left').removeClass('col-md-6');
            //$('#sandBox .element .row-left').removeClass('col-sm-6');
            $('#sandBox .element .row-right').removeClass('col-md-14');
            //$('#sandBox .element .row-right').removeClass('col-sm-14');

            $('#sandBox').isotope('reLayout');
            if (clickEv == 'touchstart') {
                $(this).click();
                return true;
            }

            /* re-call handle position */
            positionQuickshop();
        });
    }
}

/* Handle detect platform */
function handleDetectPlatform() {
    "use strict";
    /* DETECT PLATFORM */
    $.support.touch = 'ontouchend' in document;

    if ($.support.touch) {
        touch = true;
        $('body').addClass('touch');
        clickEv = 'touchstart';
    }
    else {
        $('body').addClass('notouch');
        if (navigator.appVersion.indexOf("Mac") != -1) {
            if (navigator.userAgent.indexOf("Safari") > -1) {
                $('body').addClass('macos');
            }
            else if (navigator.userAgent.indexOf("Chrome") > -1) {
                $('body').addClass('macos-chrome');
            }
            else if (navigator.userAgent.indexOf("Mozilla") > -1) {
                $('body').addClass('macos-mozilla');
            }
        }
    }
}

/* Handle tooltip */
function handleToolTip() {
    "use strict";
    if (touch == false) {
        if ($('.btooltip').length) {
            $('.btooltip').tooltip();
        }
    }
}

/* Handle product quantity */
function handleQuantity() {
    "use strict";
    if ($('.quantity-wrapper').length) {
        $('.quantity-wrapper').on(clickEv, '.qty-up', function () {
            var $this = $(this);

            var qty = $this.data('src');
            $(qty).val(parseInt($(qty).val()) + 1);
        });
        $('.quantity-wrapper').on(clickEv, '.qty-down', function () {
            var $this = $(this);

            var qty = $this.data('src');

            if (parseInt($(qty).val()) > 1)
                $(qty).val(parseInt($(qty).val()) - 1);
        });
    }
}

/* Handle sidebar */
function handleSidebar() {
    "use strict";
    /* Add class first, last in sidebar */
    if ($('.sidebar').length) {
        $('.sidebar').children('.row-fluid').first().addClass('first');
        $('.sidebar').children('.row-fluid').last().addClass('last');
    }
}

/* Handle sort by */
function handleSortBy() {
    "use strict";
    if ($('#sortForm li.sort').length) {
        $('#sortForm li.sort').click(function () {

            var button = $('#sortButton');
            var box = $('#sortBox');

            $('#sortButton .name').html($(this).html());

            button.removeClass('active');
            box.hide().parent().removeClass('open');
        });
    }
}

/* Handle dropdown box */
function handleDropdown() {
    "use strict";
    if ($('.dropdown-toggle').length) {
        $('.dropdown-toggle').parent().hover(function () {
            if (touch == false && getWidthBrowser() > 768) {
                $(this).find('.dropdown-menu').stop(true, true).slideDown(300);
            }
        }, function () {
            if (touch == false && getWidthBrowser() > 768) {
                $(this).find('.dropdown-menu').hide();
            }
        });
    }

    $('nav .dropdown-menu').each(function () {
        $(this).find('li').last().addClass('last');
    });

    $('.dropdown').on('click', function () {
        if (touch == false && getWidthBrowser() >= 768) {
            var href = $(this).find('.dropdown-link').attr('href');
            window.location = href;
        }
    });

    $('.cart-link').on('click', function () {
        if (touch == false && getWidthBrowser() > 768) {
            var href = $(this).find('.dropdown-link').attr('href');
            window.location = href;
        }
    });
}

/* Handle collection tags */
function handleCollectionTags() {
    "use strict";
    if ($('#collection_tags').length) {
        $('#collection_tags').on('change', function () {
            window.location = $(this).val();
        });
    }
}

/* Handle menu with scroll*/
function handleMenuScroll() {
    "use strict";
    var scrollTop = $(this).scrollTop();
    var heightNav = $('#top').outerHeight();

    if (touch == false && getWidthBrowser() >= 1024) {
        if (scrollTop > heightNav) {
            if (!$('#top').hasClass('on')) {
                $('<div style="min-height:' + heightNav + 'px"></div>').insertBefore('#top');
                $('#top').addClass('on').addClass('animated');
            }
        }
        else {
            if ($('#top').hasClass('on')) {
                $('#top').prev().remove();
                $('#top').removeClass('on').removeClass('animated');
            }
        }
    }
}

/* Handle Quickshop */
function handleQuickshop() {
    "use strict";
    $('body').on('click', '.quick_shop', function (e) {
        var action = $(this).attr('data-href');
        var target = $(this).attr('data-target')
        $(target).load(action, function () {
            $('#top').addClass('z-idx');

            $('.btooltip').tooltip();
            var zoomImage = $('.elevatezoom_qs .img-zoom');

            zoomImage.elevateZoom({
                gallery: 'gallery_main_qs',
                galleryActiveClass: 'active',
                zoomType: 'window',
                cursor: 'pointer',
                zoomWindowFadeIn: 300,
                zoomWindowFadeOut: 300,
                zoomWindowWidth: 250,
                zoomWindowHeight: 350,
                scrollZoom: true,
                easing: true,
            });

            //pass the images to Fancybox
            $(".elevatezoom_qs .img-zoom").bind("click", function (e) {
                var ez = $('.elevatezoom_qs .img-zoom').data('elevateZoom');
                $.fancybox(ez.getGalleryList(), {
                    closeBtn: false,
                    helpers: {
                        buttons: {}
                    }
                });
                return false;
            });

            $("#gallery_main_qs").show().owlCarousel({
                navigation: true,
                pagination: false,
                items: 4,
                itemsDesktop: [1199, 3],
                itemsDesktopSmall: [979, 3],
                itemsTablet: [768, 3],
                itemsMobile: [479, 3],
                scrollPerPage: true,
                navigationText: ['<i class="fa fa-angle-left" title="Пред."></i>', '<i class="fa fa-angle-right" title="След."></i>']
            });
        });

        e.preventDefault();
    });

    $('body').on('hidden.bs.modal', '.modal', function () {
        $(this).empty();
        $('.zoomContainer').css('z-index', '1');
        $('#top').removeClass('z-idx');
    });
}

/* Handle when window resize */
$(window).resize(function () {
    "use strict";

    /* re-call position quickshop */
    positionQuickshop();

    /* reset menu with condition */
    if (touch == true || getWidthBrowser() < 1024) {
        if ($('#top').hasClass('on')) {
            $('#top').prev().remove();
            $('#top').removeClass('on').removeClass('animated');
        }

        $('#goGrid').trigger('click');
    }
});


/* Handle when window scroll */
$(window).scroll(function () {
    "use strict";
    /* re-call handle menu when scroll */
    handleMenuScroll();
});

/* handle when window loaded */
$(window).load(function () {
    "use strict";
    /* re-call position quickshop */
    positionQuickshop();
});

jQuery(document).ready(function ($) {
    "use strict";

    /* DETECT PLATFORM */
    handleDetectPlatform();

    /* Handle Animate */
    handleAnimate();

    /* Handle Carousel */
    handleCarousel();

    /* Handle search box on pc */
    handleBoxSearch();

    /* Handle search box on mobile */
    callbackSearchMobile();

    /* Handle ajax quickshop */
    handleQuickshop();
    /* Handle position quickshop */
    positionQuickshop();

    /* Handle scroll to top */
    handleScrollTop();

    /* Handle dropdown box */
    handleDropdown();

    /* handle menu when scroll */
    handleMenuScroll();

    /* Handle tooltip */
    handleToolTip();

    /* Handle Map with GMap */
    handleMap();

    /* Handle sidebar */
    handleSidebar();

    /* Handle zoom for product image */
    alwaysUpdateZoom();

    /* Handle quantity */
    handleQuantity();

    /* Handle product thumbs */
    if (touch) {
        updateScrollThumbs();
    }
    else {

    }

    /* Handle sort by */
    handleSortBy();

    /* Handle grid - list */
    handleGridList();

    /* Handle collection tags */
    handleCollectionTags();

    $('.dropdown-menu').on(clickEv, function (e) {
        e.stopPropagation();
    });
    $('.dropdown-menu').on('click', function (e) {
        e.stopPropagation();
    });
    $('.btn-navbar').on('click', function () {
        return true;
    });


});





/**
 * Look under your chair! console.log FOR EVERYONE!
 *
 * @see http://paulirish.com/2009/log-a-lightweight-wrapper-for-consolelog/
 */
(function (b) {
    function c() {
    }

    for (var d = "assert,count,debug,dir,dirxml,error,exception,group,groupCollapsed,groupEnd,info,log,timeStamp,profile,profileEnd,time,timeEnd,trace,warn".split(","), a; a = d.pop();) {
        b[a] = b[a] || c
    }
})((function () {
    try {
        console.log();
        return window.console;
    } catch (err) {
        return window.console = {};
    }
})());


/**
 * Page-specific call-backs
 * Called after dom has loaded.
 */
var GLOBAL = {

    common: {
        init: function () {
            $('html').removeClass('no-js').addClass('js');
        }
    },

    templateIndex: {
        init: function () {

        }
    },

    templateProduct: {
        init: function () {

        }
    },

    templateCart: {
        init: function () {

        }
    }

}


/**
 * Fire function based upon attributes on the body tag.
 * This is the reason for "template{{ template | camelize }}" in layout/theme.liquid
 *
 * @see http://paulirish.com/2009/markup-based-unobtrusive-comprehensive-dom-ready-execution/
 */
var UTIL = {

    fire: function (func, funcname, args) {
        var namespace = GLOBAL;
        funcname = (funcname === undefined) ? 'init' : funcname;
        if (func !== '' && namespace[func] && typeof namespace[func][funcname] == 'function') {
            namespace[func][funcname](args);
        }
    },

    loadEvents: function () {
        var bodyId = document.body.id;

        // hit up common first.
        UTIL.fire('common');

        // do all the classes too.
        $.each(document.body.className.split(/\s+/), function (i, classnm) {
            UTIL.fire(classnm);
            UTIL.fire(classnm, bodyId);
        });
    }

};
$(document).ready(UTIL.loadEvents);


/**
 * Ajaxy add-to-cart
 */
/* Handle Add to Cart */
function handleAddToCart() {
    "use strict";
    $('body').on('click', '.add-to-cart', function (e) {
        if (typeof e !== 'undefined') e.preventDefault();
        var $this = $(this);

        // Hide Modal
        $('.modal').modal('hide');

        // Fly image to Cart
        var parent = $this.parents($this.attr('data-parent'));
        var image = $(parent).prev().find('.image-fly');
        flyToCart(image, '#umbrella .cart-link', 700);

        // Notify Cart
        var cartURL = './ajax/_product-cart.html';
        $.ajax({
            type: 'GET',
            url: cartURL,
            beforeSend: function () {
            },
            success: function (data) {
                notifyProduct(data);
            },
            dataType: "html"
        });
    });
}
function flyToCart(imgobj, cart, time) {
    "use strict";

    if (imgobj) {
        var imgsrc = imgobj.attr('src');

        imgobj.animate_from_to(cart, {
            pixels_per_second: time,
            initial_css: {
                'image': imgsrc
            },
            callback: function () {
            }
        });
    }
}
function notifyProduct($info) {
    "use strict";
    var wait = setTimeout(function () {
        $.jGrowl($info, {life: 5000});
    }, 200);
}
/* Handle Add to Wish List */
function handleAddToWL() {
    "use strict";
    $('body').on('click', '.add-to-wish-list', function (e) {
        if (typeof e !== 'undefined') e.preventDefault();
        var $this = $(this);

        // Hide Modal
        $('.modal').modal('hide');
        // Notify Cart
        var cartURL = './ajax/_product-wish-list.html';
        $.ajax({
            type: 'GET',
            url: cartURL,
            beforeSend: function () {
            },
            success: function (data) {
                notifyProduct(data);
            },
            dataType: "html"
        });
    });
}

jQuery(document).ready(function ($) {
    "use strict";
    handleAddToCart();
    handleAddToWL();
});





/*!
 * Bootstrap v3.0.2
 *
 * Copyright 2013 Twitter, Inc
 * Licensed under the Apache License v2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Designed and built with all the love in the world @twitter by @mdo and @fat.
 */

+function (a) {
    "use strict";
    var b = '[data-dismiss="alert"]', c = function (c) {
        a(c).on("click", b, this.close)
    };
    c.prototype.close = function (b) {
        function f() {
            e.trigger("closed.bs.alert").remove()
        }

        var c = a(this), d = c.attr("data-target");
        d || (d = c.attr("href"), d = d && d.replace(/.*(?=#[^\s]*$)/, ""));
        var e = a(d);
        b && b.preventDefault(), e.length || (e = c.hasClass("alert") ? c : c.parent()), e.trigger(b = a.Event("close.bs.alert"));
        if (b.isDefaultPrevented())return;
        e.removeClass("in"), a.support.transition && e.hasClass("fade") ? e.one(a.support.transition.end, f).emulateTransitionEnd(150) : f()
    };
    var d = a.fn.alert;
    a.fn.alert = function (b) {
        return this.each(function () {
            var d = a(this), e = d.data("bs.alert");
            e || d.data("bs.alert", e = new c(this)), typeof b == "string" && e[b].call(d)
        })
    }, a.fn.alert.Constructor = c, a.fn.alert.noConflict = function () {
        return a.fn.alert = d, this
    }, a(document).on("click.bs.alert.data-api", b, c.prototype.close)
}(jQuery), +function (a) {
    "use strict";
    var b = function (c, d) {
        this.$element = a(c), this.options = a.extend({}, b.DEFAULTS, d)
    };
    b.DEFAULTS = {loadingText: "loading..."}, b.prototype.setState = function (a) {
        var b = "disabled", c = this.$element, d = c.is("input") ? "val" : "html", e = c.data();
        a += "Text", e.resetText || c.data("resetText", c[d]()), c[d](e[a] || this.options[a]), setTimeout(function () {
            a == "loadingText" ? c.addClass(b).attr(b, b) : c.removeClass(b).removeAttr(b)
        }, 0)
    }, b.prototype.toggle = function () {
        var a = this.$element.closest('[data-toggle="buttons"]');
        if (a.length) {
            var b = this.$element.find("input").prop("checked", !this.$element.hasClass("active")).trigger("change");
            b.prop("type") === "radio" && a.find(".active").removeClass("active")
        }
        this.$element.toggleClass("active")
    };
    var c = a.fn.button;
    a.fn.button = function (c) {
        return this.each(function () {
            var d = a(this), e = d.data("bs.button"), f = typeof c == "object" && c;
            e || d.data("bs.button", e = new b(this, f)), c == "toggle" ? e.toggle() : c && e.setState(c)
        })
    }, a.fn.button.Constructor = b, a.fn.button.noConflict = function () {
        return a.fn.button = c, this
    }, a(document).on("click.bs.button.data-api", "[data-toggle^=button]", function (b) {
        var c = a(b.target);
        c.hasClass("btn") || (c = c.closest(".btn")), c.button("toggle"), b.preventDefault()
    })
}(jQuery), +function (a) {
    "use strict";
    var b = function (b, c) {
        this.$element = a(b), this.$indicators = this.$element.find(".carousel-indicators"), this.options = c, this.paused = this.sliding = this.interval = this.$active = this.$items = null, this.options.pause == "hover" && this.$element.on("mouseenter", a.proxy(this.pause, this)).on("mouseleave", a.proxy(this.cycle, this))
    };
    b.DEFAULTS = {interval: 5e3, pause: "hover", wrap: !0}, b.prototype.cycle = function (b) {
        return b || (this.paused = !1), this.interval && clearInterval(this.interval), this.options.interval && !this.paused && (this.interval = setInterval(a.proxy(this.next, this), this.options.interval)), this
    }, b.prototype.getActiveIndex = function () {
        return this.$active = this.$element.find(".item.active"), this.$items = this.$active.parent().children(), this.$items.index(this.$active)
    }, b.prototype.to = function (b) {
        var c = this, d = this.getActiveIndex();
        if (b > this.$items.length - 1 || b < 0)return;
        return this.sliding ? this.$element.one("slid", function () {
            c.to(b)
        }) : d == b ? this.pause().cycle() : this.slide(b > d ? "next" : "prev", a(this.$items[b]))
    }, b.prototype.pause = function (b) {
        return b || (this.paused = !0), this.$element.find(".next, .prev").length && a.support.transition.end && (this.$element.trigger(a.support.transition.end), this.cycle(!0)), this.interval = clearInterval(this.interval), this
    }, b.prototype.next = function () {
        if (this.sliding)return;
        return this.slide("next")
    }, b.prototype.prev = function () {
        if (this.sliding)return;
        return this.slide("prev")
    }, b.prototype.slide = function (b, c) {
        var d = this.$element.find(".item.active"), e = c || d[b](), f = this.interval, g = b == "next" ? "left" : "right", h = b == "next" ? "first" : "last", i = this;
        if (!e.length) {
            if (!this.options.wrap)return;
            e = this.$element.find(".item")[h]()
        }
        this.sliding = !0, f && this.pause();
        var j = a.Event("slide.bs.carousel", {relatedTarget: e[0], direction: g});
        if (e.hasClass("active"))return;
        this.$indicators.length && (this.$indicators.find(".active").removeClass("active"), this.$element.one("slid", function () {
            var b = a(i.$indicators.children()[i.getActiveIndex()]);
            b && b.addClass("active")
        }));
        if (a.support.transition && this.$element.hasClass("slide")) {
            this.$element.trigger(j);
            if (j.isDefaultPrevented())return;
            e.addClass(b), e[0].offsetWidth, d.addClass(g), e.addClass(g), d.one(a.support.transition.end, function () {
                e.removeClass([b, g].join(" ")).addClass("active"), d.removeClass(["active", g].join(" ")), i.sliding = !1, setTimeout(function () {
                    i.$element.trigger("slid")
                }, 0)
            }).emulateTransitionEnd(600)
        } else {
            this.$element.trigger(j);
            if (j.isDefaultPrevented())return;
            d.removeClass("active"), e.addClass("active"), this.sliding = !1, this.$element.trigger("slid")
        }
        return f && this.cycle(), this
    };
    var c = a.fn.carousel;
    a.fn.carousel = function (c) {
        return this.each(function () {
            var d = a(this), e = d.data("bs.carousel"), f = a.extend({}, b.DEFAULTS, d.data(), typeof c == "object" && c), g = typeof c == "string" ? c : f.slide;
            e || d.data("bs.carousel", e = new b(this, f)), typeof c == "number" ? e.to(c) : g ? e[g]() : f.interval && e.pause().cycle()
        })
    }, a.fn.carousel.Constructor = b, a.fn.carousel.noConflict = function () {
        return a.fn.carousel = c, this
    }, a(document).on("click.bs.carousel.data-api", "[data-slide], [data-slide-to]", function (b) {
        var c = a(this), d, e = a(c.attr("data-target") || (d = c.attr("href")) && d.replace(/.*(?=#[^\s]+$)/, "")), f = a.extend({}, e.data(), c.data()), g = c.attr("data-slide-to");
        g && (f.interval = !1), e.carousel(f), (g = c.attr("data-slide-to")) && e.data("bs.carousel").to(g), b.preventDefault()
    }), a(window).on("load", function () {
        a('[data-ride="carousel"]').each(function () {
            var b = a(this);
            b.carousel(b.data())
        })
    })
}(jQuery), +function (a) {
    function e() {
        a(b).remove(), a(c).each(function (b) {
            var c = f(a(this));
            if (!c.hasClass("open"))return;
            c.trigger(b = a.Event("hide.bs.dropdown"));
            if (b.isDefaultPrevented())return;
            c.removeClass("open").trigger("hidden.bs.dropdown")
        })
    }

    function f(b) {
        var c = b.attr("data-target");
        c || (c = b.attr("href"), c = c && /#/.test(c) && c.replace(/.*(?=#[^\s]*$)/, ""));
        var d = c && a(c);
        return d && d.length ? d : b.parent()
    }

    "use strict";
    var b = ".dropdown-backdrop", c = "[data-toggle=dropdown]", d = function (b) {
        var c = a(b).on("click.bs.dropdown", this.toggle)
    };
    d.prototype.toggle = function (b) {
        var c = a(this);
        if (c.is(".disabled, :disabled"))return;
        var d = f(c), g = d.hasClass("open");
        e();
        if (!g) {
            "ontouchstart"in document.documentElement && !d.closest(".navbar-nav").length && a('<div class="dropdown-backdrop"/>').insertAfter(a(this)).on("click", e), d.trigger(b = a.Event("show.bs.dropdown"));
            if (b.isDefaultPrevented())return;
            d.toggleClass("open").trigger("shown.bs.dropdown"), c.focus()
        }
        return !1
    }, d.prototype.keydown = function (b) {
        if (!/(38|40|27)/.test(b.keyCode))return;
        var d = a(this);
        b.preventDefault(), b.stopPropagation();
        if (d.is(".disabled, :disabled"))return;
        var e = f(d), g = e.hasClass("open");
        if (!g || g && b.keyCode == 27)return b.which == 27 && e.find(c).focus(), d.click();
        var h = a("[role=menu] li:not(.divider):visible a", e);
        if (!h.length)return;
        var i = h.index(h.filter(":focus"));
        b.keyCode == 38 && i > 0 && i--, b.keyCode == 40 && i < h.length - 1 && i++, ~i || (i = 0), h.eq(i).focus()
    };
    var g = a.fn.dropdown;
    a.fn.dropdown = function (b) {
        return this.each(function () {
            var c = a(this), e = c.data("dropdown");
            e || c.data("dropdown", e = new d(this)), typeof b == "string" && e[b].call(c)
        })
    }, a.fn.dropdown.Constructor = d, a.fn.dropdown.noConflict = function () {
        return a.fn.dropdown = g, this
    }, a(document).on("click.bs.dropdown.data-api", e).on("click.bs.dropdown.data-api", ".dropdown form", function (a) {
        a.stopPropagation()
    }).on("click.bs.dropdown.data-api", c, d.prototype.toggle).on("keydown.bs.dropdown.data-api", c + ", [role=menu]", d.prototype.keydown)
}(jQuery), +function (a) {
    "use strict";
    var b = function (b, c) {
        this.options = c, this.$element = a(b), this.$backdrop = this.isShown = null, this.options.remote && this.$element.load(this.options.remote)
    };
    b.DEFAULTS = {backdrop: !0, keyboard: !0, show: !0}, b.prototype.toggle = function (a) {
        return this[this.isShown ? "hide" : "show"](a)
    }, b.prototype.show = function (b) {
        var c = this, d = a.Event("show.bs.modal", {relatedTarget: b});
        this.$element.trigger(d);
        if (this.isShown || d.isDefaultPrevented())return;
        this.isShown = !0, this.escape(), this.$element.on("click.dismiss.modal", '[data-dismiss="modal"]', a.proxy(this.hide, this)), this.backdrop(function () {
            var d = a.support.transition && c.$element.hasClass("fade");
            c.$element.parent().length || c.$element.appendTo(document.body), c.$element.show(), d && c.$element[0].offsetWidth, c.$element.addClass("in").attr("aria-hidden", !1), c.enforceFocus();
            var e = a.Event("shown.bs.modal", {relatedTarget: b});
            d ? c.$element.find(".modal-dialog").one(a.support.transition.end, function () {
                c.$element.focus().trigger(e)
            }).emulateTransitionEnd(300) : c.$element.focus().trigger(e)
        })
    }, b.prototype.hide = function (b) {
        b && b.preventDefault(), b = a.Event("hide.bs.modal"), this.$element.trigger(b);
        if (!this.isShown || b.isDefaultPrevented())return;
        this.isShown = !1, this.escape(), a(document).off("focusin.bs.modal"), this.$element.removeClass("in").attr("aria-hidden", !0).off("click.dismiss.modal"), a.support.transition && this.$element.hasClass("fade") ? this.$element.one(a.support.transition.end, a.proxy(this.hideModal, this)).emulateTransitionEnd(300) : this.hideModal()
    }, b.prototype.enforceFocus = function () {
        a(document).off("focusin.bs.modal").on("focusin.bs.modal", a.proxy(function (a) {
            this.$element[0] !== a.target && !this.$element.has(a.target).length && this.$element.focus()
        }, this))
    }, b.prototype.escape = function () {
        this.isShown && this.options.keyboard ? this.$element.on("keyup.dismiss.bs.modal", a.proxy(function (a) {
            a.which == 27 && this.hide()
        }, this)) : this.isShown || this.$element.off("keyup.dismiss.bs.modal")
    }, b.prototype.hideModal = function () {
        var a = this;
        this.$element.hide(), this.backdrop(function () {
            a.removeBackdrop(), a.$element.trigger("hidden.bs.modal")
        })
    }, b.prototype.removeBackdrop = function () {
        this.$backdrop && this.$backdrop.remove(), this.$backdrop = null
    }, b.prototype.backdrop = function (b) {
        var c = this, d = this.$element.hasClass("fade") ? "fade" : "";
        if (this.isShown && this.options.backdrop) {
            var e = a.support.transition && d;
            this.$backdrop = a('<div class="modal-backdrop ' + d + '" />').appendTo(document.body), this.$element.on("click.dismiss.modal", a.proxy(function (a) {
                if (a.target !== a.currentTarget)return;
                this.options.backdrop == "static" ? this.$element[0].focus.call(this.$element[0]) : this.hide.call(this)
            }, this)), e && this.$backdrop[0].offsetWidth, this.$backdrop.addClass("in");
            if (!b)return;
            e ? this.$backdrop.one(a.support.transition.end, b).emulateTransitionEnd(150) : b()
        } else!this.isShown && this.$backdrop ? (this.$backdrop.removeClass("in"), a.support.transition && this.$element.hasClass("fade") ? this.$backdrop.one(a.support.transition.end, b).emulateTransitionEnd(150) : b()) : b && b()
    };
    var c = a.fn.modal;
    a.fn.modal = function (c, d) {
        return this.each(function () {
            var e = a(this), f = e.data("bs.modal"), g = a.extend({}, b.DEFAULTS, e.data(), typeof c == "object" && c);
            f || e.data("bs.modal", f = new b(this, g)), typeof c == "string" ? f[c](d) : g.show && f.show(d)
        })
    }, a.fn.modal.Constructor = b, a.fn.modal.noConflict = function () {
        return a.fn.modal = c, this
    }, a(document).on("click.bs.modal.data-api", '[data-toggle="modal"]', function (b) {
        var c = a(this), d = c.attr("href"), e = a(c.attr("data-target") || d && d.replace(/.*(?=#[^\s]+$)/, "")), f = e.data("modal") ? "toggle" : a.extend({remote: !/#/.test(d) && d}, e.data(), c.data());
        b.preventDefault(), e.modal(f, this).one("hide", function () {
            c.is(":visible") && c.focus()
        })
    }), a(document).on("show.bs.modal", ".modal", function () {
        a(document.body).addClass("modal-open")
    }).on("hidden.bs.modal", ".modal", function () {
        a(document.body).removeClass("modal-open")
    })
}(jQuery), +function (a) {
    "use strict";
    var b = function (a, b) {
        this.type = this.options = this.enabled = this.timeout = this.hoverState = this.$element = null, this.init("tooltip", a, b)
    };
    b.DEFAULTS = {
        animation: !0,
        placement: "top",
        selector: !1,
        template: '<div class="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
        trigger: "hover focus",
        title: "",
        delay: 0,
        html: !1,
        container: !1
    }, b.prototype.init = function (b, c, d) {
        this.enabled = !0, this.type = b, this.$element = a(c), this.options = this.getOptions(d);
        var e = this.options.trigger.split(" ");
        for (var f = e.length; f--;) {
            var g = e[f];
            if (g == "click")this.$element.on("click." + this.type, this.options.selector, a.proxy(this.toggle, this)); else if (g != "manual") {
                var h = g == "hover" ? "mouseenter" : "focus", i = g == "hover" ? "mouseleave" : "blur";
                this.$element.on(h + "." + this.type, this.options.selector, a.proxy(this.enter, this)), this.$element.on(i + "." + this.type, this.options.selector, a.proxy(this.leave, this))
            }
        }
        this.options.selector ? this._options = a.extend({}, this.options, {
            trigger: "manual",
            selector: ""
        }) : this.fixTitle()
    }, b.prototype.getDefaults = function () {
        return b.DEFAULTS
    }, b.prototype.getOptions = function (b) {
        return b = a.extend({}, this.getDefaults(), this.$element.data(), b), b.delay && typeof b.delay == "number" && (b.delay = {
            show: b.delay,
            hide: b.delay
        }), b
    }, b.prototype.getDelegateOptions = function () {
        var b = {}, c = this.getDefaults();
        return this._options && a.each(this._options, function (a, d) {
            c[a] != d && (b[a] = d)
        }), b
    }, b.prototype.enter = function (b) {
        var c = b instanceof this.constructor ? b : a(b.currentTarget)[this.type](this.getDelegateOptions()).data("bs." + this.type);
        clearTimeout(c.timeout), c.hoverState = "in";
        if (!c.options.delay || !c.options.delay.show)return c.show();
        c.timeout = setTimeout(function () {
            c.hoverState == "in" && c.show()
        }, c.options.delay.show)
    }, b.prototype.leave = function (b) {
        var c = b instanceof this.constructor ? b : a(b.currentTarget)[this.type](this.getDelegateOptions()).data("bs." + this.type);
        clearTimeout(c.timeout), c.hoverState = "out";
        if (!c.options.delay || !c.options.delay.hide)return c.hide();
        c.timeout = setTimeout(function () {
            c.hoverState == "out" && c.hide()
        }, c.options.delay.hide)
    }, b.prototype.show = function () {
        var b = a.Event("show.bs." + this.type);
        if (this.hasContent() && this.enabled) {
            this.$element.trigger(b);
            if (b.isDefaultPrevented())return;
            var c = this.tip();
            this.setContent(), this.options.animation && c.addClass("fade");
            var d = typeof this.options.placement == "function" ? this.options.placement.call(this, c[0], this.$element[0]) : this.options.placement, e = /\s?auto?\s?/i, f = e.test(d);
            f && (d = d.replace(e, "") || "top"), c.detach().css({
                top: 0,
                left: 0,
                display: "block"
            }).addClass(d), this.options.container ? c.appendTo(this.options.container) : c.insertAfter(this.$element);
            var g = this.getPosition(), h = c[0].offsetWidth, i = c[0].offsetHeight;
            if (f) {
                var j = this.$element.parent(), k = d, l = document.documentElement.scrollTop || document.body.scrollTop, m = this.options.container == "body" ? window.innerWidth : j.outerWidth(), n = this.options.container == "body" ? window.innerHeight : j.outerHeight(), o = this.options.container == "body" ? 0 : j.offset().left;
                d = d == "bottom" && g.top + g.height + i - l > n ? "top" : d == "top" && g.top - l - i < 0 ? "bottom" : d == "right" && g.right + h > m ? "left" : d == "left" && g.left - h < o ? "right" : d, c.removeClass(k).addClass(d)
            }
            var p = this.getCalculatedOffset(d, g, h, i);
            this.applyPlacement(p, d), this.$element.trigger("shown.bs." + this.type)
        }
    }, b.prototype.applyPlacement = function (a, b) {
        var c, d = this.tip(), e = d[0].offsetWidth, f = d[0].offsetHeight, g = parseInt(d.css("margin-top"), 10), h = parseInt(d.css("margin-left"), 10);
        isNaN(g) && (g = 0), isNaN(h) && (h = 0), a.top = a.top + g, a.left = a.left + h, d.offset(a).addClass("in");
        var i = d[0].offsetWidth, j = d[0].offsetHeight;
        b == "top" && j != f && (c = !0, a.top = a.top + f - j);
        if (/bottom|top/.test(b)) {
            var k = 0;
            a.left < 0 && (k = a.left * -2, a.left = 0, d.offset(a), i = d[0].offsetWidth, j = d[0].offsetHeight), this.replaceArrow(k - e + i, i, "left")
        } else this.replaceArrow(j - f, j, "top");
        c && d.offset(a)
    }, b.prototype.replaceArrow = function (a, b, c) {
        this.arrow().css(c, a ? 50 * (1 - a / b) + "%" : "")
    }, b.prototype.setContent = function () {
        var a = this.tip(), b = this.getTitle();
        a.find(".tooltip-inner")[this.options.html ? "html" : "text"](b), a.removeClass("fade in top bottom left right")
    }, b.prototype.hide = function () {
        function e() {
            b.hoverState != "in" && c.detach()
        }

        var b = this, c = this.tip(), d = a.Event("hide.bs." + this.type);
        this.$element.trigger(d);
        if (d.isDefaultPrevented())return;
        return c.removeClass("in"), a.support.transition && this.$tip.hasClass("fade") ? c.one(a.support.transition.end, e).emulateTransitionEnd(150) : e(), this.$element.trigger("hidden.bs." + this.type), this
    }, b.prototype.fixTitle = function () {
        var a = this.$element;
        (a.attr("title") || typeof a.attr("data-original-title") != "string") && a.attr("data-original-title", a.attr("title") || "").attr("title", "")
    }, b.prototype.hasContent = function () {
        return this.getTitle()
    }, b.prototype.getPosition = function () {
        var b = this.$element[0];
        return a.extend({}, typeof b.getBoundingClientRect == "function" ? b.getBoundingClientRect() : {
            width: b.offsetWidth,
            height: b.offsetHeight
        }, this.$element.offset())
    }, b.prototype.getCalculatedOffset = function (a, b, c, d) {
        return a == "bottom" ? {
            top: b.top + b.height,
            left: b.left + b.width / 2 - c / 2
        } : a == "top" ? {
            top: b.top - d,
            left: b.left + b.width / 2 - c / 2
        } : a == "left" ? {top: b.top + b.height / 2 - d / 2, left: b.left - c} : {
            top: b.top + b.height / 2 - d / 2,
            left: b.left + b.width
        }
    }, b.prototype.getTitle = function () {
        var a, b = this.$element, c = this.options;
        return a = b.attr("data-original-title") || (typeof c.title == "function" ? c.title.call(b[0]) : c.title), a
    }, b.prototype.tip = function () {
        return this.$tip = this.$tip || a(this.options.template)
    }, b.prototype.arrow = function () {
        return this.$arrow = this.$arrow || this.tip().find(".tooltip-arrow")
    }, b.prototype.validate = function () {
        this.$element[0].parentNode || (this.hide(), this.$element = null, this.options = null)
    }, b.prototype.enable = function () {
        this.enabled = !0
    }, b.prototype.disable = function () {
        this.enabled = !1
    }, b.prototype.toggleEnabled = function () {
        this.enabled = !this.enabled
    }, b.prototype.toggle = function (b) {
        var c = b ? a(b.currentTarget)[this.type](this.getDelegateOptions()).data("bs." + this.type) : this;
        c.tip().hasClass("in") ? c.leave(c) : c.enter(c)
    }, b.prototype.destroy = function () {
        this.hide().$element.off("." + this.type).removeData("bs." + this.type)
    };
    var c = a.fn.tooltip;
    a.fn.tooltip = function (c) {
        return this.each(function () {
            var d = a(this), e = d.data("bs.tooltip"), f = typeof c == "object" && c;
            e || d.data("bs.tooltip", e = new b(this, f)), typeof c == "string" && e[c]()
        })
    }, a.fn.tooltip.Constructor = b, a.fn.tooltip.noConflict = function () {
        return a.fn.tooltip = c, this
    }
}(jQuery), +function (a) {
    "use strict";
    var b = function (a, b) {
        this.init("popover", a, b)
    };
    if (!a.fn.tooltip)throw new Error("Popover requires tooltip.js");
    b.DEFAULTS = a.extend({}, a.fn.tooltip.Constructor.DEFAULTS, {
        placement: "right",
        trigger: "click",
        content: "",
        template: '<div class="popover"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
    }), b.prototype = a.extend({}, a.fn.tooltip.Constructor.prototype), b.prototype.constructor = b, b.prototype.getDefaults = function () {
        return b.DEFAULTS
    }, b.prototype.setContent = function () {
        var a = this.tip(), b = this.getTitle(), c = this.getContent();
        a.find(".popover-title")[this.options.html ? "html" : "text"](b), a.find(".popover-content")[this.options.html ? "html" : "text"](c), a.removeClass("fade top bottom left right in"), a.find(".popover-title").html() || a.find(".popover-title").hide()
    }, b.prototype.hasContent = function () {
        return this.getTitle() || this.getContent()
    }, b.prototype.getContent = function () {
        var a = this.$element, b = this.options;
        return a.attr("data-content") || (typeof b.content == "function" ? b.content.call(a[0]) : b.content)
    }, b.prototype.arrow = function () {
        return this.$arrow = this.$arrow || this.tip().find(".arrow")
    }, b.prototype.tip = function () {
        return this.$tip || (this.$tip = a(this.options.template)), this.$tip
    };
    var c = a.fn.popover;
    a.fn.popover = function (c) {
        return this.each(function () {
            var d = a(this), e = d.data("bs.popover"), f = typeof c == "object" && c;
            e || d.data("bs.popover", e = new b(this, f)), typeof c == "string" && e[c]()
        })
    }, a.fn.popover.Constructor = b, a.fn.popover.noConflict = function () {
        return a.fn.popover = c, this
    }
}(jQuery), +function (a) {
    "use strict";
    var b = function (b) {
        this.element = a(b)
    };
    b.prototype.show = function () {
        var b = this.element, c = b.closest("ul:not(.dropdown-menu)"), d = b.data("target");
        d || (d = b.attr("href"), d = d && d.replace(/.*(?=#[^\s]*$)/, ""));
        if (b.parent("li").hasClass("active"))return;
        var e = c.find(".active:last a")[0], f = a.Event("show.bs.tab", {relatedTarget: e});
        b.trigger(f);
        if (f.isDefaultPrevented())return;
        var g = a(d);
        this.activate(b.parent("li"), c), this.activate(g, g.parent(), function () {
            b.trigger({type: "shown.bs.tab", relatedTarget: e})
        })
    }, b.prototype.activate = function (b, c, d) {
        function g() {
            e.removeClass("active").find("> .dropdown-menu > .active").removeClass("active"), b.addClass("active"), f ? (b[0].offsetWidth, b.addClass("in")) : b.removeClass("fade"), b.parent(".dropdown-menu") && b.closest("li.dropdown").addClass("active"), d && d()
        }

        var e = c.find("> .active"), f = d && a.support.transition && e.hasClass("fade");
        f ? e.one(a.support.transition.end, g).emulateTransitionEnd(150) : g(), e.removeClass("in")
    };
    var c = a.fn.tab;
    a.fn.tab = function (c) {
        return this.each(function () {
            var d = a(this), e = d.data("bs.tab");
            e || d.data("bs.tab", e = new b(this)), typeof c == "string" && e[c]()
        })
    }, a.fn.tab.Constructor = b, a.fn.tab.noConflict = function () {
        return a.fn.tab = c, this
    }, a(document).on("click.bs.tab.data-api", '[data-toggle="tab"], [data-toggle="pill"]', function (b) {
        b.preventDefault(), a(this).tab("show")
    })
}(jQuery), +function (a) {
    "use strict";
    var b = function (c, d) {
        this.options = a.extend({}, b.DEFAULTS, d), this.$window = a(window).on("scroll.bs.affix.data-api", a.proxy(this.checkPosition, this)).on("click.bs.affix.data-api", a.proxy(this.checkPositionWithEventLoop, this)), this.$element = a(c), this.affixed = this.unpin = null, this.checkPosition()
    };
    b.RESET = "affix affix-top affix-bottom", b.DEFAULTS = {offset: 0}, b.prototype.checkPositionWithEventLoop = function () {
        setTimeout(a.proxy(this.checkPosition, this), 1)
    }, b.prototype.checkPosition = function () {
        if (!this.$element.is(":visible"))return;
        var c = a(document).height(), d = this.$window.scrollTop(), e = this.$element.offset(), f = this.options.offset, g = f.top, h = f.bottom;
        typeof f != "object" && (h = g = f), typeof g == "function" && (g = f.top()), typeof h == "function" && (h = f.bottom());
        var i = this.unpin != null && d + this.unpin <= e.top ? !1 : h != null && e.top + this.$element.height() >= c - h ? "bottom" : g != null && d <= g ? "top" : !1;
        if (this.affixed === i)return;
        this.unpin && this.$element.css("top", ""), this.affixed = i, this.unpin = i == "bottom" ? e.top - d : null, this.$element.removeClass(b.RESET).addClass("affix" + (i ? "-" + i : "")), i == "bottom" && this.$element.offset({top: document.body.offsetHeight - h - this.$element.height()})
    };
    var c = a.fn.affix;
    a.fn.affix = function (c) {
        return this.each(function () {
            var d = a(this), e = d.data("bs.affix"), f = typeof c == "object" && c;
            e || d.data("bs.affix", e = new b(this, f)), typeof c == "string" && e[c]()
        })
    }, a.fn.affix.Constructor = b, a.fn.affix.noConflict = function () {
        return a.fn.affix = c, this
    }, a(window).on("load", function () {
        a('[data-spy="affix"]').each(function () {
            var b = a(this), c = b.data();
            c.offset = c.offset || {}, c.offsetBottom && (c.offset.bottom = c.offsetBottom), c.offsetTop && (c.offset.top = c.offsetTop), b.affix(c)
        })
    })
}(jQuery), +function (a) {
    "use strict";
    var b = function (c, d) {
        this.$element = a(c), this.options = a.extend({}, b.DEFAULTS, d), this.transitioning = null, this.options.parent && (this.$parent = a(this.options.parent)), this.options.toggle && this.toggle()
    };
    b.DEFAULTS = {toggle: !0}, b.prototype.dimension = function () {
        var a = this.$element.hasClass("width");
        return a ? "width" : "height"
    }, b.prototype.show = function () {
        if (this.transitioning || this.$element.hasClass("in"))return;
        var b = a.Event("show.bs.collapse");
        this.$element.trigger(b);
        if (b.isDefaultPrevented())return;
        var c = this.$parent && this.$parent.find("> .panel > .in");
        if (c && c.length) {
            var d = c.data("bs.collapse");
            if (d && d.transitioning)return;
            c.collapse("hide"), d || c.data("bs.collapse", null)
        }
        var e = this.dimension();
        this.$element.removeClass("collapse").addClass("collapsing")[e](0), this.transitioning = 1;
        var f = function () {
            this.$element.removeClass("collapsing").addClass("in")[e]("auto"), this.transitioning = 0, this.$element.trigger("shown.bs.collapse")
        };
        if (!a.support.transition)return f.call(this);
        var g = a.camelCase(["scroll", e].join("-"));
        this.$element.one(a.support.transition.end, a.proxy(f, this)).emulateTransitionEnd(350)[e](this.$element[0][g])
    }, b.prototype.hide = function () {
        if (this.transitioning || !this.$element.hasClass("in"))return;
        var b = a.Event("hide.bs.collapse");
        this.$element.trigger(b);
        if (b.isDefaultPrevented())return;
        var c = this.dimension();
        this.$element[c](this.$element[c]())[0].offsetHeight, this.$element.addClass("collapsing").removeClass("collapse").removeClass("in"), this.transitioning = 1;
        var d = function () {
            this.transitioning = 0, this.$element.trigger("hidden.bs.collapse").removeClass("collapsing").addClass("collapse")
        };
        if (!a.support.transition)return d.call(this);
        this.$element[c](0).one(a.support.transition.end, a.proxy(d, this)).emulateTransitionEnd(350)
    }, b.prototype.toggle = function () {
        this[this.$element.hasClass("in") ? "hide" : "show"]()
    };
    var c = a.fn.collapse;
    a.fn.collapse = function (c) {
        return this.each(function () {
            var d = a(this), e = d.data("bs.collapse"), f = a.extend({}, b.DEFAULTS, d.data(), typeof c == "object" && c);
            e || d.data("bs.collapse", e = new b(this, f)), typeof c == "string" && e[c]()
        })
    }, a.fn.collapse.Constructor = b, a.fn.collapse.noConflict = function () {
        return a.fn.collapse = c, this
    }, a(document).on("click.bs.collapse.data-api", "[data-toggle=collapse]", function (b) {
        var c = a(this), d, e = c.attr("data-target") || b.preventDefault() || (d = c.attr("href")) && d.replace(/.*(?=#[^\s]+$)/, ""), f = a(e), g = f.data("bs.collapse"), h = g ? "toggle" : c.data(), i = c.attr("data-parent"), j = i && a(i);
        if (!g || !g.transitioning)j && j.find('[data-toggle=collapse][data-parent="' + i + '"]').not(c).addClass("collapsed"), c[f.hasClass("in") ? "addClass" : "removeClass"]("collapsed");
        f.collapse(h)
    })
}(jQuery), +function (a) {
    function b(c, d) {
        var e, f = a.proxy(this.process, this);
        this.$element = a(c).is("body") ? a(window) : a(c), this.$body = a("body"), this.$scrollElement = this.$element.on("scroll.bs.scroll-spy.data-api", f), this.options = a.extend({}, b.DEFAULTS, d), this.selector = (this.options.target || (e = a(c).attr("href")) && e.replace(/.*(?=#[^\s]+$)/, "") || "") + " .nav li > a", this.offsets = a([]), this.targets = a([]), this.activeTarget = null, this.refresh(), this.process()
    }

    "use strict", b.DEFAULTS = {offset: 10}, b.prototype.refresh = function () {
        var b = this.$element[0] == window ? "offset" : "position";
        this.offsets = a([]), this.targets = a([]);
        var c = this, d = this.$body.find(this.selector).map(function () {
            var d = a(this), e = d.data("target") || d.attr("href"), f = /^#\w/.test(e) && a(e);
            return f && f.length && [[f[b]().top + (!a.isWindow(c.$scrollElement.get(0)) && c.$scrollElement.scrollTop()), e]] || null
        }).sort(function (a, b) {
            return a[0] - b[0]
        }).each(function () {
            c.offsets.push(this[0]), c.targets.push(this[1])
        })
    }, b.prototype.process = function () {
        var a = this.$scrollElement.scrollTop() + this.options.offset, b = this.$scrollElement[0].scrollHeight || this.$body[0].scrollHeight, c = b - this.$scrollElement.height(), d = this.offsets, e = this.targets, f = this.activeTarget, g;
        if (a >= c)return f != (g = e.last()[0]) && this.activate(g);
        for (g = d.length; g--;)f != e[g] && a >= d[g] && (!d[g + 1] || a <= d[g + 1]) && this.activate(e[g])
    }, b.prototype.activate = function (b) {
        this.activeTarget = b, a(this.selector).parents(".active").removeClass("active");
        var c = this.selector + '[data-target="' + b + '"],' + this.selector + '[href="' + b + '"]', d = a(c).parents("li").addClass("active");
        d.parent(".dropdown-menu").length && (d = d.closest("li.dropdown").addClass("active")), d.trigger("activate")
    };
    var c = a.fn.scrollspy;
    a.fn.scrollspy = function (c) {
        return this.each(function () {
            var d = a(this), e = d.data("bs.scrollspy"), f = typeof c == "object" && c;
            e || d.data("bs.scrollspy", e = new b(this, f)), typeof c == "string" && e[c]()
        })
    }, a.fn.scrollspy.Constructor = b, a.fn.scrollspy.noConflict = function () {
        return a.fn.scrollspy = c, this
    }, a(window).on("load", function () {
        a('[data-spy="scroll"]').each(function () {
            var b = a(this);
            b.scrollspy(b.data())
        })
    })
}(jQuery), +function (a) {
    function b() {
        var a = document.createElement("bootstrap"), b = {
            WebkitTransition: "webkitTransitionEnd",
            MozTransition: "transitionend",
            OTransition: "oTransitionEnd otransitionend",
            transition: "transitionend"
        };
        for (var c in b)if (a.style[c] !== undefined)return {end: b[c]}
    }

    "use strict", a.fn.emulateTransitionEnd = function (b) {
        var c = !1, d = this;
        a(this).one(a.support.transition.end, function () {
            c = !0
        });
        var e = function () {
            c || a(d).trigger(a.support.transition.end)
        };
        return setTimeout(e, b), this
    }, a(function () {
        a.support.transition = b()
    })
}(jQuery)



/* #jQuery FlexSlider v2.1
 ================================================== */
;
(function (d) {
    d.flexslider = function (i, k) {
        var a = d(i), c = d.extend({}, d.flexslider.defaults, k), e = c.namespace, p = "ontouchstart"in window || window.DocumentTouch && document instanceof DocumentTouch, t = p ? "touchend" : "click", l = "vertical" === c.direction, m = c.reverse, h = 0 < c.itemWidth, r = "fade" === c.animation, s = "" !== c.asNavFor, f = {};
        d.data(i, "flexslider", a);
        f = {
            init: function () {
                a.animating = !1;
                a.currentSlide = c.startAt;
                a.animatingTo = a.currentSlide;
                a.atEnd = 0 === a.currentSlide || a.currentSlide === a.last;
                a.containerSelector = c.selector.substr(0,
                    c.selector.search(" "));
                a.slides = d(c.selector, a);
                a.container = d(a.containerSelector, a);
                a.count = a.slides.length;
                a.syncExists = 0 < d(c.sync).length;
                "slide" === c.animation && (c.animation = "swing");
                a.prop = l ? "top" : "marginLeft";
                a.args = {};
                a.manualPause = !1;
                var b = a, g;
                if (g = !c.video)if (g = !r)if (g = c.useCSS)a:{
                    g = document.createElement("div");
                    var n = ["perspectiveProperty", "WebkitPerspective", "MozPerspective", "OPerspective", "msPerspective"], e;
                    for (e in n)if (void 0 !== g.style[n[e]]) {
                        a.pfx = n[e].replace("Perspective", "").toLowerCase();
                        a.prop = "-" + a.pfx + "-transform";
                        g = !0;
                        break a
                    }
                    g = !1
                }
                b.transitions = g;
                "" !== c.controlsContainer && (a.controlsContainer = 0 < d(c.controlsContainer).length && d(c.controlsContainer));
                "" !== c.manualControls && (a.manualControls = 0 < d(c.manualControls).length && d(c.manualControls));
                c.randomize && (a.slides.sort(function () {
                    return Math.round(Math.random()) - 0.5
                }), a.container.empty().append(a.slides));
                a.doMath();
                s && f.asNav.setup();
                a.setup("init");
                c.controlNav && f.controlNav.setup();
                c.directionNav && f.directionNav.setup();
                c.keyboard &&
                (1 === d(a.containerSelector).length || c.multipleKeyboard) && d(document).bind("keyup", function (b) {
                    b = b.keyCode;
                    if (!a.animating && (39 === b || 37 === b))b = 39 === b ? a.getTarget("next") : 37 === b ? a.getTarget("prev") : !1, a.flexAnimate(b, c.pauseOnAction)
                });
                c.mousewheel && a.bind("mousewheel", function (b, g) {
                    b.preventDefault();
                    var d = 0 > g ? a.getTarget("next") : a.getTarget("prev");
                    a.flexAnimate(d, c.pauseOnAction)
                });
                c.pausePlay && f.pausePlay.setup();
                c.slideshow && (c.pauseOnHover && a.hover(function () {
                        !a.manualPlay && !a.manualPause && a.pause()
                    },
                    function () {
                        !a.manualPause && !a.manualPlay && a.play()
                    }), 0 < c.initDelay ? setTimeout(a.play, c.initDelay) : a.play());
                p && c.touch && f.touch();
                (!r || r && c.smoothHeight) && d(window).bind("resize focus", f.resize);
                setTimeout(function () {
                    c.start(a)
                }, 200)
            }, asNav: {
                setup: function () {
                    a.asNav = !0;
                    a.animatingTo = Math.floor(a.currentSlide / a.move);
                    a.currentItem = a.currentSlide;
                    a.slides.removeClass(e + "active-slide").eq(a.currentItem).addClass(e + "active-slide");
                    a.slides.click(function (b) {
                        b.preventDefault();
                        var b = d(this), g = b.index();
                        !d(c.asNavFor).data("flexslider").animating && !b.hasClass("active") && (a.direction = a.currentItem < g ? "next" : "prev", a.flexAnimate(g, c.pauseOnAction, !1, !0, !0))
                    })
                }
            }, controlNav: {
                setup: function () {
                    a.manualControls ? f.controlNav.setupManual() : f.controlNav.setupPaging()
                }, setupPaging: function () {
                    var b = 1, g;
                    a.controlNavScaffold = d('<ol class="' + e + "control-nav " + e + ("thumbnails" === c.controlNav ? "control-thumbs" : "control-paging") + '"></ol>');
                    if (1 < a.pagingCount)for (var n = 0; n < a.pagingCount; n++)g = "thumbnails" === c.controlNav ?
                    '<img src="' + a.slides.eq(n).attr("data-thumb") + '"/>' : "<a>" + b + "</a>", a.controlNavScaffold.append("<li>" + g + "</li>"), b++;
                    a.controlsContainer ? d(a.controlsContainer).append(a.controlNavScaffold) : a.append(a.controlNavScaffold);
                    f.controlNav.set();
                    f.controlNav.active();
                    a.controlNavScaffold.delegate("a, img", t, function (b) {
                        b.preventDefault();
                        var b = d(this), g = a.controlNav.index(b);
                        b.hasClass(e + "active") || (a.direction = g > a.currentSlide ? "next" : "prev", a.flexAnimate(g, c.pauseOnAction))
                    });
                    p && a.controlNavScaffold.delegate("a",
                        "click touchstart", function (a) {
                            a.preventDefault()
                        })
                }, setupManual: function () {
                    a.controlNav = a.manualControls;
                    f.controlNav.active();
                    a.controlNav.live(t, function (b) {
                        b.preventDefault();
                        var b = d(this), g = a.controlNav.index(b);
                        b.hasClass(e + "active") || (g > a.currentSlide ? a.direction = "next" : a.direction = "prev", a.flexAnimate(g, c.pauseOnAction))
                    });
                    p && a.controlNav.live("click touchstart", function (a) {
                        a.preventDefault()
                    })
                }, set: function () {
                    a.controlNav = d("." + e + "control-nav li " + ("thumbnails" === c.controlNav ? "img" : "a"),
                        a.controlsContainer ? a.controlsContainer : a)
                }, active: function () {
                    a.controlNav.removeClass(e + "active").eq(a.animatingTo).addClass(e + "active")
                }, update: function (b, c) {
                    1 < a.pagingCount && "add" === b ? a.controlNavScaffold.append(d("<li><a>" + a.count + "</a></li>")) : 1 === a.pagingCount ? a.controlNavScaffold.find("li").remove() : a.controlNav.eq(c).closest("li").remove();
                    f.controlNav.set();
                    1 < a.pagingCount && a.pagingCount !== a.controlNav.length ? a.update(c, b) : f.controlNav.active()
                }
            }, directionNav: {
                setup: function () {
                    var b = d('<ul class="' +
                    e + 'direction-nav"><li><a class="' + e + 'prev" href="#">' + c.prevText + '</a></li><li><a class="' + e + 'next" href="#">' + c.nextText + "</a></li></ul>");
                    a.controlsContainer ? (d(a.controlsContainer).append(b), a.directionNav = d("." + e + "direction-nav li a", a.controlsContainer)) : (a.append(b), a.directionNav = d("." + e + "direction-nav li a", a));
                    f.directionNav.update();
                    a.directionNav.bind(t, function (b) {
                        b.preventDefault();
                        b = d(this).hasClass(e + "next") ? a.getTarget("next") : a.getTarget("prev");
                        a.flexAnimate(b, c.pauseOnAction)
                    });
                    p && a.directionNav.bind("click touchstart", function (a) {
                        a.preventDefault()
                    })
                }, update: function () {
                    var b = e + "disabled";
                    1 === a.pagingCount ? a.directionNav.addClass(b) : c.animationLoop ? a.directionNav.removeClass(b) : 0 === a.animatingTo ? a.directionNav.removeClass(b).filter("." + e + "prev").addClass(b) : a.animatingTo === a.last ? a.directionNav.removeClass(b).filter("." + e + "next").addClass(b) : a.directionNav.removeClass(b)
                }
            }, pausePlay: {
                setup: function () {
                    var b = d('<div class="' + e + 'pauseplay"><a></a></div>');
                    a.controlsContainer ?
                        (a.controlsContainer.append(b), a.pausePlay = d("." + e + "pauseplay a", a.controlsContainer)) : (a.append(b), a.pausePlay = d("." + e + "pauseplay a", a));
                    f.pausePlay.update(c.slideshow ? e + "pause" : e + "play");
                    a.pausePlay.bind(t, function (b) {
                        b.preventDefault();
                        d(this).hasClass(e + "pause") ? (a.manualPause = !0, a.manualPlay = !1, a.pause()) : (a.manualPause = !1, a.manualPlay = !0, a.play())
                    });
                    p && a.pausePlay.bind("click touchstart", function (a) {
                        a.preventDefault()
                    })
                }, update: function (b) {
                    "play" === b ? a.pausePlay.removeClass(e + "pause").addClass(e +
                    "play").text(c.playText) : a.pausePlay.removeClass(e + "play").addClass(e + "pause").text(c.pauseText)
                }
            }, touch: function () {
                function b(b) {
                    j = l ? d - b.touches[0].pageY : d - b.touches[0].pageX;
                    p = l ? Math.abs(j) < Math.abs(b.touches[0].pageX - e) : Math.abs(j) < Math.abs(b.touches[0].pageY - e);
                    if (!p || 500 < Number(new Date) - k)b.preventDefault(), !r && a.transitions && (c.animationLoop || (j /= 0 === a.currentSlide && 0 > j || a.currentSlide === a.last && 0 < j ? Math.abs(j) / q + 2 : 1), a.setProps(f + j, "setTouch"))
                }

                function g() {
                    i.removeEventListener("touchmove",
                        b, !1);
                    if (a.animatingTo === a.currentSlide && !p && null !== j) {
                        var h = m ? -j : j, l = 0 < h ? a.getTarget("next") : a.getTarget("prev");
                        a.canAdvance(l) && (550 > Number(new Date) - k && 50 < Math.abs(h) || Math.abs(h) > q / 2) ? a.flexAnimate(l, c.pauseOnAction) : r || a.flexAnimate(a.currentSlide, c.pauseOnAction, !0)
                    }
                    i.removeEventListener("touchend", g, !1);
                    f = j = e = d = null
                }

                var d, e, f, q, j, k, p = !1;
                i.addEventListener("touchstart", function (j) {
                    a.animating ? j.preventDefault() : 1 === j.touches.length && (a.pause(), q = l ? a.h : a.w, k = Number(new Date), f = h && m && a.animatingTo ===
                    a.last ? 0 : h && m ? a.limit - (a.itemW + c.itemMargin) * a.move * a.animatingTo : h && a.currentSlide === a.last ? a.limit : h ? (a.itemW + c.itemMargin) * a.move * a.currentSlide : m ? (a.last - a.currentSlide + a.cloneOffset) * q : (a.currentSlide + a.cloneOffset) * q, d = l ? j.touches[0].pageY : j.touches[0].pageX, e = l ? j.touches[0].pageX : j.touches[0].pageY, i.addEventListener("touchmove", b, !1), i.addEventListener("touchend", g, !1))
                }, !1)
            }, resize: function () {
                !a.animating && a.is(":visible") && (h || a.doMath(), r ? f.smoothHeight() : h ? (a.slides.width(a.computedW),
                    a.update(a.pagingCount), a.setProps()) : l ? (a.viewport.height(a.h), a.setProps(a.h, "setTotal")) : (c.smoothHeight && f.smoothHeight(), a.newSlides.width(a.computedW), a.setProps(a.computedW, "setTotal")))
            }, smoothHeight: function (b) {
                if (!l || r) {
                    var c = r ? a : a.viewport;
                    b ? c.animate({height: a.slides.eq(a.animatingTo).height()}, b) : c.height(a.slides.eq(a.animatingTo).height())
                }
            }, sync: function (b) {
                var g = d(c.sync).data("flexslider"), e = a.animatingTo;
                switch (b) {
                    case "animate":
                        g.flexAnimate(e, c.pauseOnAction, !1, !0);
                        break;
                    case "play":
                        !g.playing && !g.asNav && g.play();
                        break;
                    case "pause":
                        g.pause()
                }
            }
        };
        a.flexAnimate = function (b, g, n, i, k) {
            s && 1 === a.pagingCount && (a.direction = a.currentItem < b ? "next" : "prev");
            if (!a.animating && (a.canAdvance(b, k) || n) && a.is(":visible")) {
                if (s && i)if (n = d(c.asNavFor).data("flexslider"), a.atEnd = 0 === b || b === a.count - 1, n.flexAnimate(b, !0, !1, !0, k), a.direction = a.currentItem < b ? "next" : "prev", n.direction = a.direction, Math.ceil((b + 1) / a.visible) - 1 !== a.currentSlide && 0 !== b)a.currentItem = b, a.slides.removeClass(e + "active-slide").eq(b).addClass(e +
                "active-slide"), b = Math.floor(b / a.visible); else return a.currentItem = b, a.slides.removeClass(e + "active-slide").eq(b).addClass(e + "active-slide"), !1;
                a.animating = !0;
                a.animatingTo = b;
                c.before(a);
                g && a.pause();
                a.syncExists && !k && f.sync("animate");
                c.controlNav && f.controlNav.active();
                h || a.slides.removeClass(e + "active-slide").eq(b).addClass(e + "active-slide");
                a.atEnd = 0 === b || b === a.last;
                c.directionNav && f.directionNav.update();
                b === a.last && (c.end(a), c.animationLoop || a.pause());
                if (r)p ? (a.slides.eq(a.currentSlide).css({
                    opacity: 0,
                    zIndex: 1
                }), a.slides.eq(b).css({
                    opacity: 1,
                    zIndex: 2
                }), a.slides.unbind("webkitTransitionEnd transitionend"), a.slides.eq(a.currentSlide).bind("webkitTransitionEnd transitionend", function () {
                    c.after(a)
                }), a.animating = !1, a.currentSlide = a.animatingTo) : (a.slides.eq(a.currentSlide).fadeOut(c.animationSpeed, c.easing), a.slides.eq(b).fadeIn(c.animationSpeed, c.easing, a.wrapup)); else {
                    var q = l ? a.slides.filter(":first").height() : a.computedW;
                    h ? (b = c.itemWidth > a.w ? 2 * c.itemMargin : c.itemMargin, b = (a.itemW + b) * a.move * a.animatingTo,
                        b = b > a.limit && 1 !== a.visible ? a.limit : b) : b = 0 === a.currentSlide && b === a.count - 1 && c.animationLoop && "next" !== a.direction ? m ? (a.count + a.cloneOffset) * q : 0 : a.currentSlide === a.last && 0 === b && c.animationLoop && "prev" !== a.direction ? m ? 0 : (a.count + 1) * q : m ? (a.count - 1 - b + a.cloneOffset) * q : (b + a.cloneOffset) * q;
                    a.setProps(b, "", c.animationSpeed);
                    if (a.transitions) {
                        if (!c.animationLoop || !a.atEnd)a.animating = !1, a.currentSlide = a.animatingTo;
                        a.container.unbind("webkitTransitionEnd transitionend");
                        a.container.bind("webkitTransitionEnd transitionend",
                            function () {
                                a.wrapup(q)
                            })
                    } else a.container.animate(a.args, c.animationSpeed, c.easing, function () {
                        a.wrapup(q)
                    })
                }
                c.smoothHeight && f.smoothHeight(c.animationSpeed)
            }
        };
        a.wrapup = function (b) {
            !r && !h && (0 === a.currentSlide && a.animatingTo === a.last && c.animationLoop ? a.setProps(b, "jumpEnd") : a.currentSlide === a.last && (0 === a.animatingTo && c.animationLoop) && a.setProps(b, "jumpStart"));
            a.animating = !1;
            a.currentSlide = a.animatingTo;
            c.after(a)
        };
        a.animateSlides = function () {
            a.animating || a.flexAnimate(a.getTarget("next"))
        };
        a.pause =
            function () {
                clearInterval(a.animatedSlides);
                a.playing = !1;
                c.pausePlay && f.pausePlay.update("play");
                a.syncExists && f.sync("pause")
            };
        a.play = function () {
            a.animatedSlides = setInterval(a.animateSlides, c.slideshowSpeed);
            a.playing = !0;
            c.pausePlay && f.pausePlay.update("pause");
            a.syncExists && f.sync("play")
        };
        a.canAdvance = function (b, g) {
            var d = s ? a.pagingCount - 1 : a.last;
            return g ? !0 : s && a.currentItem === a.count - 1 && 0 === b && "prev" === a.direction ? !0 : s && 0 === a.currentItem && b === a.pagingCount - 1 && "next" !== a.direction ? !1 : b === a.currentSlide && !s ? !1 : c.animationLoop ? !0 : a.atEnd && 0 === a.currentSlide && b === d && "next" !== a.direction ? !1 : a.atEnd && a.currentSlide === d && 0 === b && "next" === a.direction ? !1 : !0
        };
        a.getTarget = function (b) {
            a.direction = b;
            return "next" === b ? a.currentSlide === a.last ? 0 : a.currentSlide + 1 : 0 === a.currentSlide ? a.last : a.currentSlide - 1
        };
        a.setProps = function (b, g, d) {
            var e, f = b ? b : (a.itemW + c.itemMargin) * a.move * a.animatingTo;
            e = -1 * function () {
                if (h)return "setTouch" === g ? b : m && a.animatingTo === a.last ? 0 : m ? a.limit - (a.itemW + c.itemMargin) * a.move * a.animatingTo : a.animatingTo ===
                a.last ? a.limit : f;
                switch (g) {
                    case "setTotal":
                        return m ? (a.count - 1 - a.currentSlide + a.cloneOffset) * b : (a.currentSlide + a.cloneOffset) * b;
                    case "setTouch":
                        return b;
                    case "jumpEnd":
                        return m ? b : a.count * b;
                    case "jumpStart":
                        return m ? a.count * b : b;
                    default:
                        return b
                }
            }() + "px";
            a.transitions && (e = l ? "translate3d(0," + e + ",0)" : "translate3d(" + e + ",0,0)", d = void 0 !== d ? d / 1E3 + "s" : "0s", a.container.css("-" + a.pfx + "-transition-duration", d));
            a.args[a.prop] = e;
            (a.transitions || void 0 === d) && a.container.css(a.args)
        };
        a.setup = function (b) {
            if (r)a.slides.css({
                width: "100%",
                "float": "left", marginRight: "-100%", position: "relative"
            }), "init" === b && (p ? a.slides.css({
                opacity: 0,
                display: "block",
                webkitTransition: "opacity " + c.animationSpeed / 1E3 + "s ease",
                zIndex: 1
            }).eq(a.currentSlide).css({
                opacity: 1,
                zIndex: 2
            }) : a.slides.eq(a.currentSlide).fadeIn(c.animationSpeed, c.easing)), c.smoothHeight && f.smoothHeight(); else {
                var g, n;
                "init" === b && (a.viewport = d('<div class="' + e + 'viewport"></div>').css({
                    overflow: "hidden",
                    position: "relative"
                }).appendTo(a).append(a.container), a.cloneCount = 0, a.cloneOffset =
                    0, m && (n = d.makeArray(a.slides).reverse(), a.slides = d(n), a.container.empty().append(a.slides)));
                c.animationLoop && !h && (a.cloneCount = 2, a.cloneOffset = 1, "init" !== b && a.container.find(".clone").remove(), a.container.append(a.slides.first().clone().addClass("clone")).prepend(a.slides.last().clone().addClass("clone")));
                a.newSlides = d(c.selector, a);
                g = m ? a.count - 1 - a.currentSlide + a.cloneOffset : a.currentSlide + a.cloneOffset;
                l && !h ? (a.container.height(200 * (a.count + a.cloneCount) + "%").css("position", "absolute").width("100%"),
                    setTimeout(function () {
                        a.newSlides.css({display: "block"});
                        a.doMath();
                        a.viewport.height(a.h);
                        a.setProps(g * a.h, "init")
                    }, "init" === b ? 100 : 0)) : (a.container.width(200 * (a.count + a.cloneCount) + "%"), a.setProps(g * a.computedW, "init"), setTimeout(function () {
                    a.doMath();
                    a.newSlides.css({width: a.computedW, "float": "left", display: "block"});
                    c.smoothHeight && f.smoothHeight()
                }, "init" === b ? 100 : 0))
            }
            h || a.slides.removeClass(e + "active-slide").eq(a.currentSlide).addClass(e + "active-slide")
        };
        a.doMath = function () {
            var b = a.slides.first(),
                d = c.itemMargin, e = c.minItems, f = c.maxItems;
            a.w = a.width();
            a.h = b.height();
            a.boxPadding = b.outerWidth() - b.width();
            h ? (a.itemT = c.itemWidth + d, a.minW = e ? e * a.itemT : a.w, a.maxW = f ? f * a.itemT : a.w, a.itemW = a.minW > a.w ? (a.w - d * e) / e : a.maxW < a.w ? (a.w - d * f) / f : c.itemWidth > a.w ? a.w : c.itemWidth, a.visible = Math.floor(a.w / (a.itemW + d)), a.move = 0 < c.move && c.move < a.visible ? c.move : a.visible, a.pagingCount = Math.ceil((a.count - a.visible) / a.move + 1), a.last = a.pagingCount - 1, a.limit = 1 === a.pagingCount ? 0 : c.itemWidth > a.w ? (a.itemW + 2 * d) * a.count - a.w -
            d : (a.itemW + d) * a.count - a.w - d) : (a.itemW = a.w, a.pagingCount = a.count, a.last = a.count - 1);
            a.computedW = a.itemW - a.boxPadding
        };
        a.update = function (b, d) {
            a.doMath();
            h || (b < a.currentSlide ? a.currentSlide += 1 : b <= a.currentSlide && 0 !== b && (a.currentSlide -= 1), a.animatingTo = a.currentSlide);
            if (c.controlNav && !a.manualControls)if ("add" === d && !h || a.pagingCount > a.controlNav.length)f.controlNav.update("add"); else if ("remove" === d && !h || a.pagingCount < a.controlNav.length)h && a.currentSlide > a.last && (a.currentSlide -= 1, a.animatingTo -= 1),
                f.controlNav.update("remove", a.last);
            c.directionNav && f.directionNav.update()
        };
        a.addSlide = function (b, e) {
            var f = d(b);
            a.count += 1;
            a.last = a.count - 1;
            l && m ? void 0 !== e ? a.slides.eq(a.count - e).after(f) : a.container.prepend(f) : void 0 !== e ? a.slides.eq(e).before(f) : a.container.append(f);
            a.update(e, "add");
            a.slides = d(c.selector + ":not(.clone)", a);
            a.setup();
            c.added(a)
        };
        a.removeSlide = function (b) {
            var e = isNaN(b) ? a.slides.index(d(b)) : b;
            a.count -= 1;
            a.last = a.count - 1;
            isNaN(b) ? d(b, a.slides).remove() : l && m ? a.slides.eq(a.last).remove() :
                a.slides.eq(b).remove();
            a.doMath();
            a.update(e, "remove");
            a.slides = d(c.selector + ":not(.clone)", a);
            a.setup();
            c.removed(a)
        };
        f.init()
    };
    d.flexslider.defaults = {
        namespace: "flex-",
        selector: ".slides > li",
        animation: "fade",
        easing: "swing",
        direction: "horizontal",
        reverse: !1,
        animationLoop: !0,
        smoothHeight: !1,
        startAt: 0,
        slideshow: !0,
        slideshowSpeed: 7E3,
        animationSpeed: 600,
        initDelay: 0,
        randomize: !1,
        pauseOnAction: !0,
        pauseOnHover: !1,
        useCSS: !0,
        touch: !0,
        video: !1,
        controlNav: !0,
        directionNav: !0,
        prevText: "Previous",
        nextText: "Next",
        keyboard: !0,
        multipleKeyboard: !1,
        mousewheel: !1,
        pausePlay: !1,
        pauseText: "Pause",
        playText: "Play",
        controlsContainer: "",
        manualControls: "",
        sync: "",
        asNavFor: "",
        itemWidth: 0,
        itemMargin: 0,
        minItems: 0,
        maxItems: 0,
        move: 0,
        start: function () {
        },
        before: function () {
        },
        after: function () {
        },
        end: function () {
        },
        added: function () {
        },
        removed: function () {
        }
    };
    d.fn.flexslider = function (i) {
        void 0 === i && (i = {});
        if ("object" === typeof i)return this.each(function () {
            var a = d(this), c = a.find(i.selector ? i.selector : ".slides > li");
            1 === c.length ? (c.fadeIn(400),
            i.start && i.start(a)) : void 0 == a.data("flexslider") && new d.flexslider(this, i)
        });
        var k = d(this).data("flexslider");
        switch (i) {
            case "play":
                k.play();
                break;
            case "pause":
                k.pause();
                break;
            case "next":
                k.flexAnimate(k.getTarget("next"), !0);
                break;
            case "prev":
            case "previous":
                k.flexAnimate(k.getTarget("prev"), !0);
                break;
            default:
                "number" === typeof i && k.flexAnimate(i, !0)
        }
    }
})(jQuery);

/* #jQuery FancyBox v2.1.4
 ================================================== */
(function (C, z, f, r) {
    var q = f(C), n = f(z), b = f.fancybox = function () {
        b.open.apply(this, arguments)
    }, H = navigator.userAgent.match(/msie/), w = null, s = z.createTouch !== r, t = function (a) {
        return a && a.hasOwnProperty && a instanceof f
    }, p = function (a) {
        return a && "string" === f.type(a)
    }, F = function (a) {
        return p(a) && 0 < a.indexOf("%")
    }, l = function (a, d) {
        var e = parseInt(a, 10) || 0;
        d && F(a) && (e *= b.getViewport()[d] / 100);
        return Math.ceil(e)
    }, x = function (a, b) {
        return l(a, b) + "px"
    };
    f.extend(b, {
        version: "2.1.4",
        defaults: {
            padding: 15,
            margin: 20,
            width: 800,
            height: 600,
            minWidth: 100,
            minHeight: 100,
            maxWidth: 9999,
            maxHeight: 9999,
            autoSize: !0,
            autoHeight: !1,
            autoWidth: !1,
            autoResize: !0,
            autoCenter: !s,
            fitToView: !0,
            aspectRatio: !1,
            topRatio: 0.5,
            leftRatio: 0.5,
            scrolling: "auto",
            wrapCSS: "",
            arrows: !0,
            closeBtn: !0,
            closeClick: !1,
            nextClick: !1,
            mouseWheel: !0,
            autoPlay: !1,
            playSpeed: 3E3,
            preload: 3,
            modal: !1,
            loop: !0,
            ajax: {dataType: "html", headers: {"X-fancyBox": !0}},
            iframe: {scrolling: "auto", preload: !0},
            swf: {wmode: "transparent", allowfullscreen: "true", allowscriptaccess: "always"},
            keys: {
                next: {
                    13: "left",
                    34: "up", 39: "left", 40: "up"
                }, prev: {8: "right", 33: "down", 37: "right", 38: "down"}, close: [27], play: [32], toggle: [70]
            },
            direction: {next: "left", prev: "right"},
            scrollOutside: !0,
            index: 0,
            type: null,
            href: null,
            content: null,
            title: null,
            tpl: {
                wrap: '<div class="fancybox-wrap" tabIndex="-1"><div class="fancybox-skin"><div class="fancybox-outer"><div class="fancybox-inner"></div></div></div></div>',
                image: '<img class="fancybox-image" src="{href}" alt="" />',
                iframe: '<iframe id="fancybox-frame{rnd}" name="fancybox-frame{rnd}" class="fancybox-iframe" frameborder="0" vspace="0" hspace="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen' +
                (H ? ' allowtransparency="true"' : "") + "></iframe>",
                error: '<p class="fancybox-error">The requested content cannot be loaded.<br/>Please try again later.</p>',
                closeBtn: '<a title="Закрыть" class="fancybox-item fancybox-close" href="javascript:;"></a>',
                next: '<a title="Next" class="fancybox-nav fancybox-next" href="javascript:;"><span></span></a>',
                prev: '<a title="Previous" class="fancybox-nav fancybox-prev" href="javascript:;"><span></span></a>'
            },
            openEffect: "fade",
            openSpeed: 250,
            openEasing: "swing",
            openOpacity: !0,
            openMethod: "zoomIn",
            closeEffect: "fade",
            closeSpeed: 250,
            closeEasing: "swing",
            closeOpacity: !0,
            closeMethod: "zoomOut",
            nextEffect: "elastic",
            nextSpeed: 250,
            nextEasing: "swing",
            nextMethod: "changeIn",
            prevEffect: "elastic",
            prevSpeed: 250,
            prevEasing: "swing",
            prevMethod: "changeOut",
            helpers: {overlay: !0, title: !0},
            onCancel: f.noop,
            beforeLoad: f.noop,
            afterLoad: f.noop,
            beforeShow: f.noop,
            afterShow: f.noop,
            beforeChange: f.noop,
            beforeClose: f.noop,
            afterClose: f.noop
        },
        group: {},
        opts: {},
        previous: null,
        coming: null,
        current: null,
        isActive: !1,
        isOpen: !1,
        isOpened: !1,
        wrap: null,
        skin: null,
        outer: null,
        inner: null,
        player: {timer: null, isActive: !1},
        ajaxLoad: null,
        imgPreload: null,
        transitions: {},
        helpers: {},
        open: function (a, d) {
            if (a && (f.isPlainObject(d) || (d = {}), !1 !== b.close(!0)))return f.isArray(a) || (a = t(a) ? f(a).get() : [a]), f.each(a, function (e, c) {
                var k = {}, g, h, j, m, l;
                "object" === f.type(c) && (c.nodeType && (c = f(c)), t(c) ? (k = {
                    href: c.data("fancybox-href") || c.attr("href"),
                    title: c.data("fancybox-title") || c.attr("title"),
                    isDom: !0,
                    element: c
                }, f.metadata && f.extend(!0, k,
                    c.metadata())) : k = c);
                g = d.href || k.href || (p(c) ? c : null);
                h = d.title !== r ? d.title : k.title || "";
                m = (j = d.content || k.content) ? "html" : d.type || k.type;
                !m && k.isDom && (m = c.data("fancybox-type"), m || (m = (m = c.prop("class").match(/fancybox\.(\w+)/)) ? m[1] : null));
                p(g) && (m || (b.isImage(g) ? m = "image" : b.isSWF(g) ? m = "swf" : "#" === g.charAt(0) ? m = "inline" : p(c) && (m = "html", j = c)), "ajax" === m && (l = g.split(/\s+/, 2), g = l.shift(), l = l.shift()));
                j || ("inline" === m ? g ? j = f(p(g) ? g.replace(/.*(?=#[^\s]+$)/, "") : g) : k.isDom && (j = c) : "html" === m ? j = g : !m && (!g &&
                k.isDom) && (m = "inline", j = c));
                f.extend(k, {href: g, type: m, content: j, title: h, selector: l});
                a[e] = k
            }), b.opts = f.extend(!0, {}, b.defaults, d), d.keys !== r && (b.opts.keys = d.keys ? f.extend({}, b.defaults.keys, d.keys) : !1), b.group = a, b._start(b.opts.index)
        },
        cancel: function () {
            var a = b.coming;
            a && !1 !== b.trigger("onCancel") && (b.hideLoading(), b.ajaxLoad && b.ajaxLoad.abort(), b.ajaxLoad = null, b.imgPreload && (b.imgPreload.onload = b.imgPreload.onerror = null), a.wrap && a.wrap.stop(!0, !0).trigger("onReset").remove(), b.coming = null, b.current ||
            b._afterZoomOut(a))
        },
        close: function (a) {
            b.cancel();
            !1 !== b.trigger("beforeClose") && (b.unbindEvents(), b.isActive && (!b.isOpen || !0 === a ? (f(".fancybox-wrap").stop(!0).trigger("onReset").remove(), b._afterZoomOut()) : (b.isOpen = b.isOpened = !1, b.isClosing = !0, f(".fancybox-item, .fancybox-nav").remove(), b.wrap.stop(!0, !0).removeClass("fancybox-opened"), b.transitions[b.current.closeMethod]())))
        },
        play: function (a) {
            var d = function () {
                clearTimeout(b.player.timer)
            }, e = function () {
                d();
                b.current && b.player.isActive && (b.player.timer =
                    setTimeout(b.next, b.current.playSpeed))
            }, c = function () {
                d();
                f("body").unbind(".player");
                b.player.isActive = !1;
                b.trigger("onPlayEnd")
            };
            if (!0 === a || !b.player.isActive && !1 !== a) {
                if (b.current && (b.current.loop || b.current.index < b.group.length - 1))b.player.isActive = !0, f("body").bind({
                    "afterShow.player onUpdate.player": e,
                    "onCancel.player beforeClose.player": c,
                    "beforeLoad.player": d
                }), e(), b.trigger("onPlayStart")
            } else c()
        },
        next: function (a) {
            var d = b.current;
            d && (p(a) || (a = d.direction.next), b.jumpto(d.index + 1, a, "next"))
        },
        prev: function (a) {
            var d = b.current;
            d && (p(a) || (a = d.direction.prev), b.jumpto(d.index - 1, a, "prev"))
        },
        jumpto: function (a, d, e) {
            var c = b.current;
            c && (a = l(a), b.direction = d || c.direction[a >= c.index ? "next" : "prev"], b.router = e || "jumpto", c.loop && (0 > a && (a = c.group.length + a % c.group.length), a %= c.group.length), c.group[a] !== r && (b.cancel(), b._start(a)))
        },
        reposition: function (a, d) {
            var e = b.current, c = e ? e.wrap : null, k;
            c && (k = b._getPosition(d), a && "scroll" === a.type ? (delete k.position, c.stop(!0, !0).animate(k, 200)) : (c.css(k), e.pos = f.extend({},
                e.dim, k)))
        },
        update: function (a) {
            var d = a && a.type, e = !d || "orientationchange" === d;
            e && (clearTimeout(w), w = null);
            b.isOpen && !w && (w = setTimeout(function () {
                var c = b.current;
                c && !b.isClosing && (b.wrap.removeClass("fancybox-tmp"), (e || "load" === d || "resize" === d && c.autoResize) && b._setDimension(), "scroll" === d && c.canShrink || b.reposition(a), b.trigger("onUpdate"), w = null)
            }, e && !s ? 0 : 300))
        },
        toggle: function (a) {
            b.isOpen && (b.current.fitToView = "boolean" === f.type(a) ? a : !b.current.fitToView, s && (b.wrap.removeAttr("style").addClass("fancybox-tmp"),
                b.trigger("onUpdate")), b.update())
        },
        hideLoading: function () {
            n.unbind(".loading");
            f("#fancybox-loading").remove()
        },
        showLoading: function () {
            var a, d;
            b.hideLoading();
            a = f('<div id="fancybox-loading"><div></div></div>').click(b.cancel).appendTo("body");
            n.bind("keydown.loading", function (a) {
                if (27 === (a.which || a.keyCode))a.preventDefault(), b.cancel()
            });
            b.defaults.fixed || (d = b.getViewport(), a.css({
                position: "absolute",
                top: 0.5 * d.h + d.y,
                left: 0.5 * d.w + d.x
            }))
        },
        getViewport: function () {
            var a = b.current && b.current.locked || !1, d = {x: q.scrollLeft(), y: q.scrollTop()};
            a ? (d.w = a[0].clientWidth, d.h = a[0].clientHeight) : (d.w = s && C.innerWidth ? C.innerWidth : q.width(), d.h = s && C.innerHeight ? C.innerHeight : q.height());
            return d
        },
        unbindEvents: function () {
            b.wrap && t(b.wrap) && b.wrap.unbind(".fb");
            n.unbind(".fb");
            q.unbind(".fb")
        },
        bindEvents: function () {
            var a = b.current, d;
            a && (q.bind("orientationchange.fb" + (s ? "" : " resize.fb") + (a.autoCenter && !a.locked ? " scroll.fb" : ""), b.update), (d = a.keys) && n.bind("keydown.fb", function (e) {
                var c = e.which || e.keyCode, k =
                    e.target || e.srcElement;
                if (27 === c && b.coming)return !1;
                !e.ctrlKey && (!e.altKey && !e.shiftKey && !e.metaKey && (!k || !k.type && !f(k).is("[contenteditable]"))) && f.each(d, function (d, k) {
                    if (1 < a.group.length && k[c] !== r)return b[d](k[c]), e.preventDefault(), !1;
                    if (-1 < f.inArray(c, k))return b[d](), e.preventDefault(), !1
                })
            }), f.fn.mousewheel && a.mouseWheel && b.wrap.bind("mousewheel.fb", function (d, c, k, g) {
                for (var h = f(d.target || null), j = !1; h.length && !j && !h.is(".fancybox-skin") && !h.is(".fancybox-wrap");)j = h[0] && !(h[0].style.overflow &&
                "hidden" === h[0].style.overflow) && (h[0].clientWidth && h[0].scrollWidth > h[0].clientWidth || h[0].clientHeight && h[0].scrollHeight > h[0].clientHeight), h = f(h).parent();
                if (0 !== c && !j && 1 < b.group.length && !a.canShrink) {
                    if (0 < g || 0 < k)b.prev(0 < g ? "down" : "left"); else if (0 > g || 0 > k)b.next(0 > g ? "up" : "right");
                    d.preventDefault()
                }
            }))
        },
        trigger: function (a, d) {
            var e, c = d || b.coming || b.current;
            if (c) {
                f.isFunction(c[a]) && (e = c[a].apply(c, Array.prototype.slice.call(arguments, 1)));
                if (!1 === e)return !1;
                c.helpers && f.each(c.helpers, function (d,
                                                         e) {
                    e && (b.helpers[d] && f.isFunction(b.helpers[d][a])) && (e = f.extend(!0, {}, b.helpers[d].defaults, e), b.helpers[d][a](e, c))
                });
                f.event.trigger(a + ".fb")
            }
        },
        isImage: function (a) {
            return p(a) && a.match(/(^data:image\/.*,)|(\.(jp(e|g|eg)|gif|png|bmp|webp)((\?|#).*)?$)/i)
        },
        isSWF: function (a) {
            return p(a) && a.match(/\.(swf)((\?|#).*)?$/i)
        },
        _start: function (a) {
            var d = {}, e, c;
            a = l(a);
            e = b.group[a] || null;
            if (!e)return !1;
            d = f.extend(!0, {}, b.opts, e);
            e = d.margin;
            c = d.padding;
            "number" === f.type(e) && (d.margin = [e, e, e, e]);
            "number" === f.type(c) &&
            (d.padding = [c, c, c, c]);
            d.modal && f.extend(!0, d, {
                closeBtn: !1,
                closeClick: !1,
                nextClick: !1,
                arrows: !1,
                mouseWheel: !1,
                keys: null,
                helpers: {overlay: {closeClick: !1}}
            });
            d.autoSize && (d.autoWidth = d.autoHeight = !0);
            "auto" === d.width && (d.autoWidth = !0);
            "auto" === d.height && (d.autoHeight = !0);
            d.group = b.group;
            d.index = a;
            b.coming = d;
            if (!1 === b.trigger("beforeLoad"))b.coming = null; else {
                c = d.type;
                e = d.href;
                if (!c)return b.coming = null, b.current && b.router && "jumpto" !== b.router ? (b.current.index = a, b[b.router](b.direction)) : !1;
                b.isActive = !0;
                if ("image" === c || "swf" === c)d.autoHeight = d.autoWidth = !1, d.scrolling = "visible";
                "image" === c && (d.aspectRatio = !0);
                "iframe" === c && s && (d.scrolling = "scroll");
                d.wrap = f(d.tpl.wrap).addClass("fancybox-" + (s ? "mobile" : "desktop") + " fancybox-type-" + c + " fancybox-tmp " + d.wrapCSS).appendTo(d.parent || "body");
                f.extend(d, {
                    skin: f(".fancybox-skin", d.wrap),
                    outer: f(".fancybox-outer", d.wrap),
                    inner: f(".fancybox-inner", d.wrap)
                });
                f.each(["Top", "Right", "Bottom", "Left"], function (a, b) {
                    d.skin.css("padding" + b, x(d.padding[a]))
                });
                b.trigger("onReady");
                if ("inline" === c || "html" === c) {
                    if (!d.content || !d.content.length)return b._error("content")
                } else if (!e)return b._error("href");
                "image" === c ? b._loadImage() : "ajax" === c ? b._loadAjax() : "iframe" === c ? b._loadIframe() : b._afterLoad()
            }
        },
        _error: function (a) {
            f.extend(b.coming, {
                type: "html",
                autoWidth: !0,
                autoHeight: !0,
                minWidth: 0,
                minHeight: 0,
                scrolling: "no",
                hasError: a,
                content: b.coming.tpl.error
            });
            b._afterLoad()
        },
        _loadImage: function () {
            var a = b.imgPreload = new Image;
            a.onload = function () {
                this.onload = this.onerror = null;
                b.coming.width =
                    this.width;
                b.coming.height = this.height;
                b._afterLoad()
            };
            a.onerror = function () {
                this.onload = this.onerror = null;
                b._error("image")
            };
            a.src = b.coming.href;
            !0 !== a.complete && b.showLoading()
        },
        _loadAjax: function () {
            var a = b.coming;
            b.showLoading();
            b.ajaxLoad = f.ajax(f.extend({}, a.ajax, {
                url: a.href, error: function (a, e) {
                    b.coming && "abort" !== e ? b._error("ajax", a) : b.hideLoading()
                }, success: function (d, e) {
                    "success" === e && (a.content = d, b._afterLoad())
                }
            }))
        },
        _loadIframe: function () {
            var a = b.coming, d = f(a.tpl.iframe.replace(/\{rnd\}/g,
                (new Date).getTime())).attr("scrolling", s ? "auto" : a.iframe.scrolling).attr("src", a.href);
            f(a.wrap).bind("onReset", function () {
                try {
                    f(this).find("iframe").hide().attr("src", "//about:blank").end().empty()
                } catch (a) {
                }
            });
            a.iframe.preload && (b.showLoading(), d.one("load", function () {
                f(this).data("ready", 1);
                s || f(this).bind("load.fb", b.update);
                f(this).parents(".fancybox-wrap").width("100%").removeClass("fancybox-tmp").show();
                b._afterLoad()
            }));
            a.content = d.appendTo(a.inner);
            a.iframe.preload || b._afterLoad()
        },
        _preloadImages: function () {
            var a =
                b.group, d = b.current, e = a.length, c = d.preload ? Math.min(d.preload, e - 1) : 0, f, g;
            for (g = 1; g <= c; g += 1)f = a[(d.index + g) % e], "image" === f.type && f.href && ((new Image).src = f.href)
        },
        _afterLoad: function () {
            var a = b.coming, d = b.current, e, c, k, g, h;
            b.hideLoading();
            if (a && !1 !== b.isActive)if (!1 === b.trigger("afterLoad", a, d))a.wrap.stop(!0).trigger("onReset").remove(), b.coming = null; else {
                d && (b.trigger("beforeChange", d), d.wrap.stop(!0).removeClass("fancybox-opened").find(".fancybox-item, .fancybox-nav").remove());
                b.unbindEvents();
                e = a.content;
                c = a.type;
                k = a.scrolling;
                f.extend(b, {wrap: a.wrap, skin: a.skin, outer: a.outer, inner: a.inner, current: a, previous: d});
                g = a.href;
                switch (c) {
                    case "inline":
                    case "ajax":
                    case "html":
                        a.selector ? e = f("<div>").html(e).find(a.selector) : t(e) && (e.data("fancybox-placeholder") || e.data("fancybox-placeholder", f('<div class="fancybox-placeholder"></div>').insertAfter(e).hide()), e = e.show().detach(), a.wrap.bind("onReset", function () {
                            f(this).find(e).length && e.hide().replaceAll(e.data("fancybox-placeholder")).data("fancybox-placeholder",
                                !1)
                        }));
                        break;
                    case "image":
                        e = a.tpl.image.replace("{href}", g);
                        break;
                    case "swf":
                        e = '<object id="fancybox-swf" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="100%" height="100%"><param name="movie" value="' + g + '"></param>', h = "", f.each(a.swf, function (a, b) {
                            e += '<param name="' + a + '" value="' + b + '"></param>';
                            h += " " + a + '="' + b + '"'
                        }), e += '<embed src="' + g + '" type="application/x-shockwave-flash" width="100%" height="100%"' + h + "></embed></object>"
                }
                (!t(e) || !e.parent().is(a.inner)) && a.inner.append(e);
                b.trigger("beforeShow");
                a.inner.css("overflow", "yes" === k ? "scroll" : "no" === k ? "hidden" : k);
                b._setDimension();
                b.reposition();
                b.isOpen = !1;
                b.coming = null;
                b.bindEvents();
                if (b.isOpened) {
                    if (d.prevMethod)b.transitions[d.prevMethod]()
                } else f(".fancybox-wrap").not(a.wrap).stop(!0).trigger("onReset").remove();
                b.transitions[b.isOpened ? a.nextMethod : a.openMethod]();
                b._preloadImages()
            }
        },
        _setDimension: function () {
            var a = b.getViewport(), d = 0, e = !1, c = !1, e = b.wrap, k = b.skin, g = b.inner, h = b.current, c = h.width, j = h.height, m = h.minWidth, u = h.minHeight, n = h.maxWidth,
                v = h.maxHeight, s = h.scrolling, q = h.scrollOutside ? h.scrollbarWidth : 0, y = h.margin, p = l(y[1] + y[3]), r = l(y[0] + y[2]), z, A, t, D, B, G, C, E, w;
            e.add(k).add(g).width("auto").height("auto").removeClass("fancybox-tmp");
            y = l(k.outerWidth(!0) - k.width());
            z = l(k.outerHeight(!0) - k.height());
            A = p + y;
            t = r + z;
            D = F(c) ? (a.w - A) * l(c) / 100 : c;
            B = F(j) ? (a.h - t) * l(j) / 100 : j;
            if ("iframe" === h.type) {
                if (w = h.content, h.autoHeight && 1 === w.data("ready"))try {
                    w[0].contentWindow.document.location && (g.width(D).height(9999), G = w.contents().find("body"), q && G.css("overflow-x",
                        "hidden"), B = G.height())
                } catch (H) {
                }
            } else if (h.autoWidth || h.autoHeight)g.addClass("fancybox-tmp"), h.autoWidth || g.width(D), h.autoHeight || g.height(B), h.autoWidth && (D = g.width()), h.autoHeight && (B = g.height()), g.removeClass("fancybox-tmp");
            c = l(D);
            j = l(B);
            E = D / B;
            m = l(F(m) ? l(m, "w") - A : m);
            n = l(F(n) ? l(n, "w") - A : n);
            u = l(F(u) ? l(u, "h") - t : u);
            v = l(F(v) ? l(v, "h") - t : v);
            G = n;
            C = v;
            h.fitToView && (n = Math.min(a.w - A, n), v = Math.min(a.h - t, v));
            A = a.w - p;
            r = a.h - r;
            h.aspectRatio ? (c > n && (c = n, j = l(c / E)), j > v && (j = v, c = l(j * E)), c < m && (c = m, j = l(c / E)), j < u &&
            (j = u, c = l(j * E))) : (c = Math.max(m, Math.min(c, n)), h.autoHeight && "iframe" !== h.type && (g.width(c), j = g.height()), j = Math.max(u, Math.min(j, v)));
            if (h.fitToView)if (g.width(c).height(j), e.width(c + y), a = e.width(), p = e.height(), h.aspectRatio)for (; (a > A || p > r) && (c > m && j > u) && !(19 < d++);)j = Math.max(u, Math.min(v, j - 10)), c = l(j * E), c < m && (c = m, j = l(c / E)), c > n && (c = n, j = l(c / E)), g.width(c).height(j), e.width(c + y), a = e.width(), p = e.height(); else c = Math.max(m, Math.min(c, c - (a - A))), j = Math.max(u, Math.min(j, j - (p - r)));
            q && ("auto" === s && j < B && c + y +
            q < A) && (c += q);
            g.width(c).height(j);
            e.width(c + y);
            a = e.width();
            p = e.height();
            e = (a > A || p > r) && c > m && j > u;
            c = h.aspectRatio ? c < G && j < C && c < D && j < B : (c < G || j < C) && (c < D || j < B);
            f.extend(h, {
                dim: {width: x(a), height: x(p)},
                origWidth: D,
                origHeight: B,
                canShrink: e,
                canExpand: c,
                wPadding: y,
                hPadding: z,
                wrapSpace: p - k.outerHeight(!0),
                skinSpace: k.height() - j
            });
            !w && (h.autoHeight && j > u && j < v && !c) && g.height("auto")
        },
        _getPosition: function (a) {
            var d = b.current, e = b.getViewport(), c = d.margin, f = b.wrap.width() + c[1] + c[3], g = b.wrap.height() + c[0] + c[2], c = {
                position: "absolute",
                top: c[0], left: c[3]
            };
            d.autoCenter && d.fixed && !a && g <= e.h && f <= e.w ? c.position = "fixed" : d.locked || (c.top += e.y, c.left += e.x);
            c.top = x(Math.max(c.top, c.top + (e.h - g) * d.topRatio));
            c.left = x(Math.max(c.left, c.left + (e.w - f) * d.leftRatio));
            return c
        },
        _afterZoomIn: function () {
            var a = b.current;
            a && (b.isOpen = b.isOpened = !0, b.wrap.css("overflow", "visible").addClass("fancybox-opened"), b.update(), (a.closeClick || a.nextClick && 1 < b.group.length) && b.inner.css("cursor", "pointer").bind("click.fb", function (d) {
                !f(d.target).is("a") && !f(d.target).parent().is("a") &&
                (d.preventDefault(), b[a.closeClick ? "close" : "next"]())
            }), a.closeBtn && f(a.tpl.closeBtn).appendTo(b.skin).bind("click.fb", function (a) {
                a.preventDefault();
                b.close()
            }), a.arrows && 1 < b.group.length && ((a.loop || 0 < a.index) && f(a.tpl.prev).appendTo(b.outer).bind("click.fb", b.prev), (a.loop || a.index < b.group.length - 1) && f(a.tpl.next).appendTo(b.outer).bind("click.fb", b.next)), b.trigger("afterShow"), !a.loop && a.index === a.group.length - 1 ? b.play(!1) : b.opts.autoPlay && !b.player.isActive && (b.opts.autoPlay = !1, b.play()))
        },
        _afterZoomOut: function (a) {
            a =
                a || b.current;
            f(".fancybox-wrap").trigger("onReset").remove();
            f.extend(b, {
                group: {},
                opts: {},
                router: !1,
                current: null,
                isActive: !1,
                isOpened: !1,
                isOpen: !1,
                isClosing: !1,
                wrap: null,
                skin: null,
                outer: null,
                inner: null
            });
            b.trigger("afterClose", a)
        }
    });
    b.transitions = {
        getOrigPosition: function () {
            var a = b.current, d = a.element, e = a.orig, c = {}, f = 50, g = 50, h = a.hPadding, j = a.wPadding, m = b.getViewport();
            !e && (a.isDom && d.is(":visible")) && (e = d.find("img:first"), e.length || (e = d));
            t(e) ? (c = e.offset(), e.is("img") && (f = e.outerWidth(), g = e.outerHeight())) :
                (c.top = m.y + (m.h - g) * a.topRatio, c.left = m.x + (m.w - f) * a.leftRatio);
            if ("fixed" === b.wrap.css("position") || a.locked)c.top -= m.y, c.left -= m.x;
            return c = {
                top: x(c.top - h * a.topRatio),
                left: x(c.left - j * a.leftRatio),
                width: x(f + j),
                height: x(g + h)
            }
        }, step: function (a, d) {
            var e, c, f = d.prop;
            c = b.current;
            var g = c.wrapSpace, h = c.skinSpace;
            if ("width" === f || "height" === f)e = d.end === d.start ? 1 : (a - d.start) / (d.end - d.start), b.isClosing && (e = 1 - e), c = "width" === f ? c.wPadding : c.hPadding, c = a - c, b.skin[f](l("width" === f ? c : c - g * e)), b.inner[f](l("width" ===
            f ? c : c - g * e - h * e))
        }, zoomIn: function () {
            var a = b.current, d = a.pos, e = a.openEffect, c = "elastic" === e, k = f.extend({opacity: 1}, d);
            delete k.position;
            c ? (d = this.getOrigPosition(), a.openOpacity && (d.opacity = 0.1)) : "fade" === e && (d.opacity = 0.1);
            b.wrap.css(d).animate(k, {
                duration: "none" === e ? 0 : a.openSpeed,
                easing: a.openEasing,
                step: c ? this.step : null,
                complete: b._afterZoomIn
            })
        }, zoomOut: function () {
            var a = b.current, d = a.closeEffect, e = "elastic" === d, c = {opacity: 0.1};
            e && (c = this.getOrigPosition(), a.closeOpacity && (c.opacity = 0.1));
            b.wrap.animate(c,
                {
                    duration: "none" === d ? 0 : a.closeSpeed,
                    easing: a.closeEasing,
                    step: e ? this.step : null,
                    complete: b._afterZoomOut
                })
        }, changeIn: function () {
            var a = b.current, d = a.nextEffect, e = a.pos, c = {opacity: 1}, f = b.direction, g;
            e.opacity = 0.1;
            "elastic" === d && (g = "down" === f || "up" === f ? "top" : "left", "down" === f || "right" === f ? (e[g] = x(l(e[g]) - 200), c[g] = "+=200px") : (e[g] = x(l(e[g]) + 200), c[g] = "-=200px"));
            "none" === d ? b._afterZoomIn() : b.wrap.css(e).animate(c, {
                duration: a.nextSpeed,
                easing: a.nextEasing,
                complete: b._afterZoomIn
            })
        }, changeOut: function () {
            var a =
                b.previous, d = a.prevEffect, e = {opacity: 0.1}, c = b.direction;
            "elastic" === d && (e["down" === c || "up" === c ? "top" : "left"] = ("up" === c || "left" === c ? "-" : "+") + "=200px");
            a.wrap.animate(e, {
                duration: "none" === d ? 0 : a.prevSpeed, easing: a.prevEasing, complete: function () {
                    f(this).trigger("onReset").remove()
                }
            })
        }
    };
    b.helpers.overlay = {
        defaults: {closeClick: !0, speedOut: 200, showEarly: !0, css: {}, locked: !s, fixed: !0},
        overlay: null,
        fixed: !1,
        create: function (a) {
            a = f.extend({}, this.defaults, a);
            this.overlay && this.close();
            this.overlay = f('<div class="fancybox-overlay"></div>').appendTo("body");
            this.fixed = !1;
            a.fixed && b.defaults.fixed && (this.overlay.addClass("fancybox-overlay-fixed"), this.fixed = !0)
        },
        open: function (a) {
            var d = this;
            a = f.extend({}, this.defaults, a);
            this.overlay ? this.overlay.unbind(".overlay").width("auto").height("auto") : this.create(a);
            this.fixed || (q.bind("resize.overlay", f.proxy(this.update, this)), this.update());
            a.closeClick && this.overlay.bind("click.overlay", function (a) {
                f(a.target).hasClass("fancybox-overlay") && (b.isActive ? b.close() : d.close())
            });
            this.overlay.css(a.css).show()
        },
        close: function () {
            f(".fancybox-overlay").remove();
            q.unbind("resize.overlay");
            this.overlay = null;
            !1 !== this.margin && (f("body").css("margin-right", this.margin), this.margin = !1);
            this.el && this.el.removeClass("fancybox-lock")
        },
        update: function () {
            var a = "100%", b;
            this.overlay.width(a).height("100%");
            H ? (b = Math.max(z.documentElement.offsetWidth, z.body.offsetWidth), n.width() > b && (a = n.width())) : n.width() > q.width() && (a = n.width());
            this.overlay.width(a).height(n.height())
        },
        onReady: function (a, b) {
            f(".fancybox-overlay").stop(!0,
                !0);
            this.overlay || (this.margin = n.height() > q.height() || "scroll" === f("body").css("overflow-y") ? f("body").css("margin-right") : !1, this.el = z.all && !z.querySelector ? f("html") : f("body"), this.create(a));
            a.locked && this.fixed && (b.locked = this.overlay.append(b.wrap), b.fixed = !1);
            !0 === a.showEarly && this.beforeShow.apply(this, arguments)
        },
        beforeShow: function (a, b) {
            b.locked && (this.el.addClass("fancybox-lock"), !1 !== this.margin && f("body").css("margin-right", l(this.margin) + b.scrollbarWidth));
            this.open(a)
        },
        onUpdate: function () {
            this.fixed ||
            this.update()
        },
        afterClose: function (a) {
            this.overlay && !b.isActive && this.overlay.fadeOut(a.speedOut, f.proxy(this.close, this))
        }
    };
    b.helpers.title = {
        defaults: {type: "float", position: "bottom"}, beforeShow: function (a) {
            var d = b.current, e = d.title, c = a.type;
            f.isFunction(e) && (e = e.call(d.element, d));
            if (p(e) && "" !== f.trim(e)) {
                d = f('<div class="fancybox-title fancybox-title-' + c + '-wrap">' + e + "</div>");
                switch (c) {
                    case "inside":
                        c = b.skin;
                        break;
                    case "outside":
                        c = b.wrap;
                        break;
                    case "over":
                        c = b.inner;
                        break;
                    default:
                        c = b.skin, d.appendTo("body"),
                        H && d.width(d.width()), d.wrapInner('<span class="child"></span>'), b.current.margin[2] += Math.abs(l(d.css("margin-bottom")))
                }
                d["top" === a.position ? "prependTo" : "appendTo"](c)
            }
        }
    };
    f.fn.fancybox = function (a) {
        var d, e = f(this), c = this.selector || "", k = function (g) {
            var h = f(this).blur(), j = d, k, l;
            !g.ctrlKey && (!g.altKey && !g.shiftKey && !g.metaKey) && !h.is(".fancybox-wrap") && (k = a.groupAttr || "data-fancybox-group", l = h.attr(k), l || (k = "rel", l = h.get(0)[k]), l && ("" !== l && "nofollow" !== l) && (h = c.length ? f(c) : e, h = h.filter("[" + k + '="' + l +
            '"]'), j = h.index(this)), a.index = j, !1 !== b.open(h, a) && g.preventDefault())
        };
        a = a || {};
        d = a.index || 0;
        !c || !1 === a.live ? e.unbind("click.fb-start").bind("click.fb-start", k) : n.undelegate(c, "click.fb-start").delegate(c + ":not('.fancybox-item, .fancybox-nav')", "click.fb-start", k);
        this.filter("[data-fancybox-start=1]").trigger("click");
        return this
    };
    n.ready(function () {
        f.scrollbarWidth === r && (f.scrollbarWidth = function () {
            var a = f('<div style="width:50px;height:50px;overflow:auto"><div/></div>').appendTo("body"), b = a.children(),
                b = b.innerWidth() - b.height(99).innerWidth();
            a.remove();
            return b
        });
        if (f.support.fixedPosition === r) {
            var a = f.support, d = f('<div style="position:fixed;top:20px;"></div>').appendTo("body"), e = 20 === d[0].offsetTop || 15 === d[0].offsetTop;
            d.remove();
            a.fixedPosition = e
        }
        f.extend(b.defaults, {scrollbarWidth: f.scrollbarWidth(), fixed: f.support.fixedPosition, parent: f("body")})
    })
})(window, document, jQuery);


/* #jQuery appear
 ================================================== */
(function (e) {
    e.fn.appear = function (t, n) {
        var r = e.extend({data: undefined, one: true, accX: 0, accY: 0}, n);
        return this.each(function () {
            var n = e(this);
            n.appeared = false;
            if (!t) {
                n.trigger("appear", r.data);
                return
            }
            var i = e(window);
            var s = function () {
                if (!n.is(":visible")) {
                    n.appeared = false;
                    return
                }
                var e = i.scrollLeft();
                var t = i.scrollTop();
                var s = n.offset();
                var o = s.left;
                var u = s.top;
                var a = r.accX;
                var f = r.accY;
                var l = n.height();
                var c = i.height();
                var h = n.width();
                var p = i.width();
                if (u + l + f >= t && u <= t + c + f && o + h + a >= e && o <= e + p + a) {
                    if (!n.appeared)n.trigger("appear", r.data)
                } else {
                    n.appeared = false
                }
            };
            var o = function () {
                n.appeared = true;
                if (r.one) {
                    i.unbind("scroll", s);
                    var o = e.inArray(s, e.fn.appear.checks);
                    if (o >= 0)e.fn.appear.checks.splice(o, 1)
                }
                t.apply(this, arguments)
            };
            if (r.one)n.one("appear", r.data, o); else n.bind("appear", r.data, o);
            i.scroll(s);
            e.fn.appear.checks.push(s);
            s()
        })
    };
    e.extend(e.fn.appear, {
        checks: [], timeout: null, checkAll: function () {
            var t = e.fn.appear.checks.length;
            if (t > 0)while (t--)e.fn.appear.checks[t]()
        }, run: function () {
            if (e.fn.appear.timeout)clearTimeout(e.fn.appear.timeout);
            e.fn.appear.timeout = setTimeout(e.fn.appear.checkAll, 20)
        }
    });
    e.each(["append", "prepend", "after", "before", "attr", "removeAttr", "addClass", "removeClass", "toggleClass", "remove", "css", "show", "hide"], function (t, n) {
        var r = e.fn[n];
        if (r) {
            e.fn[n] = function () {
                var t = r.apply(this, arguments);
                e.fn.appear.run();
                return t
            }
        }
    })
})(jQuery);


/* #jQuery Timer
 ================================================== */
jQuery.fn.extend({
    everyTime: function (a, b, c, d) {
        return this.each(function () {
            jQuery.timer.add(this, a, b, c, d)
        })
    }, oneTime: function (a, b, c) {
        return this.each(function () {
            jQuery.timer.add(this, a, b, c, 1)
        })
    }, stopTime: function (a, b) {
        return this.each(function () {
            jQuery.timer.remove(this, a, b)
        })
    }
});
jQuery.extend({
    timer: {
        global: [],
        guid: 1,
        dataKey: "jQuery.timer",
        regex: /^([0-9]+(?:\.[0-9]*)?)\s*(.*s)?$/,
        powers: {ms: 1, cs: 10, ds: 100, s: 1000, das: 10000, hs: 100000, ks: 1000000},
        timeParse: function (c) {
            if (c == undefined || c == null) {
                return null
            }
            var a = this.regex.exec(jQuery.trim(c.toString()));
            if (a[2]) {
                var b = parseFloat(a[1]);
                var d = this.powers[a[2]] || 1;
                return b * d
            } else {
                return c
            }
        },
        add: function (d, b, c, f, h) {
            var a = 0;
            if (jQuery.isFunction(c)) {
                if (!h) {
                    h = f
                }
                f = c;
                c = b
            }
            b = jQuery.timer.timeParse(b);
            if (typeof b != "number" || isNaN(b) || b < 0) {
                return
            }
            if (typeof h != "number" || isNaN(h) || h < 0) {
                h = 0
            }
            h = h || 0;
            var g = jQuery.data(d, this.dataKey) || jQuery.data(d, this.dataKey, {});
            if (!g[c]) {
                g[c] = {}
            }
            f.timerID = f.timerID || this.guid++;
            var e = function () {
                if ((++a > h && h !== 0) || f.call(d, a) === false) {
                    jQuery.timer.remove(d, c, f)
                }
            };
            e.timerID = f.timerID;
            if (!g[c][f.timerID]) {
                g[c][f.timerID] = window.setInterval(e, b)
            }
            this.global.push(d)
        },
        remove: function (c, b, d) {
            var e = jQuery.data(c, this.dataKey), a;
            if (e) {
                if (!b) {
                    for (b in e) {
                        this.remove(c, b, d)
                    }
                } else {
                    if (e[b]) {
                        if (d) {
                            if (d.timerID) {
                                window.clearInterval(e[b][d.timerID]);
                                delete e[b][d.timerID]
                            }
                        } else {
                            for (var d in e[b]) {
                                window.clearInterval(e[b][d]);
                                delete e[b][d]
                            }
                        }
                        for (a in e[b]) {
                            break
                        }
                        if (!a) {
                            a = null;
                            delete e[b]
                        }
                    }
                }
                for (a in e) {
                    break
                }
                if (!a) {
                    jQuery.removeData(c, this.dataKey)
                }
            }
        }
    }
});
jQuery(window).bind("unload", function () {
    jQuery.each(jQuery.timer.global, function (a, b) {
        jQuery.timer.remove(b)
    })
});

/* #jQuery jGrowl
 ================================================== */
(function (e) {
    var t = function () {
        return !1 === e.support.boxModel && e.support.objectAll && e.support.leadingWhitespace
    }();
    e.jGrowl = function (t, i) {
        0 == e("#jGrowl").size() && e('<div id="jGrowl"></div>').addClass(i && i.position ? i.position : e.jGrowl.defaults.position).appendTo("body"), e("#jGrowl").jGrowl(t, i)
    }, e.fn.jGrowl = function (t, i) {
        if (e.isFunction(this.each)) {
            var o = arguments;
            return this.each(function () {
                void 0 == e(this).data("jGrowl.instance") && (e(this).data("jGrowl.instance", e.extend(new e.fn.jGrowl, {
                    notifications: [],
                    element: null,
                    interval: null
                })), e(this).data("jGrowl.instance").startup(this)), e.isFunction(e(this).data("jGrowl.instance")[t]) ? e(this).data("jGrowl.instance")[t].apply(e(this).data("jGrowl.instance"), e.makeArray(o).slice(1)) : e(this).data("jGrowl.instance").create(t, i)
            })
        }
    }, e.extend(e.fn.jGrowl.prototype, {
        defaults: {
            pool: 0,
            header: "",
            group: "",
            sticky: !1,
            position: "top-right",
            glue: "after",
            theme: "default",
            themeState: "highlight",
            corners: "10px",
            check: 250,
            life: 3e3,
            closeDuration: "normal",
            openDuration: "normal",
            easing: "swing",
            closer: !0,
            closeTemplate: "<i class='fa fa-times'></i>",
            closerTemplate: "<div>[ close all ]</div>",
            log: function () {
            },
            beforeOpen: function () {
            },
            afterOpen: function () {
            },
            open: function () {
            },
            beforeClose: function () {
            },
            close: function () {
            },
            animateOpen: {opacity: "show"},
            animateClose: {opacity: "hide"}
        }, notifications: [], element: null, interval: null, create: function (t, i) {
            var i = e.extend({}, this.defaults, i);
            i.speed !== void 0 && (i.openDuration = i.speed, i.closeDuration = i.speed), this.notifications.push({
                message: t,
                options: i
            }), i.log.apply(this.element, [this.element, t, i])
        }, render: function (t) {
            var i = this, o = t.message, n = t.options;
            n.themeState = "" == n.themeState ? "" : "ui-state-" + n.themeState;
            var t = e("<div/>").addClass("jGrowl-notification " + n.themeState + " ui-corner-all" + (void 0 != n.group && "" != n.group ? " " + n.group : "")).append(e("<div/>").addClass("jGrowl-close").attr("title", "Close").html(n.closeTemplate)).append(e("<div/>").addClass("jGrowl-header").html(n.header)).append(e("<div/>").addClass("jGrowl-message").html(o)).data("jGrowl", n).addClass(n.theme).children("div.jGrowl-close").bind("click.jGrowl", function () {
                e(this).parent().trigger("jGrowl.beforeClose")
            }).parent();
            e(t).bind("mouseover.jGrowl", function () {
                e("div.jGrowl-notification", i.element).data("jGrowl.pause", !0)
            }).bind("mouseout.jGrowl", function () {
                e("div.jGrowl-notification", i.element).data("jGrowl.pause", !1)
            }).bind("jGrowl.beforeOpen", function () {
                n.beforeOpen.apply(t, [t, o, n, i.element]) !== !1 && e(this).trigger("jGrowl.open")
            }).bind("jGrowl.open", function () {
                n.open.apply(t, [t, o, n, i.element]) !== !1 && ("after" == n.glue ? e("div.jGrowl-notification:last", i.element).after(t) : e("div.jGrowl-notification:first", i.element).before(t), e(this).animate(n.animateOpen, n.openDuration, n.easing, function () {
                    e.support.opacity === !1 && this.style.removeAttribute("filter"), null !== e(this).data("jGrowl") && (e(this).data("jGrowl").created = new Date), e(this).trigger("jGrowl.afterOpen")
                }))
            }).bind("jGrowl.afterOpen", function () {
                n.afterOpen.apply(t, [t, o, n, i.element])
            }).bind("jGrowl.beforeClose", function () {
                n.beforeClose.apply(t, [t, o, n, i.element]) !== !1 && e(this).trigger("jGrowl.close")
            }).bind("jGrowl.close", function () {
                e(this).data("jGrowl.pause", !0), e(this).animate(n.animateClose, n.closeDuration, n.easing, function () {
                    e.isFunction(n.close) ? n.close.apply(t, [t, o, n, i.element]) !== !1 && e(this).remove() : e(this).remove()
                })
            }).trigger("jGrowl.beforeOpen"), "" != n.corners && void 0 != e.fn.corner && e(t).corner(n.corners), e("div.jGrowl-notification:parent", i.element).size() > 1 && 0 == e("div.jGrowl-closer", i.element).size() && this.defaults.closer !== !1 && e(this.defaults.closerTemplate).addClass("jGrowl-closer " + this.defaults.themeState + " ui-corner-all").addClass(this.defaults.theme).appendTo(i.element).animate(this.defaults.animateOpen, this.defaults.speed, this.defaults.easing).bind("click.jGrowl", function () {
                e(this).siblings().trigger("jGrowl.beforeClose"), e.isFunction(i.defaults.closer) && i.defaults.closer.apply(e(this).parent()[0], [e(this).parent()[0]])
            })
        }, update: function () {
            e(this.element).find("div.jGrowl-notification:parent").each(function () {
                void 0 != e(this).data("jGrowl") && void 0 !== e(this).data("jGrowl").created && e(this).data("jGrowl").created.getTime() + parseInt(e(this).data("jGrowl").life) < (new Date).getTime() && e(this).data("jGrowl").sticky !== !0 && (void 0 == e(this).data("jGrowl.pause") || e(this).data("jGrowl.pause") !== !0) && e(this).trigger("jGrowl.beforeClose")
            }), this.notifications.length > 0 && (0 == this.defaults.pool || e(this.element).find("div.jGrowl-notification:parent").size() < this.defaults.pool) && this.render(this.notifications.shift()), 2 > e(this.element).find("div.jGrowl-notification:parent").size() && e(this.element).find("div.jGrowl-closer").animate(this.defaults.animateClose, this.defaults.speed, this.defaults.easing, function () {
                e(this).remove()
            })
        }, startup: function (i) {
            this.element = e(i).addClass("jGrowl").append('<div class="jGrowl-notification"></div>'), this.interval = setInterval(function () {
                e(i).data("jGrowl.instance").update()
            }, parseInt(this.defaults.check)), t && e(this.element).addClass("ie6")
        }, shutdown: function () {
            e(this.element).removeClass("jGrowl").find("div.jGrowl-notification").trigger("jGrowl.close").parent().empty(), clearInterval(this.interval)
        }, close: function () {
            e(this.element).find("div.jGrowl-notification").each(function () {
                e(this).trigger("jGrowl.beforeClose")
            })
        }
    }), e.jGrowl.defaults = e.fn.jGrowl.prototype.defaults
})(jQuery);

/* #jQuery Animate From To plugin 1.0
 ================================================== */
(function (b) {
    b.fn.animate_from_to = function (d, c) {
        return this.each(function () {
            a(this, d, c)
        })
    };
    b.extend({animate_from_to: a});
    function a(d, k, p) {
        var c = b(d).eq(0), i = b(k).eq(0);
        var f = {
            pixels_per_second: 1000,
            initial_css: {
                background: "#dddddd",
                opacity: 0.8,
                position: "absolute",
                top: c.offset().top,
                left: c.offset().left,
                height: c.height(),
                width: c.width(),
                "z-index": 100000,
                image: ""
            },
            square: "",
            callback: function () {
                return
            }
        };
        if (p && p.initial_css) {
            p.initial_css = b.extend({}, f.initial_css, p.initial_css)
        }
        p = b.extend({}, f, p);
        var m = i.innerHeight(), j = i.innerWidth();
        if (p.square.toLowerCase() == "height") {
            j = m
        } else {
            if (p.square.toLowerCase() == "width") {
                m = j
            }
        }
        var g = "";
        if (p.initial_css.image != "") {
            g = "<img src='" + p.initial_css.image + "' style='width: 100%; height: 100%' />"
        }
        var n = c.offset().top + c.width() / 2 - i.offset().top, o = c.offset().left + c.height() / 2 - i.offset().left, h = Math.floor(Math.sqrt(Math.pow(o, 2) + Math.pow(n, 2))), e = (h / p.pixels_per_second) * 1000, l = b("<div>" + g + "</div>").css(p.initial_css).appendTo("body").animate({
            top: i.offset().top,
            left: i.offset().left,
            height: m,
            width: j
        }, {duration: e}).animate({opacity: 0}, {
            duration: 100, complete: function () {
                l.remove();
                return p.callback()
            }
        })
    }
})(jQuery);


/* #jQuery elevateZoom 3.0.3
 ================================================== */
"function" !== typeof Object.create && (Object.create = function (d) {
    function h() {
    }

    h.prototype = d;
    return new h
});
(function (d, h, l, m) {
    var k = {
        init: function (b, a) {
            var c = this;
            c.elem = a;
            c.$elem = d(a);
            c.imageSrc = c.$elem.data("zoom-image") ? c.$elem.data("zoom-image") : c.$elem.attr("src");
            c.options = d.extend({}, d.fn.elevateZoom.options, b);
            c.options.tint && (c.options.lensColour = "none", c.options.lensOpacity = "1");
            "inner" == c.options.zoomType && (c.options.showLens = !1);
            c.$elem.parent().removeAttr("title").removeAttr("alt");
            c.zoomImage = c.imageSrc;
            c.refresh(1);
            d("#" + c.options.gallery + " a").click(function (a) {
                c.options.galleryActiveClass &&
                (d("#" + c.options.gallery + " a").removeClass(c.options.galleryActiveClass), d(this).addClass(c.options.galleryActiveClass));
                a.preventDefault();
                d(this).data("zoom-image") ? c.zoomImagePre = d(this).data("zoom-image") : c.zoomImagePre = d(this).data("image");
                c.swaptheimage(d(this).data("image"), c.zoomImagePre);
                return !1
            })
        }, refresh: function (b) {
            var a = this;
            setTimeout(function () {
                a.fetch(a.imageSrc)
            }, b || a.options.refresh)
        }, fetch: function (b) {
            var a = this, c = new Image;
            c.onload = function () {
                a.largeWidth = c.width;
                a.largeHeight =
                    c.height;
                a.startZoom();
                a.currentImage = a.imageSrc;
                a.options.onZoomedImageLoaded(a.$elem)
            };
            c.src = b
        }, startZoom: function () {
            var b = this;
            b.nzWidth = b.$elem.width();
            b.nzHeight = b.$elem.height();
            b.isWindowActive = !1;
            b.isLensActive = !1;
            b.isTintActive = !1;
            b.overWindow = !1;
            b.options.imageCrossfade && (b.zoomWrap = b.$elem.wrap('<div style="height:' + b.nzHeight + "px;width:" + b.nzWidth + 'px;" class="zoomWrapper" />'), b.$elem.css("position", "absolute"));
            b.zoomLock = 1;
            b.scrollingLock = !1;
            b.changeBgSize = !1;
            b.currentZoomLevel = b.options.zoomLevel;
            b.nzOffset = b.$elem.offset();
            b.widthRatio = b.largeWidth / b.currentZoomLevel / b.nzWidth;
            b.heightRatio = b.largeHeight / b.currentZoomLevel / b.nzHeight;
            "window" == b.options.zoomType && (b.zoomWindowStyle = "overflow: hidden;background-position: 0px 0px;text-align:center;background-color: " + String(b.options.zoomWindowBgColour) + ";width: " + String(b.options.zoomWindowWidth) + "px;height: " + String(b.options.zoomWindowHeight) + "px;float: left;background-size: " + b.largeWidth / b.currentZoomLevel + "px " + b.largeHeight / b.currentZoomLevel +
            "px;display: none;z-index:100px;border: " + String(b.options.borderSize) + "px solid " + b.options.borderColour + ";background-repeat: no-repeat;position: absolute;");
            "inner" == b.options.zoomType && (b.zoomWindowStyle = "overflow: hidden;background-position: 0px 0px;width: " + String(b.nzWidth) + "px;height: " + String(b.nzHeight) + "px;float: left;display: none;cursor:" + b.options.cursor + ";px solid " + b.options.borderColour + ";background-repeat: no-repeat;position: absolute;");
            "window" == b.options.zoomType && (lensHeight =
                b.nzHeight < b.options.zoomWindowWidth / b.widthRatio ? b.nzHeight : String(b.options.zoomWindowHeight / b.heightRatio), lensWidth = b.largeWidth < b.options.zoomWindowWidth ? b.nzWidth : b.options.zoomWindowWidth / b.widthRatio, b.lensStyle = "background-position: 0px 0px;width: " + String(b.options.zoomWindowWidth / b.widthRatio) + "px;height: " + String(b.options.zoomWindowHeight / b.heightRatio) + "px;float: right;display: none;overflow: hidden;z-index: 999;-webkit-transform: translateZ(0);opacity:" + b.options.lensOpacity + ";filter: alpha(opacity = " +
            100 * b.options.lensOpacity + "); zoom:1;width:" + lensWidth + "px;height:" + lensHeight + "px;background-color:" + b.options.lensColour + ";cursor:" + b.options.cursor + ";border: " + b.options.lensBorderSize + "px solid " + b.options.lensBorderColour + ";background-repeat: no-repeat;position: absolute;");
            b.tintStyle = "display: block;position: absolute;background-color: " + b.options.tintColour + ";filter:alpha(opacity=0);opacity: 0;width: " + b.nzWidth + "px;height: " + b.nzHeight + "px;";
            b.lensRound = "";
            "lens" == b.options.zoomType && (b.lensStyle =
                "background-position: 0px 0px;float: left;display: none;border: " + String(b.options.borderSize) + "px solid " + b.options.borderColour + ";width:" + String(b.options.lensSize) + "px;height:" + String(b.options.lensSize) + "px;background-repeat: no-repeat;position: absolute;");
            "round" == b.options.lensShape && (b.lensRound = "border-top-left-radius: " + String(b.options.lensSize / 2 + b.options.borderSize) + "px;border-top-right-radius: " + String(b.options.lensSize / 2 + b.options.borderSize) + "px;border-bottom-left-radius: " + String(b.options.lensSize /
            2 + b.options.borderSize) + "px;border-bottom-right-radius: " + String(b.options.lensSize / 2 + b.options.borderSize) + "px;");
            b.zoomContainer = d('<div class="zoomContainer" style="-webkit-transform: translateZ(0);position:absolute;left:' + b.nzOffset.left + "px;top:" + b.nzOffset.top + "px;height:" + b.nzHeight + "px;width:" + b.nzWidth + 'px;"></div>');
            d("body").append(b.zoomContainer);
            b.options.containLensZoom && "lens" == b.options.zoomType && b.zoomContainer.css("overflow", "hidden");
            "inner" != b.options.zoomType && (b.zoomLens = d("<div class='zoomLens' style='" +
            b.lensStyle + b.lensRound + "'>&nbsp;</div>").appendTo(b.zoomContainer).click(function () {
                b.$elem.trigger("click")
            }));
            b.options.tint && (b.tintContainer = d("<div/>").addClass("tintContainer"), b.zoomTint = d("<div class='zoomTint' style='" + b.tintStyle + "'></div>"), b.zoomLens.wrap(b.tintContainer), b.zoomTintcss = b.zoomLens.after(b.zoomTint), b.zoomTintImage = d('<img style="position: absolute; left: 0px; top: 0px; max-width: none; width: ' + b.nzWidth + "px; height: " + b.nzHeight + 'px;" src="' + b.imageSrc + '">').appendTo(b.zoomLens).click(function () {
                b.$elem.trigger("click")
            }));
            isNaN(b.options.zoomWindowPosition) ? b.zoomWindow = d("<div style='z-index:999;left:" + b.windowOffsetLeft + "px;top:" + b.windowOffsetTop + "px;" + b.zoomWindowStyle + "' class='zoomWindow'>&nbsp;</div>").appendTo("body").click(function () {
                b.$elem.trigger("click")
            }) : b.zoomWindow = d("<div style='z-index:999;left:" + b.windowOffsetLeft + "px;top:" + b.windowOffsetTop + "px;" + b.zoomWindowStyle + "' class='zoomWindow'>&nbsp;</div>").appendTo(b.zoomContainer).click(function () {
                b.$elem.trigger("click")
            });
            b.zoomWindowContainer = d("<div/>").addClass("zoomWindowContainer").css("width",
                b.options.zoomWindowWidth);
            b.zoomWindow.wrap(b.zoomWindowContainer);
            "lens" == b.options.zoomType && b.zoomLens.css({backgroundImage: "url('" + b.imageSrc + "')"});
            "window" == b.options.zoomType && b.zoomWindow.css({backgroundImage: "url('" + b.imageSrc + "')"});
            "inner" == b.options.zoomType && b.zoomWindow.css({backgroundImage: "url('" + b.imageSrc + "')"});
            b.$elem.bind("touchmove", function (a) {
                a.preventDefault();
                b.setPosition(a.originalEvent.touches[0] || a.originalEvent.changedTouches[0])
            });
            b.zoomContainer.bind("touchmove",
                function (a) {
                    "inner" == b.options.zoomType && b.showHideWindow("show");
                    a.preventDefault();
                    b.setPosition(a.originalEvent.touches[0] || a.originalEvent.changedTouches[0])
                });
            b.zoomContainer.bind("touchend", function (a) {
                b.showHideWindow("hide");
                b.options.showLens && b.showHideLens("hide");
                b.options.tint && b.showHideTint("hide")
            });
            b.$elem.bind("touchend", function (a) {
                b.showHideWindow("hide");
                b.options.showLens && b.showHideLens("hide");
                b.options.tint && b.showHideTint("hide")
            });
            b.options.showLens && (b.zoomLens.bind("touchmove",
                function (a) {
                    a.preventDefault();
                    b.setPosition(a.originalEvent.touches[0] || a.originalEvent.changedTouches[0])
                }), b.zoomLens.bind("touchend", function (a) {
                b.showHideWindow("hide");
                b.options.showLens && b.showHideLens("hide");
                b.options.tint && b.showHideTint("hide")
            }));
            b.$elem.bind("mousemove", function (a) {
                !1 == b.overWindow && b.setElements("show");
                if (b.lastX !== a.clientX || b.lastY !== a.clientY)b.setPosition(a), b.currentLoc = a;
                b.lastX = a.clientX;
                b.lastY = a.clientY
            });
            b.zoomContainer.bind("mousemove", function (a) {
                !1 == b.overWindow &&
                b.setElements("show");
                if (b.lastX !== a.clientX || b.lastY !== a.clientY)b.setPosition(a), b.currentLoc = a;
                b.lastX = a.clientX;
                b.lastY = a.clientY
            });
            "inner" != b.options.zoomType && b.zoomLens.bind("mousemove", function (a) {
                if (b.lastX !== a.clientX || b.lastY !== a.clientY)b.setPosition(a), b.currentLoc = a;
                b.lastX = a.clientX;
                b.lastY = a.clientY
            });
            b.options.tint && b.zoomTint.bind("mousemove", function (a) {
                if (b.lastX !== a.clientX || b.lastY !== a.clientY)b.setPosition(a), b.currentLoc = a;
                b.lastX = a.clientX;
                b.lastY = a.clientY
            });
            "inner" == b.options.zoomType &&
            b.zoomWindow.bind("mousemove", function (a) {
                if (b.lastX !== a.clientX || b.lastY !== a.clientY)b.setPosition(a), b.currentLoc = a;
                b.lastX = a.clientX;
                b.lastY = a.clientY
            });
            b.zoomContainer.add(b.$elem).mouseenter(function () {
                !1 == b.overWindow && b.setElements("show")
            }).mouseleave(function () {
                b.scrollLock || b.setElements("hide")
            });
            "inner" != b.options.zoomType && b.zoomWindow.mouseenter(function () {
                b.overWindow = !0;
                b.setElements("hide")
            }).mouseleave(function () {
                b.overWindow = !1
            });
            1 != b.options.zoomLevel && b.changeZoomLevel(b.currentZoomLevel);
            b.minZoomLevel = b.options.minZoomLevel ? b.options.minZoomLevel : 2 * b.options.scrollZoomIncrement;
            b.options.scrollZoom && b.zoomContainer.add(b.$elem).bind("mousewheel DOMMouseScroll MozMousePixelScroll", function (a) {
                b.scrollLock = !0;
                clearTimeout(d.data(this, "timer"));
                d.data(this, "timer", setTimeout(function () {
                    b.scrollLock = !1
                }, 250));
                var c = a.originalEvent.wheelDelta || -1 * a.originalEvent.detail;
                a.stopImmediatePropagation();
                a.stopPropagation();
                a.preventDefault();
                0 < c / 120 ? b.currentZoomLevel >= b.minZoomLevel && b.changeZoomLevel(b.currentZoomLevel -
                b.options.scrollZoomIncrement) : b.options.maxZoomLevel ? b.currentZoomLevel <= b.options.maxZoomLevel && b.changeZoomLevel(parseFloat(b.currentZoomLevel) + b.options.scrollZoomIncrement) : b.changeZoomLevel(parseFloat(b.currentZoomLevel) + b.options.scrollZoomIncrement);
                return !1
            })
        }, setElements: function (b) {
            "show" == b && this.isWindowSet && ("inner" == this.options.zoomType && this.showHideWindow("show"), "window" == this.options.zoomType && this.showHideWindow("show"), this.options.showLens && this.showHideLens("show"), this.options.tint &&
            this.showHideTint("show"));
            "hide" == b && ("window" == this.options.zoomType && this.showHideWindow("hide"), this.options.tint || this.showHideWindow("hide"), this.options.showLens && this.showHideLens("hide"), this.options.tint && this.showHideTint("hide"))
        }, setPosition: function (b) {
            this.nzHeight = this.$elem.height();
            this.nzWidth = this.$elem.width();
            this.nzOffset = this.$elem.offset();
            this.options.tint && (this.zoomTint.css({top: 0}), this.zoomTint.css({left: 0}));
            this.options.responsive && !this.options.scrollZoom && this.options.showLens &&
            (lensHeight = this.nzHeight < this.options.zoomWindowWidth / this.widthRatio ? this.nzHeight : String(this.options.zoomWindowHeight / this.heightRatio), lensWidth = this.largeWidth < this.options.zoomWindowWidth ? this.nzHWidth : this.options.zoomWindowWidth / this.widthRatio, this.widthRatio = this.largeWidth / this.nzWidth, this.heightRatio = this.largeHeight / this.nzHeight, "lens" != this.options.zoomType && this.zoomLens.css({
                width: String(this.options.zoomWindowWidth / this.widthRatio) + "px",
                height: String(this.options.zoomWindowHeight /
                this.heightRatio) + "px"
            }), "lens" == this.options.zoomType && this.zoomLens.css({
                width: String(this.options.lensSize) + "px",
                height: String(this.options.lensSize) + "px"
            }));
            this.zoomContainer.css({top: this.nzOffset.top});
            this.zoomContainer.css({left: this.nzOffset.left});
            this.mouseLeft = parseInt(b.pageX - this.nzOffset.left);
            this.mouseTop = parseInt(b.pageY - this.nzOffset.top);
            "window" == this.options.zoomType && (this.Etoppos = this.mouseTop < this.zoomLens.height() / 2, this.Eboppos = this.mouseTop > this.nzHeight - this.zoomLens.height() /
            2 - 2 * this.options.lensBorderSize, this.Eloppos = this.mouseLeft < 0 + this.zoomLens.width() / 2, this.Eroppos = this.mouseLeft > this.nzWidth - this.zoomLens.width() / 2 - 2 * this.options.lensBorderSize);
            "inner" == this.options.zoomType && (this.Etoppos = this.mouseTop < this.nzHeight / 2 / this.heightRatio, this.Eboppos = this.mouseTop > this.nzHeight - this.nzHeight / 2 / this.heightRatio, this.Eloppos = this.mouseLeft < 0 + this.nzWidth / 2 / this.widthRatio, this.Eroppos = this.mouseLeft > this.nzWidth - this.nzWidth / 2 / this.widthRatio - 2 * this.options.lensBorderSize);
            0 >= this.mouseLeft || 0 > this.mouseTop || this.mouseLeft > this.nzWidth || this.mouseTop > this.nzHeight ? this.setElements("hide") : (this.options.showLens && (this.lensLeftPos = String(this.mouseLeft - this.zoomLens.width() / 2), this.lensTopPos = String(this.mouseTop - this.zoomLens.height() / 2)), this.Etoppos && (this.lensTopPos = 0), this.Eloppos && (this.tintpos = this.lensLeftPos = this.windowLeftPos = 0), "window" == this.options.zoomType && (this.Eboppos && (this.lensTopPos = Math.max(this.nzHeight - this.zoomLens.height() - 2 * this.options.lensBorderSize,
                0)), this.Eroppos && (this.lensLeftPos = this.nzWidth - this.zoomLens.width() - 2 * this.options.lensBorderSize)), "inner" == this.options.zoomType && (this.Eboppos && (this.lensTopPos = Math.max(this.nzHeight - 2 * this.options.lensBorderSize, 0)), this.Eroppos && (this.lensLeftPos = this.nzWidth - this.nzWidth - 2 * this.options.lensBorderSize)), "lens" == this.options.zoomType && (this.windowLeftPos = String(-1 * ((b.pageX - this.nzOffset.left) * this.widthRatio - this.zoomLens.width() / 2)), this.windowTopPos = String(-1 * ((b.pageY - this.nzOffset.top) *
            this.heightRatio - this.zoomLens.height() / 2)), this.zoomLens.css({backgroundPosition: this.windowLeftPos + "px " + this.windowTopPos + "px"}), this.changeBgSize && (this.nzHeight > this.nzWidth ? ("lens" == this.options.zoomType && this.zoomLens.css({"background-size": this.largeWidth / this.newvalueheight + "px " + this.largeHeight / this.newvalueheight + "px"}), this.zoomWindow.css({"background-size": this.largeWidth / this.newvalueheight + "px " + this.largeHeight / this.newvalueheight + "px"})) : ("lens" == this.options.zoomType && this.zoomLens.css({
                "background-size": this.largeWidth /
                this.newvaluewidth + "px " + this.largeHeight / this.newvaluewidth + "px"
            }), this.zoomWindow.css({"background-size": this.largeWidth / this.newvaluewidth + "px " + this.largeHeight / this.newvaluewidth + "px"})), this.changeBgSize = !1), this.setWindowPostition(b)), this.options.tint && this.setTintPosition(b), "window" == this.options.zoomType && this.setWindowPostition(b), "inner" == this.options.zoomType && this.setWindowPostition(b), this.options.showLens && (this.fullwidth && "lens" != this.options.zoomType && (this.lensLeftPos = 0), this.zoomLens.css({
                left: this.lensLeftPos +
                "px", top: this.lensTopPos + "px"
            })))
        }, showHideWindow: function (b) {
            "show" != b || this.isWindowActive || (this.options.zoomWindowFadeIn ? this.zoomWindow.stop(!0, !0, !1).fadeIn(this.options.zoomWindowFadeIn) : this.zoomWindow.show(), this.isWindowActive = !0);
            "hide" == b && this.isWindowActive && (this.options.zoomWindowFadeOut ? this.zoomWindow.stop(!0, !0).fadeOut(this.options.zoomWindowFadeOut) : this.zoomWindow.hide(), this.isWindowActive = !1)
        }, showHideLens: function (b) {
            "show" != b || this.isLensActive || (this.options.lensFadeIn ?
                this.zoomLens.stop(!0, !0, !1).fadeIn(this.options.lensFadeIn) : this.zoomLens.show(), this.isLensActive = !0);
            "hide" == b && this.isLensActive && (this.options.lensFadeOut ? this.zoomLens.stop(!0, !0).fadeOut(this.options.lensFadeOut) : this.zoomLens.hide(), this.isLensActive = !1)
        }, showHideTint: function (b) {
            "show" != b || this.isTintActive || (this.options.zoomTintFadeIn ? this.zoomTint.css({opacity: this.options.tintOpacity}).animate().stop(!0, !0).fadeIn("slow") : (this.zoomTint.css({opacity: this.options.tintOpacity}).animate(),
                this.zoomTint.show()), this.isTintActive = !0);
            "hide" == b && this.isTintActive && (this.options.zoomTintFadeOut ? this.zoomTint.stop(!0, !0).fadeOut(this.options.zoomTintFadeOut) : this.zoomTint.hide(), this.isTintActive = !1)
        }, setLensPostition: function (b) {
        }, setWindowPostition: function (b) {
            var a = this;
            if (isNaN(a.options.zoomWindowPosition))a.externalContainer = d("#" + a.options.zoomWindowPosition), a.externalContainerWidth = a.externalContainer.width(), a.externalContainerHeight = a.externalContainer.height(), a.externalContainerOffset =
                a.externalContainer.offset(), a.windowOffsetTop = a.externalContainerOffset.top, a.windowOffsetLeft = a.externalContainerOffset.left; else switch (a.options.zoomWindowPosition) {
                case 1:
                    a.windowOffsetTop = a.options.zoomWindowOffety;
                    a.windowOffsetLeft = +a.nzWidth;
                    break;
                case 2:
                    a.options.zoomWindowHeight > a.nzHeight && (a.windowOffsetTop = -1 * (a.options.zoomWindowHeight / 2 - a.nzHeight / 2), a.windowOffsetLeft = a.nzWidth);
                    break;
                case 3:
                    a.windowOffsetTop = a.nzHeight - a.zoomWindow.height() - 2 * a.options.borderSize;
                    a.windowOffsetLeft =
                        a.nzWidth;
                    break;
                case 4:
                    a.windowOffsetTop = a.nzHeight;
                    a.windowOffsetLeft = a.nzWidth;
                    break;
                case 5:
                    a.windowOffsetTop = a.nzHeight;
                    a.windowOffsetLeft = a.nzWidth - a.zoomWindow.width() - 2 * a.options.borderSize;
                    break;
                case 6:
                    a.options.zoomWindowHeight > a.nzHeight && (a.windowOffsetTop = a.nzHeight, a.windowOffsetLeft = -1 * (a.options.zoomWindowWidth / 2 - a.nzWidth / 2 + 2 * a.options.borderSize));
                    break;
                case 7:
                    a.windowOffsetTop = a.nzHeight;
                    a.windowOffsetLeft = 0;
                    break;
                case 8:
                    a.windowOffsetTop = a.nzHeight;
                    a.windowOffsetLeft = -1 * (a.zoomWindow.width() +
                    2 * a.options.borderSize);
                    break;
                case 9:
                    a.windowOffsetTop = a.nzHeight - a.zoomWindow.height() - 2 * a.options.borderSize;
                    a.windowOffsetLeft = -1 * (a.zoomWindow.width() + 2 * a.options.borderSize);
                    break;
                case 10:
                    a.options.zoomWindowHeight > a.nzHeight && (a.windowOffsetTop = -1 * (a.options.zoomWindowHeight / 2 - a.nzHeight / 2), a.windowOffsetLeft = -1 * (a.zoomWindow.width() + 2 * a.options.borderSize));
                    break;
                case 11:
                    a.windowOffsetTop = a.options.zoomWindowOffety;
                    a.windowOffsetLeft = -1 * (a.zoomWindow.width() + 2 * a.options.borderSize);
                    break;
                case 12:
                    a.windowOffsetTop =
                        -1 * (a.zoomWindow.height() + 2 * a.options.borderSize);
                    a.windowOffsetLeft = -1 * (a.zoomWindow.width() + 2 * a.options.borderSize);
                    break;
                case 13:
                    a.windowOffsetTop = -1 * (a.zoomWindow.height() + 2 * a.options.borderSize);
                    a.windowOffsetLeft = 0;
                    break;
                case 14:
                    a.options.zoomWindowHeight > a.nzHeight && (a.windowOffsetTop = -1 * (a.zoomWindow.height() + 2 * a.options.borderSize), a.windowOffsetLeft = -1 * (a.options.zoomWindowWidth / 2 - a.nzWidth / 2 + 2 * a.options.borderSize));
                    break;
                case 15:
                    a.windowOffsetTop = -1 * (a.zoomWindow.height() + 2 * a.options.borderSize);
                    a.windowOffsetLeft = a.nzWidth - a.zoomWindow.width() - 2 * a.options.borderSize;
                    break;
                case 16:
                    a.windowOffsetTop = -1 * (a.zoomWindow.height() + 2 * a.options.borderSize);
                    a.windowOffsetLeft = a.nzWidth;
                    break;
                default:
                    a.windowOffsetTop = a.options.zoomWindowOffety, a.windowOffsetLeft = a.nzWidth
            }
            a.isWindowSet = !0;
            a.windowOffsetTop += a.options.zoomWindowOffety;
            a.windowOffsetLeft += a.options.zoomWindowOffetx;
            a.zoomWindow.css({top: a.windowOffsetTop});
            a.zoomWindow.css({left: a.windowOffsetLeft});
            "inner" == a.options.zoomType && (a.zoomWindow.css({top: 0}),
                a.zoomWindow.css({left: 0}));
            a.windowLeftPos = String(-1 * ((b.pageX - a.nzOffset.left) * a.widthRatio - a.zoomWindow.width() / 2));
            a.windowTopPos = String(-1 * ((b.pageY - a.nzOffset.top) * a.heightRatio - a.zoomWindow.height() / 2));
            a.Etoppos && (a.windowTopPos = 0);
            a.Eloppos && (a.windowLeftPos = 0);
            a.Eboppos && (a.windowTopPos = -1 * (a.largeHeight / a.currentZoomLevel - a.zoomWindow.height()));
            a.Eroppos && (a.windowLeftPos = -1 * (a.largeWidth / a.currentZoomLevel - a.zoomWindow.width()));
            a.fullheight && (a.windowTopPos = 0);
            a.fullwidth && (a.windowLeftPos =
                0);
            if ("window" == a.options.zoomType || "inner" == a.options.zoomType)1 == a.zoomLock && (1 >= a.widthRatio && (a.windowLeftPos = 0), 1 >= a.heightRatio && (a.windowTopPos = 0)), a.largeHeight < a.options.zoomWindowHeight && (a.windowTopPos = 0), a.largeWidth < a.options.zoomWindowWidth && (a.windowLeftPos = 0), a.options.easing ? (a.xp || (a.xp = 0), a.yp || (a.yp = 0), a.loop || (a.loop = setInterval(function () {
                a.xp += (a.windowLeftPos - a.xp) / a.options.easingAmount;
                a.yp += (a.windowTopPos - a.yp) / a.options.easingAmount;
                a.scrollingLock ? (clearInterval(a.loop),
                    a.xp = a.windowLeftPos, a.yp = a.windowTopPos, a.xp = -1 * ((b.pageX - a.nzOffset.left) * a.widthRatio - a.zoomWindow.width() / 2), a.yp = -1 * ((b.pageY - a.nzOffset.top) * a.heightRatio - a.zoomWindow.height() / 2), a.changeBgSize && (a.nzHeight > a.nzWidth ? ("lens" == a.options.zoomType && a.zoomLens.css({"background-size": a.largeWidth / a.newvalueheight + "px " + a.largeHeight / a.newvalueheight + "px"}), a.zoomWindow.css({"background-size": a.largeWidth / a.newvalueheight + "px " + a.largeHeight / a.newvalueheight + "px"})) : ("lens" != a.options.zoomType &&
                a.zoomLens.css({"background-size": a.largeWidth / a.newvaluewidth + "px " + a.largeHeight / a.newvalueheight + "px"}), a.zoomWindow.css({"background-size": a.largeWidth / a.newvaluewidth + "px " + a.largeHeight / a.newvaluewidth + "px"})), a.changeBgSize = !1), a.zoomWindow.css({backgroundPosition: a.windowLeftPos + "px " + a.windowTopPos + "px"}), a.scrollingLock = !1, a.loop = !1) : (a.changeBgSize && (a.nzHeight > a.nzWidth ? ("lens" == a.options.zoomType && a.zoomLens.css({
                    "background-size": a.largeWidth / a.newvalueheight + "px " + a.largeHeight / a.newvalueheight +
                    "px"
                }), a.zoomWindow.css({"background-size": a.largeWidth / a.newvalueheight + "px " + a.largeHeight / a.newvalueheight + "px"})) : ("lens" != a.options.zoomType && a.zoomLens.css({"background-size": a.largeWidth / a.newvaluewidth + "px " + a.largeHeight / a.newvaluewidth + "px"}), a.zoomWindow.css({"background-size": a.largeWidth / a.newvaluewidth + "px " + a.largeHeight / a.newvaluewidth + "px"})), a.changeBgSize = !1), a.zoomWindow.css({backgroundPosition: a.xp + "px " + a.yp + "px"}))
            }, 16))) : (a.changeBgSize && (a.nzHeight > a.nzWidth ? ("lens" == a.options.zoomType &&
            a.zoomLens.css({"background-size": a.largeWidth / a.newvalueheight + "px " + a.largeHeight / a.newvalueheight + "px"}), a.zoomWindow.css({"background-size": a.largeWidth / a.newvalueheight + "px " + a.largeHeight / a.newvalueheight + "px"})) : ("lens" == a.options.zoomType && a.zoomLens.css({"background-size": a.largeWidth / a.newvaluewidth + "px " + a.largeHeight / a.newvaluewidth + "px"}), a.largeHeight / a.newvaluewidth < a.options.zoomWindowHeight ? a.zoomWindow.css({
                "background-size": a.largeWidth / a.newvaluewidth + "px " + a.largeHeight / a.newvaluewidth +
                "px"
            }) : a.zoomWindow.css({"background-size": a.largeWidth / a.newvalueheight + "px " + a.largeHeight / a.newvalueheight + "px"})), a.changeBgSize = !1), a.zoomWindow.css({backgroundPosition: a.windowLeftPos + "px " + a.windowTopPos + "px"}))
        }, setTintPosition: function (b) {
            this.nzOffset = this.$elem.offset();
            this.tintpos = String(-1 * (b.pageX - this.nzOffset.left - this.zoomLens.width() / 2));
            this.tintposy = String(-1 * (b.pageY - this.nzOffset.top - this.zoomLens.height() / 2));
            this.Etoppos && (this.tintposy = 0);
            this.Eloppos && (this.tintpos = 0);
            this.Eboppos &&
            (this.tintposy = -1 * (this.nzHeight - this.zoomLens.height() - 2 * this.options.lensBorderSize));
            this.Eroppos && (this.tintpos = -1 * (this.nzWidth - this.zoomLens.width() - 2 * this.options.lensBorderSize));
            this.options.tint && (this.fullheight && (this.tintposy = 0), this.fullwidth && (this.tintpos = 0), this.zoomTintImage.css({left: this.tintpos + "px"}), this.zoomTintImage.css({top: this.tintposy + "px"}))
        }, swaptheimage: function (b, a) {
            var c = this, e = new Image;
            c.options.loadingIcon && (c.spinner = d("<div style=\"background: url('" + c.options.loadingIcon +
            "') no-repeat center;height:" + c.nzHeight + "px;width:" + c.nzWidth + 'px;z-index: 2000;position: absolute; background-position: center center;"></div>'), c.$elem.after(c.spinner));
            c.options.onImageSwap(c.$elem);
            e.onload = function () {
                c.largeWidth = e.width;
                c.largeHeight = e.height;
                c.zoomImage = a;
                c.zoomWindow.css({"background-size": c.largeWidth + "px " + c.largeHeight + "px"});
                c.swapAction(b, a)
            };
            e.src = a
        }, swapAction: function (b, a) {
            var c = this, e = new Image;
            e.onload = function () {
                c.nzHeight = e.height;
                c.nzWidth = e.width;
                c.options.onImageSwapComplete(c.$elem);
                c.doneCallback()
            };
            e.src = b;
            c.currentZoomLevel = c.options.zoomLevel;
            c.options.maxZoomLevel = !1;
            "lens" == c.options.zoomType && c.zoomLens.css({backgroundImage: "url('" + a + "')"});
            "window" == c.options.zoomType && c.zoomWindow.css({backgroundImage: "url('" + a + "')"});
            "inner" == c.options.zoomType && c.zoomWindow.css({backgroundImage: "url('" + a + "')"});
            c.currentImage = a;
            if (c.options.imageCrossfade) {
                var f = c.$elem, g = f.clone();
                c.$elem.attr("src", b);
                c.$elem.after(g);
                g.stop(!0).fadeOut(c.options.imageCrossfade, function () {
                    d(this).remove()
                });
                f.fadeIn(c.options.imageCrossfade);
                c.options.tint && (f = c.zoomTintImage, g = f.clone(), c.zoomTintImage.attr("src", a), c.zoomTintImage.after(g), g.stop(!0).fadeOut(c.options.imageCrossfade, function () {
                    d(this).remove()
                }), f.fadeIn(c.options.imageCrossfade), c.zoomTint.css({height: c.$elem.height()}))
            } else c.$elem.attr("src", b), c.options.tint && (c.zoomTintImage.attr("src", a), c.zoomTintImage.attr("height", c.$elem.height()), c.zoomTintImage.css({height: c.$elem.height()}), c.zoomTint.css({height: c.$elem.height()}));
            c.options.constrainType && ("height" == c.options.constrainType && (c.options.imageCrossfade ? (c.zoomWrap.css("height", c.options.constrainSize), c.zoomWrap.css("width", "auto")) : (c.$elem.css("height", c.options.constrainSize), c.$elem.css("width", "auto")), c.zoomTint && (c.zoomTintImage.css("height", c.options.constrainSize), c.zoomTintImage.css("width", "auto"))), "width" == c.options.constrainType && (c.zoomContainer.css("height", "auto"), c.zoomContainer.css("width", c.options.constrainSize), c.options.imageCrossfade ? (c.zoomWrap.css("height",
                "auto"), c.zoomWrap.css("width", c.options.constrainSize)) : (c.$elem.css("height", "auto"), c.$elem.css("width", c.options.constrainSize)), c.zoomTint && (c.tintContainer.css("height", "auto"), c.tintContainer.css("width", c.options.constrainSize), c.zoomTintImage.css("height", "auto"), c.zoomTintImage.css("width", c.options.constrainSize))))
        }, doneCallback: function () {
            this.options.loadingIcon && this.spinner.hide();
            this.nzOffset = this.$elem.offset();
            this.nzWidth = this.$elem.width();
            this.nzHeight = this.$elem.height();
            this.currentZoomLevel =
                this.options.zoomLevel;
            this.widthRatio = this.largeWidth / this.nzWidth;
            this.heightRatio = this.largeHeight / this.nzHeight;
            "window" == this.options.zoomType && (lensHeight = this.nzHeight < this.options.zoomWindowWidth / this.widthRatio ? this.nzHeight : String(this.options.zoomWindowHeight / this.heightRatio), lensWidth = this.largeWidth < this.options.zoomWindowWidth ? this.nzHWidth : this.options.zoomWindowWidth / this.widthRatio, this.zoomLens && (this.zoomLens.css("width", lensWidth), this.zoomLens.css("height", lensHeight)))
        }, getCurrentImage: function () {
            return this.zoomImage
        },
        getGalleryList: function () {
            var b = this;
            b.gallerylist = [];
            b.options.gallery ? d("#" + b.options.gallery + " a").each(function () {
                var a = "";
                d(this).data("zoom-image") ? a = d(this).data("zoom-image") : d(this).data("image") && (a = d(this).data("image"));
                a == b.zoomImage ? b.gallerylist.unshift({
                    href: "" + a + "",
                    title: d(this).find("img").attr("title")
                }) : b.gallerylist.push({href: "" + a + "", title: d(this).find("img").attr("title")})
            }) : b.gallerylist.push({href: "" + b.zoomImage + "", title: d(this).find("img").attr("title")});
            return b.gallerylist
        },
        changeZoomLevel: function (b) {
            this.scrollingLock = !0;
            this.newvalue = parseFloat(b).toFixed(2);
            newvalue = parseFloat(b).toFixed(2);
            maxheightnewvalue = this.largeHeight / (this.options.zoomWindowHeight / this.nzHeight * this.nzHeight);
            maxwidthtnewvalue = this.largeWidth / (this.options.zoomWindowWidth / this.nzWidth * this.nzWidth);
            "inner" != this.options.zoomType && (maxheightnewvalue <= newvalue ? (this.heightRatio = this.largeHeight / maxheightnewvalue / this.nzHeight, this.newvalueheight = maxheightnewvalue, this.fullheight = !0) : (this.heightRatio =
                this.largeHeight / newvalue / this.nzHeight, this.newvalueheight = newvalue, this.fullheight = !1), maxwidthtnewvalue <= newvalue ? (this.widthRatio = this.largeWidth / maxwidthtnewvalue / this.nzWidth, this.newvaluewidth = maxwidthtnewvalue, this.fullwidth = !0) : (this.widthRatio = this.largeWidth / newvalue / this.nzWidth, this.newvaluewidth = newvalue, this.fullwidth = !1), "lens" == this.options.zoomType && (maxheightnewvalue <= newvalue ? (this.fullwidth = !0, this.newvaluewidth = maxheightnewvalue) : (this.widthRatio = this.largeWidth / newvalue / this.nzWidth,
                this.newvaluewidth = newvalue, this.fullwidth = !1)));
            "inner" == this.options.zoomType && (maxheightnewvalue = parseFloat(this.largeHeight / this.nzHeight).toFixed(2), maxwidthtnewvalue = parseFloat(this.largeWidth / this.nzWidth).toFixed(2), newvalue > maxheightnewvalue && (newvalue = maxheightnewvalue), newvalue > maxwidthtnewvalue && (newvalue = maxwidthtnewvalue), maxheightnewvalue <= newvalue ? (this.heightRatio = this.largeHeight / newvalue / this.nzHeight, this.newvalueheight = newvalue > maxheightnewvalue ? maxheightnewvalue : newvalue, this.fullheight = !0) : (this.heightRatio = this.largeHeight / newvalue / this.nzHeight, this.newvalueheight = newvalue > maxheightnewvalue ? maxheightnewvalue : newvalue, this.fullheight = !1), maxwidthtnewvalue <= newvalue ? (this.widthRatio = this.largeWidth / newvalue / this.nzWidth, this.newvaluewidth = newvalue > maxwidthtnewvalue ? maxwidthtnewvalue : newvalue, this.fullwidth = !0) : (this.widthRatio = this.largeWidth / newvalue / this.nzWidth, this.newvaluewidth = newvalue, this.fullwidth = !1));
            scrcontinue = !1;
            "inner" == this.options.zoomType && (this.nzWidth > this.nzHeight &&
            (this.newvaluewidth <= maxwidthtnewvalue ? scrcontinue = !0 : (scrcontinue = !1, this.fullwidth = this.fullheight = !0)), this.nzHeight > this.nzWidth && (this.newvaluewidth <= maxwidthtnewvalue ? scrcontinue = !0 : (scrcontinue = !1, this.fullwidth = this.fullheight = !0)));
            "inner" != this.options.zoomType && (scrcontinue = !0);
            scrcontinue && (this.zoomLock = 0, this.changeZoom = !0, this.options.zoomWindowHeight / this.heightRatio <= this.nzHeight && (this.currentZoomLevel = this.newvalueheight, "lens" != this.options.zoomType && "inner" != this.options.zoomType &&
            (this.changeBgSize = !0, this.zoomLens.css({height: String(this.options.zoomWindowHeight / this.heightRatio) + "px"})), "lens" == this.options.zoomType || "inner" == this.options.zoomType) && (this.changeBgSize = !0), this.options.zoomWindowWidth / this.widthRatio <= this.nzWidth && ("inner" != this.options.zoomType && this.newvaluewidth > this.newvalueheight && (this.currentZoomLevel = this.newvaluewidth), "lens" != this.options.zoomType && "inner" != this.options.zoomType && (this.changeBgSize = !0, this.zoomLens.css({
                width: String(this.options.zoomWindowWidth /
                this.widthRatio) + "px"
            })), "lens" == this.options.zoomType || "inner" == this.options.zoomType) && (this.changeBgSize = !0), "inner" == this.options.zoomType && (this.changeBgSize = !0, this.nzWidth > this.nzHeight && (this.currentZoomLevel = this.newvaluewidth), this.nzHeight > this.nzWidth && (this.currentZoomLevel = this.newvaluewidth)));
            this.setPosition(this.currentLoc)
        }, closeAll: function () {
            self.zoomWindow && self.zoomWindow.hide();
            self.zoomLens && self.zoomLens.hide();
            self.zoomTint && self.zoomTint.hide()
        }
    };
    d.fn.elevateZoom = function (b) {
        return this.each(function () {
            var a =
                Object.create(k);
            a.init(b, this);
            d.data(this, "elevateZoom", a)
        })
    };
    d.fn.elevateZoom.options = {
        zoomActivation: "hover",
        preloading: 1,
        zoomLevel: 1,
        scrollZoom: !1,
        scrollZoomIncrement: 0.1,
        minZoomLevel: !1,
        maxZoomLevel: !1,
        easing: !1,
        easingAmount: 12,
        lensSize: 200,
        zoomWindowWidth: 400,
        zoomWindowHeight: 400,
        zoomWindowOffetx: 0,
        zoomWindowOffety: 0,
        zoomWindowPosition: 1,
        zoomWindowBgColour: "#fff",
        lensFadeIn: !1,
        lensFadeOut: !1,
        debug: !1,
        zoomWindowFadeIn: !1,
        zoomWindowFadeOut: !1,
        zoomWindowAlwaysShow: !1,
        zoomTintFadeIn: !1,
        zoomTintFadeOut: !1,
        borderSize: 4,
        showLens: !0,
        borderColour: "#888",
        lensBorderSize: 1,
        lensBorderColour: "#000",
        lensShape: "square",
        zoomType: "window",
        containLensZoom: !1,
        lensColour: "white",
        lensOpacity: 0.4,
        lenszoom: !1,
        tint: !1,
        tintColour: "#333",
        tintOpacity: 0.4,
        gallery: !1,
        galleryActiveClass: "zoomGalleryActive",
        imageCrossfade: !1,
        constrainType: !1,
        constrainSize: !1,
        loadingIcon: !1,
        cursor: "default",
        responsive: !0,
        onComplete: d.noop,
        onZoomedImageLoaded: function () {
        },
        onImageSwap: d.noop,
        onImageSwapComplete: d.noop
    }
})(jQuery, window, document);

