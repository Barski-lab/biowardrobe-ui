'use strict';
window.FrontendMain = function() {
    var $html = $('html'), $win = $(window), wrap = $('.app-aside'), MEDIAQUERY = {};
    var captionDelay;

    MEDIAQUERY = {
        desktopXL : 1200,
        desktop : 992,
        tablet : 768,
        mobile : 480
    };
    // function for automatic Copyright Year
    var currentYearHandler = function() {
        $(".current-year").text((new Date).getFullYear());
    };

    // function for Header shrink size based on scroll
    var shrinkHeaderHandler = function() {

        var navbar = $('header > .navbar'), shrinkOn = $('#topbar').length ? $('#topbar').outerHeight() : $('header').outerHeight();
        var logo = $('.navbar-brand').find('img').first(), scrollLogo = logo.data('scroll-logo'), originalLogo = logo.attr('src');
        if ( typeof (scrollLogo) !== 'undefined' && scrollLogo !== '') {
            var logoImage = new Image();
            logoImage.src = scrollLogo;

        }

        $win.scroll(function() {
            if ($('#topbar').length && !isSmallDevice()) {
                if ($(document).scrollTop() > 40) {
                    navbar.addClass('navbar-fixed');
                } else {
                    navbar.removeClass('navbar-fixed');
                }
            } else {
                navbar.removeClass('navbar-fixed');
            }
            if ($('.navbar-transparent').length || $('.navbar-transparent-none').length) {

                if ($(document).scrollTop() > shrinkOn) {
                    navbar.addClass('smaller navbar-transparent-none').removeClass('navbar-transparent');
                    if ( typeof (scrollLogo) !== 'undefined' && scrollLogo !== '') {
                        logo.attr('src', scrollLogo);
                    }
                } else {
                    navbar.removeClass('smaller navbar-transparent-none').addClass('navbar-transparent');
                    if ( typeof (scrollLogo) !== 'undefined' && scrollLogo !== '') {
                        logo.attr('src', originalLogo);
                    }
                }

            } else {
                $(document).scrollTop() > shrinkOn ? navbar.addClass('smaller') : navbar.removeClass('smaller');
            }
        });
    };
    // function to handle SlideBar Toggle
    var sideBarToggleHandler = function() {
        var sbToggle = $(".sb_toggle"), slidingBar = $("#slidingbar");

        sbToggle.on('click', function() {
            slidingBar.slideToggle("fast", function() {
                sbToggle.toggleClass('open');
            });
        });
    };
    // function to handle simple parallax scrolling effect
    var setParallaxHandler = function() {
        if ($win.scrollTop() > 0 && !isSmallDevice()) {
            $('.slider-parallax').css({
                                          'transform' : 'translateY(' + ($win.scrollTop() / 1.1 ) + 'px)'
                                      });

        } else {
            $('.slider-parallax').css({
                                          'transform' : 'translateY(0)'
                                      });
        }

    };
    // function to handle Scroll Top button
    var scrollTopHandler = function() {
        var scroll_top = $win.scrollTop();
        var scroll_top_button = $('#scroll-top');
        if (scroll_top > 300) {
            scroll_top_button.fadeIn();
        } else {
            scroll_top_button.fadeOut();
        }
        scroll_top_button.off("click").on("click", function(e) {
            $("html, body").animate({
                                        scrollTop : 0
                                    }, "slow");
            e.preventDefault();
        });
    };
    // function to handle navbar collapse
    var navbarHandler = function() {
        var navbar = $('.navbar-collapse > .nav');
        var pageHeight = $win.innerHeight() - $('header').outerHeight();
        var collapseButton = $('#menu-toggler');
        if (isSmallDevice()) {
            navbar.css({
                           height : pageHeight
                       });
        } else {
            navbar.css({
                           height : 'auto'
                       });
            $('#app').removeAttr("style");
        };
        collapseButton.off("click").on("click", function() {
            $('body').toggleClass('menu-open');
            $win.scrollTop(0);

        });

        $("body").off($.support.transition.end, '.navbar-collapse').on($.support.transition.end, '.navbar-collapse', function(event) {
            if (isSmallDevice()) {
                if ($('body').hasClass('menu-open')) {

                    $('#app').css({
                                      'overflow-y' : 'hidden',
                                      height : $win.innerHeight()
                                  });
                } else {
                    $('#app').css({
                                      'overflow-y' : 'auto',
                                      height : 'auto'
                                  });
                }
            } else {
                $('#app').removeAttr("style");
            }
        });

        $(document).off("mousedown touchstart", toggleNavbar).on("mousedown touchstart", toggleNavbar);
        function toggleNavbar(e) {

            if (navbar.has(e.target).length === 0//checks if descendants of $box was clicked
                && !navbar.is(e.target)//checks if the $box itself was clicked
                && collapseButton.has(e.target).length === 0 && !collapseButton.is(e.target) && navbar.parent().hasClass("collapse in")) {

                collapseButton.trigger("click");
                //$(document).off("mousedown touchstart", toggleNavbar);
            }
        };
    };

    //// function to handle overlay Search Input box
    //var overlaySearchHandler = function() {
    //    $(document).click(function(event) {
    //        if (!$(event.target).closest('#overlay-search').length) {
    //            if ($('body').hasClass('search-open')) {
    //                $('body').toggleClass('search-open');
    //            }
    //        }
    //    });
    //    $(".menu-search > a, .mobile-menu-search").click(function(e) {
    //
    //        $('body').toggleClass('search-open');
    //
    //        if ($('body').hasClass('search-open')) {
    //            $("#overlay-search").find('input').focus();
    //        }
    //        e.stopPropagation();
    //        e.preventDefault();
    //
    //    });
    //};

    // function to fadeOut slider Caption on scroll
    var sliderCaptionHandler = function() {

        var captionElement = $('.slider-parallax .slider-caption');
        if (captionElement.length > 0) {
            captionElement.each(function() {

                var _this = $(this);

                //console.log(_this.outerHeight())
                _this.css({
                              marginTop : 0 - (_this.outerHeight() / 2)
                          });
            });
        }
        if ($win.scrollTop() > 0) {
            captionElement.css({
                                   'transform' : 'translateY(-' + ($win.scrollTop() / 3.5 ) + 'px)',
                                   'opacity' : 1 - ($win.scrollTop() / 500)
                               });
        } else {
            captionElement.css({
                                   'transform' : 'translateY(0)',
                                   'opacity' : 1
                               });
        }

    };

    // function for toggle an element's class
    var toggleClassHandler = function() {
        var toggleAttribute = $('*[data-toggle-class]');
        toggleAttribute.each(function() {
            var _this = $(this);
            var toggleClass = _this.attr('data-toggle-class');
            var outsideElement;
            var toggleElement;
            typeof _this.attr('data-toggle-target') !== 'undefined' ? toggleElement = $(_this.attr('data-toggle-target')) : toggleElement = _this;
            _this.on("click", function(e) {
                if (_this.attr('data-toggle-type') !== 'undefined' && _this.attr('data-toggle-type') == "on") {
                    toggleElement.addClass(toggleClass);
                } else if (_this.attr('data-toggle-type') !== 'undefined' && _this.attr('data-toggle-type') == "off") {
                    toggleElement.removeClass(toggleClass);
                } else {
                    toggleElement.toggleClass(toggleClass);
                }
                e.preventDefault();
                if (_this.attr('data-toggle-click-outside')) {

                    outsideElement = $(_this.attr('data-toggle-click-outside'));
                    $(document).on("mousedown touchstart", toggleOutside);

                };

            });

            var toggleOutside = function(e) {
                if (outsideElement.has(e.target).length === 0//checks if descendants of $box was clicked
                    && !outsideElement.is(e.target)//checks if the $box itself was clicked
                    && !toggleAttribute.is(e.target) && toggleElement.hasClass(toggleClass)) {

                    toggleElement.removeClass(toggleClass);
                    $(document).off("mousedown touchstart", toggleOutside);
                }
            };

        });
    };

    // function for apply 100% height to an element
    var fullHeightHandler = function() {
        var fullHeightElement = $('.full-height');

        if (fullHeightElement.length > 0) {
            fullHeightElement.each(function() {
                var element = $(this), setHeight, videobackground;

                if (isExtraSmallDevice()) {
                    element.css("height", "auto");
                    setHeight = element.outerHeight();

                } else if (isSmallDevice()) {
                    setHeight = $win.height() - $('header').outerHeight();
                    element.css("height", setHeight);

                } else {
                    setHeight = $win.height();
                    element.css("height", setHeight);

                }
                if (element.find(".video-wrapper > video").length) {
                    videobackground = element.find(".video-wrapper > video");
                    if (videobackground.get(0).readyState === 4)
                        videoDimensionHandler(videobackground, setHeight);
                }
            });
        };
    };

    // function to set Video DImension based on fullHeightHandler
    var videoDimensionHandler = function(video, h) {
        var videoOriginalHeight = $win.width() * video.height() / video.width();
        if (videoOriginalHeight < h) {

            var videoNewWidth = $win.width() * h / videoOriginalHeight;
            var videoOffsetLeft = (videoNewWidth - $win.width()) / 2;

            video.css({
                          height : h,
                          width : videoNewWidth,
                          left : -videoOffsetLeft
                      });
        } else {
            video.css({
                          height : 'auto',
                          width : '100%',
                          left : 0
                      });
        }

    };

    // function to start animations when element appears on screen
    var appearAnimationHandler = function() {
        var appearGroupElement = $('*[data-appears-group-delay]'), appearAttribute = 'data-appears-class', appearElement = $('*[' + appearAttribute + ']'), appearDelay;
        if (appearGroupElement.length) {
            appearGroupElement.each(function() {
                var _group = $(this), groupDelay, delayIncrease, delayStep = 0;
                typeof _group.attr('data-appears-group-delay') !== 'undefined' ? groupDelay = parseInt(_group.attr('data-appears-group-delay')) : groupDelay = null;
                typeof _group.attr('data-appears-delay-increase') !== 'undefined' ? delayIncrease = parseInt(_group.attr('data-appears-delay-increase')) : delayIncrease = 0;
                if (groupDelay !== null) {
                    delayStep = groupDelay;
                    var groupElements = _group.find('*[' + appearAttribute + ']');
                    groupElements.each(function() {
                        var _appearElement = $(this);
                        _appearElement.attr('data-appears-delay', delayStep);
                        delayStep = delayStep + delayIncrease;
                    });
                }
                _group.appear();

                if (_group.is(':appeared')) {
                    groupElements.each(function() {
                        var _this = $(this);
                        _this.addClass('no-visible');
                        typeof _this.attr('data-appears-delay') !== 'undefined' ? appearDelay = parseInt(_this.attr('data-appears-delay')) : appearDelay = 0;
                        setTimeout(function() {
                            _this.addClass(_this.attr(appearAttribute) + ' animated');
                        }, appearDelay);
                    });

                } else {
                    _group.on('appear', function(event, $all_appeared_elements) {
                        groupElements.each(function() {
                            var _this = $(this);
                            _this.addClass('no-visible');
                            typeof _this.attr('data-appears-delay') !== 'undefined' ? appearDelay = parseInt(_this.attr('data-appears-delay')) : appearDelay = 0;

                            setTimeout(function() {
                                _this.addClass(_this.attr(appearAttribute) + ' animated');
                            }, appearDelay);

                        });
                    });
                }
            });
        }
        if (appearElement.length) {
            appearElement.each(function() {
                var _this = $(this);
                _this.addClass('no-visible');

                _this.appear();
                if (_this.is(':appeared')) {
                    typeof _this.attr('data-appears-delay') !== 'undefined' ? appearDelay = parseInt(_this.attr('data-appears-delay')) : appearDelay = 0;
                    setTimeout(function() {
                        _this.addClass(_this.attr(appearAttribute) + ' animated');
                    }, appearDelay);

                } else {
                    _this.on('appear', function(event, $all_appeared_elements) {
                        typeof _this.attr('data-appears-delay') !== 'undefined' ? appearDelay = parseInt(_this.attr('data-appears-delay')) : appearDelay = 0;

                        setTimeout(function() {
                            _this.addClass(_this.attr(appearAttribute) + ' animated');
                        }, appearDelay);

                    });
                }
            });

        }
    };
    // Window Scroll Function
    var windowScrollHandler = function() {
        $win.scroll(function() {
            setParallaxHandler();
            sliderCaptionHandler();
            scrollTopHandler();
        });
    };
    // Window Resize Function
    var resizeHandler = function(func, threshold, execAsap) {
        $win.resize(function() {
            navbarHandler();
            fullHeightHandler();
            sliderCaptionHandler();
        });
    };

    // function to animate a Bootstrap progress bar
    var animatedProgressbarHandler = function() {
        $('.progress-animated').each(function() {
            var _this = $(this);
            var me = _this.find('.progress-bar');
            var count;
            var perc = me.attr('data-percentage');
            if (_this.hasClass('progress-tooltip')) {
                if (!_this.find('.progress-percent').length) {
                    me.append('<div class="progress-percent"></div>');
                }
                count = _this.find('.progress-percent');

            }
            var current_perc = 0;
            _this.appear();
            if (_this.is(':appeared')) {

                me.css('width', (perc) + '%');
                var progress = setInterval(function() {
                    if (current_perc >= perc) {
                        clearInterval(progress);
                    } else {
                        current_perc += 1;

                    }

                    count.text((current_perc) + '%');

                }, 10);
            } else {
                _this.on('appear', function(event, $all_appeared_elements) {
                    me.css('width', (perc) + '%');
                    var progress = setInterval(function() {
                        if (current_perc >= perc) {
                            clearInterval(progress);
                        } else {
                            current_perc += 1;

                        }

                        count.text((current_perc) + '%');

                    }, 10);
                });

            }

        });
    };

    // function to handle Stellar Plugin
    var stellarHandler = function(func, threshold, execAsap) {
        if (!isMobile()) {
            $.stellar({
                          horizontalScrolling : false,
                          verticalOffset : 0,
                          responsive : true
                      });
        }
    };

    // function to handle magnificPopup Plugin
    var magnificPopupHandler = function(func, threshold, execAsap) {
        $('.zoom-image').magnificPopup({
                                           type : 'image'
                                       });
    };

    // function to handle CountTo Plugin
    var animationNumberHandler = function() {
        var numberElement = $('.counter');
        numberElement.each(function() {
            var _this = $(this), numberTo = _this.text();
            _this.appear();
            if (_this.is(':appeared')) {

                _this.countTo({
                                  from : 0,
                                  to : numberTo
                              });

            } else {
                _this.one('appear', function(event, $all_appeared_elements) {

                    _this.countTo({
                                      from : 0,
                                      to : numberTo
                                  });

                });
            }
        });
    };

    // function to handle Swiper Slider Plugin
    var swiperHandler = function() {
        var swiperDefault = $('.horizontal-slider');
        if (swiperDefault.length) {
            swiperDefault.each(function() {
                var _this = $(this);
                var swiper = new Swiper(_this, {
                    pagination : _this.find('.swiper-pagination'),
                    paginationClickable : _this.find('.swiper-pagination'),
                    loop : true,
                    autoplay : 3000,
                    nextButton : _this.find('.swiper-button-next'),
                    prevButton : _this.find('.swiper-button-prev')

                });
            });
        }

        var swiperVertical = $('.vertical-slider');
        if (swiperVertical.length) {
            swiperVertical.each(function() {
                var _this = $(this);
                var swiper = new Swiper(_this, {
                    pagination : _this.find('.swiper-pagination'),
                    paginationClickable : _this.find('.swiper-pagination'),
                    loop : true,
                    autoplay : 3000,
                    direction : 'vertical'

                });
            });
        }

        var swiperNestedHorizontal = $('.swiper-container-h');
        if (swiperNestedHorizontal.length) {
            swiperNestedHorizontal.each(function() {
                var _this = $(this);
                var swiperH = new Swiper(_this, {
                    pagination : _this.find('.swiper-pagination-h'),
                    paginationClickable : true,
                    spaceBetween : 50
                });
            });
        }
        var swiperNestedVertical = $('.swiper-container-v');
        if (swiperNestedVertical.length) {
            swiperNestedVertical.each(function() {
                var _this = $(this);
                var swiperV = new Swiper(_this, {
                    pagination : _this.find('.swiper-pagination-v'),
                    paginationClickable : true,
                    direction : 'vertical',
                    spaceBetween : 50
                });
            });
        }
        var swiperFade = $('.fade-slider');
        if (swiperFade.length) {
            swiperFade.each(function() {
                var _this = $(this);
                var swiper = new Swiper(_this, {
                    pagination : _this.find('.swiper-pagination'),
                    paginationClickable : _this.find('.swiper-pagination'),
                    loop : true,
                    autoplay : 3000,
                    nextButton : _this.find('.swiper-button-next'),
                    prevButton : _this.find('.swiper-button-prev'),
                    effect : 'fade'

                });
            });
        }

        var swiperParallax = $('.parallax-slider');
        if (swiperParallax.length) {
            swiperParallax.each(function() {
                var _this = $(this);
                var swiper = new Swiper(_this, {
                    pagination : _this.find('.swiper-pagination'),
                    paginationClickable : true,
                    nextButton : _this.find('.swiper-button-next'),
                    prevButton : _this.find('.swiper-button-prev'),
                    parallax : true,
                    speed : 600,
                });
            });
        }

        var swiperThumbs = $('.gallery-top');
        if (swiperThumbs.length) {
            swiperThumbs.each(function() {
                var _this = $(this);
                var _thumbs = _this.next('.gallery-thumbs');
                var galleryTop = new Swiper(_this, {
                    nextButton : _this.find('.swiper-button-next'),
                    prevButton : _this.find('.swiper-button-prev'),
                    spaceBetween : 10,
                });
                var galleryThumbs = new Swiper(_thumbs, {
                    spaceBetween : 10,
                    centeredSlides : true,
                    slidesPerView : 'auto',
                    touchRatio : 0.2,
                    slideToClickedSlide : true
                });
                galleryTop.params.control = galleryThumbs;
                galleryThumbs.params.control = galleryTop;
            });
        }

    };

    //function to get viewport/window size (width and height)
    var viewport = function() {
        var e = window, a = 'inner';
        if (!('innerWidth' in window)) {
            a = 'client';
            e = document.documentElement || document.body;
        }
        return {
            width : e[a + 'Width'],
            height : e[a + 'Height']
        };
    };

    function isSmallDevice() {
        return viewport().width < MEDIAQUERY.desktop;
    }

    function isExtraSmallDevice() {
        return viewport().width < MEDIAQUERY.tablet;
    }

    function isMobile() {
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            return true;
        } else {
            return false;
        };
    }
    ///Imported from Index

    // function to handle swipe slider
    var homeSliderHandler = function() {
        $('.swiper-slider').each(function() {
            var _this = $(this);
            var swiper = new Swiper(_this, {
                pagination : _this.find('.swiper-pagination'),
                paginationClickable : _this.find('.swiper-pagination'),
                loop : true,
                nextButton : _this.find('.swiper-button-next'),
                prevButton : _this.find('.swiper-button-prev'),
                onSlideChangeStart : function(swiper) {
                    _this.find('*[data-caption-class]').each(function() {
                        var _this = $(this);
                        _this.removeClass(_this.attr('data-caption-class')).removeClass('animated');
                    });

                },
                onSlideChangeEnd : function(swiper) {

                    _this.find('*[data-caption-class]').each(function() {
                        var _this = $(this);
                        typeof _this.attr('data-caption-delay') !== 'undefined' ? captionDelay = parseInt(_this.attr('data-caption-delay')) : captionDelay = 0;
                        setTimeout(function() {
                            _this.addClass("animated").addClass(_this.attr('data-caption-class'));
                        }, captionDelay);
                    });
                    _this.find('.swiper-slide').each(function() {
                        var _slide = $(this);
                        var _slideVideo = _slide.find('video');
                        if (_slideVideo.length) {
                            if (isMobile()) {
                                _slide.css({
                                               'background-image' : 'url(' + _slideVideo.attr('poster') + ')'
                                           });
                            } else {
                                if (_slideVideo.get(0).readyState === 4) {
                                    if ( typeof _slideVideo.get(0).loop == 'boolean') {// loop supported
                                        _slideVideo.get(0).loop = true;
                                    } else {// loop property not supported
                                        _slideVideo.get(0).on('ended', function() {
                                            this.currentTime = 0;
                                            this.play();
                                        }, false);
                                    }
                                    if (_slide.hasClass("swiper-slide-active")) {
                                        _slideVideo.get(0).currentTime = 1;
                                        _slideVideo.get(0).play();
                                    } else {
                                        _slideVideo.get(0).pause();
                                        _slideVideo.get(0).currentTime = 1;
                                    }
                                }
                            }
                        }

                    });

                }
            });
        });
        function isMobile() {
            if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
                return true;
            } else {
                return false;
            };
        }

    };

    // function to handle slick carousel
    var homeCarouselHandler = function() {
        $('#portfolio').slick({
                                  dots : true,
                                  infinite : false,
                                  speed : 300,
                                  slidesToShow : 3,
                                  slidesToScroll : 3,
                                  responsive : [{
                                      breakpoint : 992,
                                      settings : {
                                          slidesToShow : 2,
                                          slidesToScroll : 2,
                                          infinite : true,
                                          dots : true
                                      }
                                  }, {
                                      breakpoint : 480,
                                      settings : {
                                          slidesToShow : 1,
                                          slidesToScroll : 1
                                      }
                                  }
                                      // You can unslick at a given breakpoint now by adding:
                                      // settings: "unslick"
                                      // instead of a settings object
                                  ]
                              });

        $('#testimonial').slick();

        $('#clients').slick({
                                dots : true,
                                infinite : false,
                                speed : 300,
                                slidesToShow : 4,
                                slidesToScroll : 4,
                                responsive : [{
                                    breakpoint : 1024,
                                    settings : {
                                        slidesToShow : 3,
                                        slidesToScroll : 3,
                                        infinite : true,
                                        dots : true
                                    }
                                }, {
                                    breakpoint : 600,
                                    settings : {
                                        slidesToShow : 2,
                                        slidesToScroll : 2
                                    }
                                }, {
                                    breakpoint : 480,
                                    settings : {
                                        slidesToShow : 1,
                                        slidesToScroll : 1
                                    }
                                }
                                    // You can unslick at a given breakpoint now by adding:
                                    // settings: "unslick"
                                    // instead of a settings object
                                ]
                            });
    };

    return {
        windowScrollHandler: windowScrollHandler,
        fullHeightHandler: fullHeightHandler,
        homeSliderHandler: homeSliderHandler,
        toggleClassHandler: toggleClassHandler,
        scrollTopHandler: scrollTopHandler,
        sliderCaptionHandler: sliderCaptionHandler,
        setParallaxHandler: setParallaxHandler,

        init : function() {
            //sliderCaptionHandler();
            windowScrollHandler(); //the most slow function
            //resizeHandler();
            //shrinkHeaderHandler();
            //currentYearHandler();
            //navbarHandler();
            //overlaySearchHandler();
            //sideBarToggleHandler();
            //stellarHandler();
            //toggleClassHandler();
            //animationNumberHandler();
            //appearAnimationHandler();
            //setParallaxHandler();
            fullHeightHandler();
            //animatedProgressbarHandler();
            //magnificPopupHandler();
            //swiperHandler();
            homeSliderHandler();
            //homeCarouselHandler();

        }
    };
}();
