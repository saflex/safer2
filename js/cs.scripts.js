
 $(function () {
        $('#st-accordion').accordion();
    });

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


 $(function()
      {
        $('.scroll-pane').jScrollPane();
      });


           (function($) {
        $(function() {
            $('input').styler({
                selectSearch: true
            });
        });
        })(jQuery);




        /*
 * jQuery Form Styler v1.7.2
 * https://github.com/Dimox/jQueryFormStyler
 *
 * Copyright 2012-2015 Dimox (http://dimox.name/)
 * Released under the MIT license.
 *
 * Date: 2015.07.15
 *
 */

;(function(factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD
        define(['jquery'], factory);
    } else if (typeof exports === 'object') {
        // CommonJS
        module.exports = factory(require('jquery'));
    } else {
        factory(jQuery);
    }
}(function($) {

    'use strict';

    var pluginName = 'styler',
            defaults = {
                wrapper: 'form',
                idSuffix: '-styler',
                filePlaceholder: 'Файл не выбран',
                fileBrowse: 'Обзор...',
                selectPlaceholder: 'Выберите...',
                selectSearch: false,
                selectSearchLimit: 10,
                selectSearchNotFound: 'Совпадений не найдено',
                selectSearchPlaceholder: 'Поиск...',
                selectVisibleOptions: 0,
                singleSelectzIndex: '100',
                selectSmartPositioning: true,
                onSelectOpened: function() {},
                onSelectClosed: function() {},
                onFormStyled: function() {}
            };

    function Plugin(element, options) {
        this.element = element;
        this.options = $.extend({}, defaults, options);
        this.init();
    }

    Plugin.prototype = {

        // инициализация
        init: function() {

            var el = $(this.element);
            var opt = this.options;

            var iOS = (navigator.userAgent.match(/(iPad|iPhone|iPod)/i) && !navigator.userAgent.match(/(Windows\sPhone)/i)) ? true : false;
            var Android = (navigator.userAgent.match(/Android/i) && !navigator.userAgent.match(/(Windows\sPhone)/i)) ? true : false;

            function Attributes() {
                var id = '',
                        title = '',
                        classes = '',
                        dataList = '';
                if (el.attr('id') !== undefined && el.attr('id') !== '') id = ' id="' + el.attr('id') + opt.idSuffix + '"';
                if (el.attr('title') !== undefined && el.attr('title') !== '') title = ' title="' + el.attr('title') + '"';
                if (el.attr('class') !== undefined && el.attr('class') !== '') classes = ' ' + el.attr('class');
                var data = el.data();
                for (var i in data) {
                    if (data[i] !== '' && i !== '_styler') dataList += ' data-' + i + '="' + data[i] + '"';
                }
                id += dataList;
                this.id = id;
                this.title = title;
                this.classes = classes;
            }

            // checkbox
            if (el.is(':checkbox')) {

                var checkboxOutput = function() {

                    var att = new Attributes();
                    var checkbox = $('<div' + att.id + ' class="jq-checkbox' + att.classes + '"' + att.title + '><div class="jq-checkbox__div"></div></div>');

                    // прячем оригинальный чекбокс
                    el.css({
                        position: 'absolute',
                        zIndex: '-1',
                        opacity: 0,
                        margin: 0,
                        padding: 0
                    }).after(checkbox).prependTo(checkbox);

                    checkbox.attr('unselectable', 'on').css({
                        '-webkit-user-select': 'none',
                        '-moz-user-select': 'none',
                        '-ms-user-select': 'none',
                        '-o-user-select': 'none',
                        'user-select': 'none',
                        display: 'inline-block',
                        position: 'relative',
                        overflow: 'hidden'
                    });

                    if (el.is(':checked')) checkbox.addClass('checked');
                    if (el.is(':disabled')) checkbox.addClass('disabled');

                    // клик на псевдочекбокс
                    checkbox.on('click.styler', function() {
                        if (!checkbox.is('.disabled')) {
                            if (el.is(':checked')) {
                                el.prop('checked', false);
                                checkbox.removeClass('checked');
                            } else {
                                el.prop('checked', true);
                                checkbox.addClass('checked');
                            }
                            el.change();
                            return false;
                        } else {
                            return false;
                        }
                    });
                    // клик на label
                    el.closest('label').add('label[for="' + el.attr('id') + '"]').on('click.styler', function(e) {
                        if (!$(e.target).is('a')) {
                            checkbox.click();
                            e.preventDefault();
                        }
                    });
                    // переключение по Space или Enter
                    el.on('change.styler', function() {
                        if (el.is(':checked')) checkbox.addClass('checked');
                        else checkbox.removeClass('checked');
                    })
                    // чтобы переключался чекбокс, который находится в теге label
                    .on('keydown.styler', function(e) {
                        if (e.which == 32) checkbox.click();
                    })
                    .on('focus.styler', function() {
                        if (!checkbox.is('.disabled')) checkbox.addClass('focused');
                    })
                    .on('blur.styler', function() {
                        checkbox.removeClass('focused');
                    });

                }; // end checkboxOutput()

                checkboxOutput();

                // обновление при динамическом изменении
                el.on('refresh', function() {
                    el.off('.styler').parent().before(el).remove();
                    checkboxOutput();
                });

            // end checkbox

            // radio
            } else if (el.is(':radio')) {

                var radioOutput = function() {

                    var att = new Attributes();
                    var radio = $('<div' + att.id + ' class="jq-radio' + att.classes + '"' + att.title + '><div class="jq-radio__div"></div></div>');

                    // прячем оригинальную радиокнопку
                    el.css({
                        position: 'absolute',
                        zIndex: '-1',
                        opacity: 0,
                        margin: 0,
                        padding: 0
                    }).after(radio).prependTo(radio);

                    radio.attr('unselectable', 'on').css({
                        '-webkit-user-select': 'none',
                        '-moz-user-select': 'none',
                        '-ms-user-select': 'none',
                        '-o-user-select': 'none',
                        'user-select': 'none',
                        display: 'inline-block',
                        position: 'relative'
                    });

                    if (el.is(':checked')) radio.addClass('checked');
                    if (el.is(':disabled')) radio.addClass('disabled');

                    // клик на псевдорадиокнопке
                    radio.on('click.styler', function() {
                        if (!radio.is('.disabled')) {
                            radio.closest(opt.wrapper).find('input[name="' + el.attr('name') + '"]').prop('checked', false).parent().removeClass('checked');
                            el.prop('checked', true).parent().addClass('checked');
                            el.change();
                            return false;
                        } else {
                            return false;
                        }
                    });
                    // клик на label
                    el.closest('label').add('label[for="' + el.attr('id') + '"]').on('click.styler', function(e) {
                        if (!$(e.target).is('a')) {
                            radio.click();
                            e.preventDefault();
                        }
                    });
                    // переключение стрелками
                    el.on('change.styler', function() {
                        el.parent().addClass('checked');
                    })
                    .on('focus.styler', function() {
                        if (!radio.is('.disabled')) radio.addClass('focused');
                    })
                    .on('blur.styler', function() {
                        radio.removeClass('focused');
                    });

                }; // end radioOutput()

                radioOutput();

                // обновление при динамическом изменении
                el.on('refresh', function() {
                    el.off('.styler').parent().before(el).remove();
                    radioOutput();
                });

            // end radio

            // file
            } else if (el.is(':file')) {

                // прячем оригинальное поле
                el.css({
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    width: '100%',
                    height: '100%',
                    opacity: 0,
                    margin: 0,
                    padding: 0
                });

                var fileOutput = function() {

                    var att = new Attributes();
                    var placeholder = el.data('placeholder');
                    if (placeholder === undefined) placeholder = opt.filePlaceholder;
                    var browse = el.data('browse');
                    if (browse === undefined || browse === '') browse = opt.fileBrowse;
                    var file = $('<div' + att.id + ' class="jq-file' + att.classes + '"' + att.title + ' style="display: inline-block; position: relative; overflow: hidden"></div>');
                    var name = $('<div class="jq-file__name">' + placeholder + '</div>').appendTo(file);
                    $('<div class="jq-file__browse">' + browse + '</div>').appendTo(file);
                    el.after(file).appendTo(file);

                    if (el.is(':disabled')) file.addClass('disabled');

                    el.on('change.styler', function() {
                        var value = el.val();
                        if (el.is('[multiple]')) {
                            value = '';
                            var files = el[0].files;
                            for (var i = 0; i < files.length; i++) {
                                value += ( (i > 0) ? ', ' : '' ) + files[i].name;
                            }
                        }
                        name.text(value.replace(/.+[\\\/]/, ''));
                        if (value === '') {
                            name.text(placeholder);
                            file.removeClass('changed');
                        } else {
                            file.addClass('changed');
                        }
                    })
                    .on('focus.styler', function() {
                        file.addClass('focused');
                    })
                    .on('blur.styler', function() {
                        file.removeClass('focused');
                    })
                    .on('click.styler', function() {
                        file.removeClass('focused');
                    });

                }; // end fileOutput()

                fileOutput();

                // обновление при динамическом изменении
                el.on('refresh', function() {
                    el.off('.styler').parent().before(el).remove();
                    fileOutput();
                });

            // end file

            } else if (el.is('input[type="number"]')) {

                var numberOutput = function() {

                    var number = $('<div class="jq-number"><div class="jq-number__spin minus"></div><div class="jq-number__spin plus"></div></div>');
                    el.after(number).prependTo(number).wrap('<div class="jq-number__field"></div>');

                    if (el.is(':disabled')) number.addClass('disabled');

                    var min,
                            max,
                            step,
                            timeout = null,
                            interval = null;
                    if (el.attr('min') !== undefined) min = el.attr('min');
                    if (el.attr('max') !== undefined) max = el.attr('max');
                    if (el.attr('step') !== undefined && $.isNumeric(el.attr('step')))
                        step = Number(el.attr('step'));
                    else
                        step = Number(1);

                    var changeValue = function(spin) {
                        var value = el.val(),
                                newValue;
                        if (!$.isNumeric(value)) {
                            value = 0;
                            el.val('0');
                        }
                        if (spin.is('.minus')) {
                            newValue = parseInt(value, 10) - step;
                            if (step > 0) newValue = Math.ceil(newValue / step) * step;
                        } else if (spin.is('.plus')) {
                            newValue = parseInt(value, 10) + step;
                            if (step > 0) newValue = Math.floor(newValue / step) * step;
                        }
                        if ($.isNumeric(min) && $.isNumeric(max)) {
                            if (newValue >= min && newValue <= max) el.val(newValue);
                        } else if ($.isNumeric(min) && !$.isNumeric(max)) {
                            if (newValue >= min) el.val(newValue);
                        } else if (!$.isNumeric(min) && $.isNumeric(max)) {
                            if (newValue <= max) el.val(newValue);
                        } else {
                            el.val(newValue);
                        }
                    };

                    if (!number.is('.disabled')) {
                        number.on('mousedown.styler', 'div.jq-number__spin', function() {
                            var spin = $(this);
                            changeValue(spin);
                            timeout = setTimeout(function(){
                                interval = setInterval(function(){ changeValue(spin); }, 40);
                            }, 350);
                        }).on('mouseup.styler mouseout.styler', 'div.jq-number__spin', function() {
                            clearTimeout(timeout);
                            clearInterval(interval);
                        });
                        el.on('focus.styler', function() {
                            number.addClass('focused');
                        })
                        .on('blur.styler', function() {
                            number.removeClass('focused');
                        });
                    }

                }; // end numberOutput()

                numberOutput();

                // обновление при динамическом изменении
                el.on('refresh', function() {
                    el.off('.styler').closest('.jq-number').before(el).remove();
                    numberOutput();
                });

            // end number

            // select
            } else if (el.is('select')) {

                var selectboxOutput = function() {

                    // запрещаем прокрутку страницы при прокрутке селекта
                    function preventScrolling(selector) {
                        selector.off('mousewheel DOMMouseScroll').on('mousewheel DOMMouseScroll', function(e) {
                            var scrollTo = null;
                            if (e.type == 'mousewheel') { scrollTo = (e.originalEvent.wheelDelta * -1); }
                            else if (e.type == 'DOMMouseScroll') { scrollTo = 40 * e.originalEvent.detail; }
                            if (scrollTo) {
                                e.stopPropagation();
                                e.preventDefault();
                                $(this).scrollTop(scrollTo + $(this).scrollTop());
                            }
                        });
                    }

                    var option = $('option', el);
                    var list = '';
                    // формируем список селекта
                    function makeList() {
                        for (var i = 0; i < option.length; i++) {
                            var op = option.eq(i);
                            var li = '',
                                    liClass = '',
                                    liClasses = '',
                                    id = '',
                                    title = '',
                                    dataList = '',
                                    optionClass = '',
                                    optgroupClass = '',
                                    dataJqfsClass = '';
                            var disabled = 'disabled';
                            var selDis = 'selected sel disabled';
                            if (op.prop('selected')) liClass = 'selected sel';
                            if (op.is(':disabled')) liClass = disabled;
                            if (op.is(':selected:disabled')) liClass = selDis;
                            if (op.attr('id') !== undefined && op.attr('id') !== '') id = ' id="' + op.attr('id') + opt.idSuffix + '"';
                            if (op.attr('title') !== undefined && option.attr('title') !== '') title = ' title="' + op.attr('title') + '"';
                            if (op.attr('class') !== undefined) {
                                optionClass = ' ' + op.attr('class');
                                dataJqfsClass = ' data-jqfs-class="' + op.attr('class') + '"';
                            }

                            var data = op.data();
                            for (var k in data) {
                                if (data[k] !== '') dataList += ' data-' + k + '="' + data[k] + '"';
                            }

                            if ( (liClass + optionClass) !== '' )   liClasses = ' class="' + liClass + optionClass + '"';
                            li = '<li' + dataJqfsClass + dataList + liClasses + title + id + '>'+ op.html() +'</li>';

                            // если есть optgroup
                            if (op.parent().is('optgroup')) {
                                if (op.parent().attr('class') !== undefined) optgroupClass = ' ' + op.parent().attr('class');
                                li = '<li' + dataJqfsClass + dataList + ' class="' + liClass + optionClass + ' option' + optgroupClass + '"' + title + id + '>'+ op.html() +'</li>';
                                if (op.is(':first-child')) {
                                    li = '<li class="optgroup' + optgroupClass + '">' + op.parent().attr('label') + '</li>' + li;
                                }
                            }

                            list += li;
                        }
                    } // end makeList()

                    // одиночный селект
                    function doSelect() {
                        var att = new Attributes();

                        var searchHTML = '';
                        var selectPlaceholder = el.data('placeholder');
                        var selectSearch = el.data('search');
                        var selectSearchLimit = el.data('search-limit');
                        var selectSearchNotFound = el.data('search-not-found');
                        var selectSearchPlaceholder = el.data('search-placeholder');
                        var singleSelectzIndex = el.data('z-index');
                        var selectSmartPositioning = el.data('smart-positioning');

                        if (selectPlaceholder === undefined) selectPlaceholder = opt.selectPlaceholder;
                        if (selectSearch === undefined || selectSearch === '') selectSearch = opt.selectSearch;
                        if (selectSearchLimit === undefined || selectSearchLimit === '') selectSearchLimit = opt.selectSearchLimit;
                        if (selectSearchNotFound === undefined || selectSearchNotFound === '') selectSearchNotFound = opt.selectSearchNotFound;
                        if (selectSearchPlaceholder === undefined) selectSearchPlaceholder = opt.selectSearchPlaceholder;
                        if (singleSelectzIndex === undefined || singleSelectzIndex === '') singleSelectzIndex = opt.singleSelectzIndex;
                        if (selectSmartPositioning === undefined || selectSmartPositioning === '') selectSmartPositioning = opt.selectSmartPositioning;

                        var selectbox =
                            $('<div' + att.id + ' class="jq-selectbox jqselect' + att.classes + '" style="display: inline-block; position: relative; z-index:' + singleSelectzIndex + '">' +
                                    '<div class="jq-selectbox__select"' + att.title + ' style="position: relative">' +
                                        '<div class="jq-selectbox__select-text"></div>' +
                                        '<div class="jq-selectbox__trigger"><div class="jq-selectbox__trigger-arrow"></div></div>' +
                                    '</div>' +
                                '</div>');

                        el.css({margin: 0, padding: 0}).after(selectbox).prependTo(selectbox);

                        var divSelect = $('div.jq-selectbox__select', selectbox);
                        var divText = $('div.jq-selectbox__select-text', selectbox);
                        var optionSelected = option.filter(':selected');

                        makeList();

                        if (selectSearch) searchHTML =
                            '<div class="jq-selectbox__search"><input type="search" autocomplete="off" placeholder="' + selectSearchPlaceholder + '"></div>' +
                            '<div class="jq-selectbox__not-found">' + selectSearchNotFound + '</div>';
                        var dropdown =
                            $('<div class="jq-selectbox__dropdown" style="position: absolute">' +
                                    searchHTML +
                                    '<ul style="position: relative; list-style: none; overflow: auto; overflow-x: hidden">' + list + '</ul>' +
                                '</div>');
                        selectbox.append(dropdown);
                        var ul = $('ul', dropdown);
                        var li = $('li', dropdown);
                        var search = $('input', dropdown);
                        var notFound = $('div.jq-selectbox__not-found', dropdown).hide();
                        if (li.length < selectSearchLimit) search.parent().hide();

                        // показываем опцию по умолчанию
                        // если 1-я опция пустая и выбрана по умолчанию, то показываем плейсхолдер
                        if (el.val() === '') {
                            divText.text(selectPlaceholder).addClass('placeholder');
                        } else {
                            divText.text(optionSelected.text());
                        }

                        // определяем самый широкий пункт селекта
                        var liWidthInner = 0,
                                liWidth = 0;
                        li.each(function() {
                            var l = $(this);
                            l.css({'display': 'inline-block'});
                            if (l.innerWidth() > liWidthInner) {
                                liWidthInner = l.innerWidth();
                                liWidth = l.width();
                            }
                            l.css({'display': ''});
                        });

                        // подстраиваем ширину свернутого селекта в зависимости
                        // от ширины плейсхолдера или самого широкого пункта
                        if (divText.is('.placeholder') && (divText.width() > liWidthInner)) {
                            divText.width(divText.width());
                        } else {
                            var selClone = selectbox.clone().appendTo('body').width('auto');
                            var selCloneWidth = selClone.outerWidth();
                            selClone.remove();
                            if (selCloneWidth == selectbox.outerWidth()) {
                                divText.width(liWidth);
                            }
                        }

                        // подстраиваем ширину выпадающего списка в зависимости от самого широкого пункта
                        if (liWidthInner > selectbox.width()) dropdown.width(liWidthInner);

                        // прячем 1-ю пустую опцию, если она есть и если атрибут data-placeholder не пустой
                        // если все же нужно, чтобы первая пустая опция отображалась, то указываем у селекта: data-placeholder=""
                        if (option.first().text() === '' && el.data('placeholder') !== '') {
                            li.first().hide();
                        }

                        // прячем оригинальный селект
                        el.css({
                            position: 'absolute',
                            left: 0,
                            top: 0,
                            width: '100%',
                            height: '100%',
                            opacity: 0
                        });

                        var selectHeight = selectbox.outerHeight();
                        var searchHeight = search.outerHeight();
                        var isMaxHeight = ul.css('max-height');
                        var liSelected = li.filter('.selected');
                        if (liSelected.length < 1) li.first().addClass('selected sel');
                        if (li.data('li-height') === undefined) li.data('li-height', li.outerHeight());
                        var position = dropdown.css('top');
                        if (dropdown.css('left') == 'auto') dropdown.css({left: 0});
                        if (dropdown.css('top') == 'auto') dropdown.css({top: selectHeight});
                        dropdown.hide();

                        // если выбран не дефолтный пункт
                        if (liSelected.length) {
                            // добавляем класс, показывающий изменение селекта
                            if (option.first().text() != optionSelected.text()) {
                                selectbox.addClass('changed');
                            }
                            // передаем селекту класс выбранного пункта
                            selectbox.data('jqfs-class', liSelected.data('jqfs-class'));
                            selectbox.addClass(liSelected.data('jqfs-class'));
                        }

                        // если селект неактивный
                        if (el.is(':disabled')) {
                            selectbox.addClass('disabled');
                            return false;
                        }

                        // при клике на псевдоселекте
                        divSelect.click(function() {

                            // колбек при закрытии селекта
                            if ($('div.jq-selectbox').filter('.opened').length) {
                                opt.onSelectClosed.call($('div.jq-selectbox').filter('.opened'));
                            }

                            el.focus();

                            // если iOS, то не показываем выпадающий список,
                            // т.к. отображается нативный и неизвестно, как его спрятать
                            if (iOS) return;

                            // умное позиционирование
                            var win = $(window);
                            var liHeight = li.data('li-height');
                            var topOffset = selectbox.offset().top;
                            var bottomOffset = win.height() - selectHeight - (topOffset - win.scrollTop());
                            var visible = el.data('visible-options');
                            if (visible === undefined || visible === '') visible = opt.selectVisibleOptions;
                            var minHeight = liHeight * 5;
                            var newHeight = liHeight * visible;
                            if (visible > 0 && visible < 6) minHeight = newHeight;
                            if (visible === 0) newHeight = 'auto';

                            var dropDown = function() {
                                dropdown.height('auto').css({bottom: 'auto', top: position});
                                var maxHeightBottom = function() {
                                    ul.css('max-height', Math.floor((bottomOffset - 20 - searchHeight) / liHeight) * liHeight);
                                };
                                maxHeightBottom();
                                ul.css('max-height', newHeight);
                                if (isMaxHeight != 'none') {
                                    ul.css('max-height', isMaxHeight);
                                }
                                if (bottomOffset < (dropdown.outerHeight() + 20)) {
                                    maxHeightBottom();
                                }
                            };

                            var dropUp = function() {
                                dropdown.height('auto').css({top: 'auto', bottom: position});
                                var maxHeightTop = function() {
                                    ul.css('max-height', Math.floor((topOffset - win.scrollTop() - 20 - searchHeight) / liHeight) * liHeight);
                                };
                                maxHeightTop();
                                ul.css('max-height', newHeight);
                                if (isMaxHeight != 'none') {
                                    ul.css('max-height', isMaxHeight);
                                }
                                if ((topOffset - win.scrollTop() - 20) < (dropdown.outerHeight() + 20)) {
                                    maxHeightTop();
                                }
                            };

                            if (selectSmartPositioning === true || selectSmartPositioning === 1) {
                                // раскрытие вниз
                                if (bottomOffset > (minHeight + searchHeight + 20)) {
                                    dropDown();
                                    selectbox.removeClass('dropup').addClass('dropdown');
                                // раскрытие вверх
                                } else {
                                    dropUp();
                                    selectbox.removeClass('dropdown').addClass('dropup');
                                }
                            } else if (selectSmartPositioning === false || selectSmartPositioning === 0) {
                                // раскрытие вниз
                                if (bottomOffset > (minHeight + searchHeight + 20)) {
                                    dropDown();
                                    selectbox.removeClass('dropup').addClass('dropdown');
                                }
                            }

                            // если выпадающий список выходит за правый край окна браузера,
                            // то меняем позиционирование с левого на правое
                            if (selectbox.offset().left + dropdown.outerWidth() > win.width()) {
                                dropdown.css({left: 'auto', right: 0});
                            }
                            // конец умного позиционирования

                            $('div.jqselect').css({zIndex: (singleSelectzIndex - 1)}).removeClass('opened');
                            selectbox.css({zIndex: singleSelectzIndex});
                            if (dropdown.is(':hidden')) {
                                $('div.jq-selectbox__dropdown:visible').hide();
                                dropdown.show();
                                selectbox.addClass('opened focused');
                                // колбек при открытии селекта
                                opt.onSelectOpened.call(selectbox);
                            } else {
                                dropdown.hide();
                                selectbox.removeClass('opened dropup dropdown');
                                // колбек при закрытии селекта
                                if ($('div.jq-selectbox').filter('.opened').length) {
                                    opt.onSelectClosed.call(selectbox);
                                }
                            }

                            // поисковое поле
                            if (search.length) {
                                search.val('').keyup();
                                notFound.hide();
                                search.keyup(function() {
                                    var query = $(this).val();
                                    li.each(function() {
                                        if (!$(this).html().match(new RegExp('.*?' + query + '.*?', 'i'))) {
                                            $(this).hide();
                                        } else {
                                            $(this).show();
                                        }
                                    });
                                    // прячем 1-ю пустую опцию
                                    if (option.first().text() === '' && el.data('placeholder') !== '') {
                                        li.first().hide();
                                    }
                                    if (li.filter(':visible').length < 1) {
                                        notFound.show();
                                    } else {
                                        notFound.hide();
                                    }
                                });
                            }

                            // прокручиваем до выбранного пункта при открытии списка
                            if (li.filter('.selected').length) {
                                if (el.val() === '') {
                                    ul.scrollTop(0);
                                } else {
                                    // если нечетное количество видимых пунктов,
                                    // то высоту пункта делим пополам для последующего расчета
                                    if ( (ul.innerHeight() / liHeight) % 2 !== 0 ) liHeight = liHeight / 2;
                                    ul.scrollTop(ul.scrollTop() + li.filter('.selected').position().top - ul.innerHeight() / 2 + liHeight);
                                }
                            }

                            preventScrolling(ul);
                            return false;

                        }); // end divSelect.click()

                        // при наведении курсора на пункт списка
                        li.hover(function() {
                            $(this).siblings().removeClass('selected');
                        });
                        var selectedText = li.filter('.selected').text();

                        // при клике на пункт списка
                        li.filter(':not(.disabled):not(.optgroup)').click(function() {
                            el.focus();
                            var t = $(this);
                            var liText = t.text();
                            if (!t.is('.selected')) {
                                var index = t.index();
                                index -= t.prevAll('.optgroup').length;
                                t.addClass('selected sel').siblings().removeClass('selected sel');
                                option.prop('selected', false).eq(index).prop('selected', true);
                                selectedText = liText;
                                divText.text(liText);

                                // передаем селекту класс выбранного пункта
                                if (selectbox.data('jqfs-class')) selectbox.removeClass(selectbox.data('jqfs-class'));
                                selectbox.data('jqfs-class', t.data('jqfs-class'));
                                selectbox.addClass(t.data('jqfs-class'));

                                el.change();
                            }
                            dropdown.hide();
                            selectbox.removeClass('opened dropup dropdown');
                            // колбек при закрытии селекта
                            opt.onSelectClosed.call(selectbox);

                        });
                        dropdown.mouseout(function() {
                            $('li.sel', dropdown).addClass('selected');
                        });

                        // изменение селекта
                        el.on('change.styler', function() {
                            divText.text(option.filter(':selected').text()).removeClass('placeholder');
                            li.removeClass('selected sel').not('.optgroup').eq(el[0].selectedIndex).addClass('selected sel');
                            // добавляем класс, показывающий изменение селекта
                            if (option.first().text() != li.filter('.selected').text()) {
                                selectbox.addClass('changed');
                            } else {
                                selectbox.removeClass('changed');
                            }
                        })
                        .on('focus.styler', function() {
                            selectbox.addClass('focused');
                            $('div.jqselect').not('.focused').removeClass('opened dropup dropdown').find('div.jq-selectbox__dropdown').hide();
                        })
                        .on('blur.styler', function() {
                            selectbox.removeClass('focused');
                        })
                        // изменение селекта с клавиатуры
                        .on('keydown.styler keyup.styler', function(e) {
                            var liHeight = li.data('li-height');
                            if (el.val() === '') {
                                divText.text(selectPlaceholder).addClass('placeholder');
                            } else {
                                divText.text(option.filter(':selected').text());
                            }
                            li.removeClass('selected sel').not('.optgroup').eq(el[0].selectedIndex).addClass('selected sel');
                            // вверх, влево, Page Up, Home
                            if (e.which == 38 || e.which == 37 || e.which == 33 || e.which == 36) {
                                if (el.val() === '') {
                                    ul.scrollTop(0);
                                } else {
                                    ul.scrollTop(ul.scrollTop() + li.filter('.selected').position().top);
                                }
                            }
                            // вниз, вправо, Page Down, End
                            if (e.which == 40 || e.which == 39 || e.which == 34 || e.which == 35) {
                                ul.scrollTop(ul.scrollTop() + li.filter('.selected').position().top - ul.innerHeight() + liHeight);
                            }
                            // закрываем выпадающий список при нажатии Enter
                            if (e.which == 13) {
                                e.preventDefault();
                                dropdown.hide();
                                selectbox.removeClass('opened dropup dropdown');
                                // колбек при закрытии селекта
                                opt.onSelectClosed.call(selectbox);
                            }
                        }).on('keydown.styler', function(e) {
                            // открываем выпадающий список при нажатии Space
                            if (e.which == 32) {
                                e.preventDefault();
                                divSelect.click();
                            }
                        });

                        // прячем выпадающий список при клике за пределами селекта
                        if (!onDocumentClick.registered) {
                            $(document).on('click', onDocumentClick);
                            onDocumentClick.registered = true;
                        }

                    } // end doSelect()

                    // мультиселект
                    function doMultipleSelect() {
                        var att = new Attributes();
                        var selectbox = $('<div' + att.id + ' class="jq-select-multiple jqselect' + att.classes + '"' + att.title + ' style="display: inline-block; position: relative"></div>');

                        el.css({margin: 0, padding: 0}).after(selectbox);

                        makeList();
                        selectbox.append('<ul>' + list + '</ul>');
                        var ul = $('ul', selectbox).css({
                            'position': 'relative',
                            'overflow-x': 'hidden',
                            '-webkit-overflow-scrolling': 'touch'
                        });
                        var li = $('li', selectbox).attr('unselectable', 'on');
                        var size = el.attr('size');
                        var ulHeight = ul.outerHeight();
                        var liHeight = li.outerHeight();
                        if (size !== undefined && size > 0) {
                            ul.css({'height': liHeight * size});
                        } else {
                            ul.css({'height': liHeight * 4});
                        }
                        if (ulHeight > selectbox.height()) {
                            ul.css('overflowY', 'scroll');
                            preventScrolling(ul);
                            // прокручиваем до выбранного пункта
                            if (li.filter('.selected').length) {
                                ul.scrollTop(ul.scrollTop() + li.filter('.selected').position().top);
                            }
                        }

                        // прячем оригинальный селект
                        el.prependTo(selectbox).css({
                            position: 'absolute',
                            left: 0,
                            top: 0,
                            width: '100%',
                            height: '100%',
                            opacity: 0
                        });

                        // если селект неактивный
                        if (el.is(':disabled')) {
                            selectbox.addClass('disabled');
                            option.each(function() {
                                if ($(this).is(':selected')) li.eq($(this).index()).addClass('selected');
                            });

                        // если селект активный
                        } else {

                            // при клике на пункт списка
                            li.filter(':not(.disabled):not(.optgroup)').click(function(e) {
                                el.focus();
                                var clkd = $(this);
                                if(!e.ctrlKey && !e.metaKey) clkd.addClass('selected');
                                if(!e.shiftKey) clkd.addClass('first');
                                if(!e.ctrlKey && !e.metaKey && !e.shiftKey) clkd.siblings().removeClass('selected first');

                                // выделение пунктов при зажатом Ctrl
                                if(e.ctrlKey || e.metaKey) {
                                    if (clkd.is('.selected')) clkd.removeClass('selected first');
                                        else clkd.addClass('selected first');
                                    clkd.siblings().removeClass('first');
                                }

                                // выделение пунктов при зажатом Shift
                                if(e.shiftKey) {
                                    var prev = false,
                                            next = false;
                                    clkd.siblings().removeClass('selected').siblings('.first').addClass('selected');
                                    clkd.prevAll().each(function() {
                                        if ($(this).is('.first')) prev = true;
                                    });
                                    clkd.nextAll().each(function() {
                                        if ($(this).is('.first')) next = true;
                                    });
                                    if (prev) {
                                        clkd.prevAll().each(function() {
                                            if ($(this).is('.selected')) return false;
                                                else $(this).not('.disabled, .optgroup').addClass('selected');
                                        });
                                    }
                                    if (next) {
                                        clkd.nextAll().each(function() {
                                            if ($(this).is('.selected')) return false;
                                                else $(this).not('.disabled, .optgroup').addClass('selected');
                                        });
                                    }
                                    if (li.filter('.selected').length == 1) clkd.addClass('first');
                                }

                                // отмечаем выбранные мышью
                                option.prop('selected', false);
                                li.filter('.selected').each(function() {
                                    var t = $(this);
                                    var index = t.index();
                                    if (t.is('.option')) index -= t.prevAll('.optgroup').length;
                                    option.eq(index).prop('selected', true);
                                });
                                el.change();

                            });

                            // отмечаем выбранные с клавиатуры
                            option.each(function(i) {
                                $(this).data('optionIndex', i);
                            });
                            el.on('change.styler', function() {
                                li.removeClass('selected');
                                var arrIndexes = [];
                                option.filter(':selected').each(function() {
                                    arrIndexes.push($(this).data('optionIndex'));
                                });
                                li.not('.optgroup').filter(function(i) {
                                    return $.inArray(i, arrIndexes) > -1;
                                }).addClass('selected');
                            })
                            .on('focus.styler', function() {
                                selectbox.addClass('focused');
                            })
                            .on('blur.styler', function() {
                                selectbox.removeClass('focused');
                            });

                            // прокручиваем с клавиатуры
                            if (ulHeight > selectbox.height()) {
                                el.on('keydown.styler', function(e) {
                                    // вверх, влево, PageUp
                                    if (e.which == 38 || e.which == 37 || e.which == 33) {
                                        ul.scrollTop(ul.scrollTop() + li.filter('.selected').position().top - liHeight);
                                    }
                                    // вниз, вправо, PageDown
                                    if (e.which == 40 || e.which == 39 || e.which == 34) {
                                        ul.scrollTop(ul.scrollTop() + li.filter('.selected:last').position().top - ul.innerHeight() + liHeight * 2);
                                    }
                                });
                            }

                        }
                    } // end doMultipleSelect()

                    if (el.is('[multiple]')) {

                        // если Android или iOS, то мультиселект не стилизуем
                        // причина для Android - в стилизованном селекте нет возможности выбрать несколько пунктов
                        // причина для iOS - в стилизованном селекте неправильно отображаются выбранные пункты
                        if (Android || iOS) return;

                        doMultipleSelect();
                    } else {
                        doSelect();
                    }

                }; // end selectboxOutput()

                selectboxOutput();

                // обновление при динамическом изменении
                el.on('refresh', function() {
                    el.off('.styler').parent().before(el).remove();
                    selectboxOutput();
                });

            // end select

            // reset
            } else if (el.is(':reset')) {
                el.on('click', function() {
                    setTimeout(function() {
                        el.closest(opt.wrapper).find('input, select').trigger('refresh');
                    }, 1);
                });
            } // end reset

        }, // init: function()

        // деструктор
        destroy: function() {

            var el = $(this.element);

            if (el.is(':checkbox') || el.is(':radio')) {
                el.removeData().off('.styler').removeAttr('style').parent().before(el).remove();
                el.closest('label').add('label[for="' + el.attr('id') + '"]').off('.styler');
            } else if (el.is('input[type="number"]')) {
                el.removeData().off('.styler').closest('.jq-number').before(el).remove();
            } else if (el.is(':file') || el.is('select')) {
                el.removeData().off('.styler').removeAttr('style').parent().before(el).remove();
            }

        } // destroy: function()

    }; // Plugin.prototype

    $.fn[pluginName] = function(options) {
        var args = arguments;
        if (options === undefined || typeof options === 'object') {
            return this.each(function() {
                if (!$.data(this, '_' + pluginName)) {
                    $.data(this, '_' + pluginName, new Plugin(this, options));
                }
            })
            // колбек после выполнения плагина
            .promise()
            .done(function() {
                var opt = $(this[0]).data('_' + pluginName);
                if (opt) opt.options.onFormStyled.call();
            });
        } else if (typeof options === 'string' && options[0] !== '_' && options !== 'init') {
            var returns;
            this.each(function() {
                var instance = $.data(this, '_' + pluginName);
                if (instance instanceof Plugin && typeof instance[options] === 'function') {
                    returns = instance[options].apply(instance, Array.prototype.slice.call(args, 1));
                }
            });
            return returns !== undefined ? returns : this;
        }
    };

    // прячем выпадающий список при клике за пределами селекта
    function onDocumentClick(e) {
        // e.target.nodeName != 'OPTION' - добавлено для обхода бага в Opera на движке Presto
        // (при изменении селекта с клавиатуры срабатывает событие onclick)
        if (!$(e.target).parents().hasClass('jq-selectbox') && e.target.nodeName != 'OPTION') {
            if ($('div.jq-selectbox.opened').length) {
                var selectbox = $('div.jq-selectbox.opened'),
                        search = $('div.jq-selectbox__search input', selectbox),
                        dropdown = $('div.jq-selectbox__dropdown', selectbox),
                        opt = selectbox.find('select').data('_' + pluginName).options;

                // колбек при закрытии селекта
                opt.onSelectClosed.call(selectbox);

                if (search.length) search.val('').keyup();
                dropdown.hide().find('li.sel').addClass('selected');
                selectbox.removeClass('focused opened dropup dropdown');
            }
        }
    }
    onDocumentClick.registered = false;

}));





    var swiper1 = new Swiper('.swiper1', {
        pagination: '.swiper-pagination1',
        paginationClickable: true,
         autoplay: 4500,
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev'
    });
    var swiper2 = new Swiper('.swiper2', {
        pagination: '.swiper-pagination2',
        paginationClickable: true,
        spaceBetween: 30,
          nextButton: '.swiper-button-next2',
        prevButton: '.swiper-button-prev2'
    });
  
 