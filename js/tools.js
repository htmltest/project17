var sliderSpeed     = 500;  // скорость смены слайды
var sliderPeriod    = 3000; // время автоматической смены слайда (0 - автоматическая смена отключена)

var contentSpeed    = 500;  // скорость смены фотографий в тексте

var speedScroll     = 500;  // скорость прокрутки по странице

var sliderTimer     = null;

(function($) {

    $(document).ready(function() {

        // слайдер
        $('#slider').each(function() {
            var curSlider = $(this);
            curSlider.data('curIndex', 0);
            curSlider.data('disableAnimation', false);
            if (curSlider.find('.slider-content li').length > 1 && sliderPeriod > 0) {
                sliderTimer = window.setTimeout(function() { $('.slider-next').trigger('click'); }, sliderPeriod);
            }
        });

        $('.slider-next').click(function() {
            var curSlider = $('#slider');
            if (!curSlider.data('disableAnimation')) {
                window.clearTimeout(sliderTimer);
                sliderTimer = null;

                var curIndex = curSlider.data('curIndex');
                var newIndex = curIndex + 1;
                if (newIndex == curSlider.find('.slider-content li').length) {
                    newIndex = 0;
                }

                curSlider.data('disableAnimation', true);

                $('.slider-ctrl ul li.active').removeClass('active');
                $('.slider-ctrl ul li').eq(newIndex).addClass('active');

                curSlider.find('.slider-content li').eq(curIndex).css({'z-index': 2});
                curSlider.find('.slider-content li').eq(newIndex).css({'z-index': 1, 'display': 'block'});
                curSlider.find('.slider-content li').eq(curIndex).fadeOut(sliderSpeed, function() {
                    curSlider.data('curIndex', newIndex);
                    curSlider.data('disableAnimation', false);
                    if (curSlider.find('.slider-content li').length > 1 && sliderPeriod > 0) {
                        sliderTimer = window.setTimeout(function() { $('.slider-next').trigger('click'); }, sliderPeriod);
                    }
                });
            }

            return false;
        });

        $('.slider-prev').click(function() {
            var curSlider = $('#slider');
            if (!curSlider.data('disableAnimation')) {
                window.clearTimeout(sliderTimer);
                sliderTimer = null;

                var curIndex = curSlider.data('curIndex');
                var newIndex = curIndex - 1;
                if (newIndex == -1) {
                    newIndex = curSlider.find('.slider-content li').length - 1;
                }

                curSlider.data('disableAnimation', true);

                $('.slider-ctrl ul li.active').removeClass('active');
                $('.slider-ctrl ul li').eq(newIndex).addClass('active');

                curSlider.find('.slider-content li').eq(curIndex).css({'z-index': 2});
                curSlider.find('.slider-content li').eq(newIndex).css({'z-index': 1, 'display': 'block'});
                curSlider.find('.slider-content li').eq(curIndex).fadeOut(sliderSpeed, function() {
                    curSlider.data('curIndex', newIndex);
                    curSlider.data('disableAnimation', false);
                    if (curSlider.find('.slider-content li').length > 1 && sliderPeriod > 0) {
                        sliderTimer = window.setTimeout(function() { $('.slider-next').trigger('click'); }, sliderPeriod);
                    }
                });
            }

            return false;
        });

        $('.slider-ctrl ul li a').mouseover(function() {
            var curLi = $(this).parent();
            if (!curLi.hasClass('active')) {
                $('.slider-ctrl ul li.active').removeClass('active');
                curLi.addClass('active');

                var newIndex = $('.slider-ctrl ul li').index(curLi);

                var curSlider = $('#slider');
                var curIndex = curSlider.data('curIndex');

                curSlider.data('curIndex', newIndex);
                curSlider.find('.slider-content li').stop(true, true);
                curSlider.find('.slider-content li').eq(curIndex).css({'z-index': 2});
                curSlider.find('.slider-content li').eq(newIndex).css({'z-index': 1, 'display': 'block'});
                curSlider.find('.slider-content li').eq(curIndex).fadeOut(sliderSpeed);
            }
        });

        $('.slider-wrap').hover(
            function() {
                window.clearTimeout(sliderTimer);
                sliderTimer = null;
            },

            function() {
                if ($('#slider .slider-content li').length > 1 && sliderPeriod > 0) {
                    sliderTimer = window.setTimeout(function() { $('.slider-next').trigger('click'); }, sliderPeriod);
                }
            }
        );

        $('.citation-inner').each(function() {
            $('.citation-inner').parallax('50%', -.5);
        });

        // окно "Заказать звонок"
        $('.header-callback a, .footer-callback a').click(function() {
            windowOpen($('.callback-window').html());
            return false;
        });

        // окно "Оставить заявку"
        $('.header-order a, .footer-order a').click(function() {
            windowOpen($('.order-window').html());
            return false;
        });

        // галерея фотографий в тексте
        $('.content-slider').each(function() {
            var curSlider = $(this);
            curSlider.data('disableAnimation', false);
            curSlider.data('curIndex', 0);
            $('.content-slider-ctrl em').html(curSlider.find('li').length);
        });

        $(window).load(function() {
            $('.content-slider ul li img').each(function() {
                var curImg      = $(this);
                var imgWidth    = curImg.width();
                var imgHeight   = curImg.height();
                var curLi       = curImg.parent().parent();
                var liWidth     = curLi.width();
                var liHeight    = curLi.height();

                if (imgWidth > imgHeight) {
                    newImgHeight = liHeight;
                    newImgWidth  = imgWidth * newImgHeight / imgHeight;

                    if (newImgWidth < liWidth) {
                        var newImgWidth  = liWidth;
                        var newImgHeight = imgHeight * newImgWidth / imgWidth;
                    }
                } else {
                    var newImgWidth  = liWidth;
                    var newImgHeight = imgHeight * newImgWidth / imgWidth;

                    if (newImgHeight < liHeight) {
                        newImgHeight = liHeight;
                        newImgWidth  = imgWidth * newImgHeight / imgHeight;
                    }
                }

                curImg.css({'width': newImgWidth, 'height': newImgHeight, 'left': '50%', 'top': '50%', 'margin-left': -newImgWidth / 2, 'margin-top': -newImgHeight / 2});
            });
        });

        $('.content-slider-next').click(function() {
            var curSlider = $('.content-slider');
            if (!curSlider.data('disableAnimation')) {

                var curIndex = curSlider.data('curIndex');
                var newIndex = curIndex + 1;
                if (newIndex == curSlider.find('li').length) {
                    newIndex = 0;
                }

                $('.content-slider-preview a').removeClass('active');
                $('.content-slider-preview a').eq(newIndex).addClass('active');

                curSlider.data('disableAnimation', true);
                curSlider.find('ul').css({'min-height': curSlider.find('li').eq(curIndex).height()});
                curSlider.find('li').eq(curIndex).css({'position': 'absolute'});
                curSlider.find('li').eq(curIndex).animate({'opacity': 0}, contentSpeed);
                curSlider.find('li').eq(newIndex).css({'position': 'relative'});
                curSlider.find('li').eq(newIndex).animate({'opacity': 1}, contentSpeed, function() {
                    curSlider.data('disableAnimation', false);
                    curSlider.data('curIndex', newIndex);
                    curSlider.find('ul').css({'min-height': 0});
                    $('.content-slider-ctrl span').html(newIndex + 1);
                });
            }
            return false;
        });

        $('.content-slider-prev').click(function() {
            var curSlider = $('.content-slider');
            if (!curSlider.data('disableAnimation')) {

                var curIndex = curSlider.data('curIndex');
                var newIndex = curIndex - 1;
                if (newIndex == -1) {
                    newIndex = curSlider.find('li').length - 1;
                }

                $('.content-slider-preview a').removeClass('active');
                $('.content-slider-preview a').eq(newIndex).addClass('active');

                curSlider.data('disableAnimation', true);
                curSlider.find('ul').css({'min-height': curSlider.find('li').eq(curIndex).height()});
                curSlider.find('li').eq(curIndex).css({'position': 'absolute'});
                curSlider.find('li').eq(curIndex).animate({'opacity': 0}, contentSpeed);
                curSlider.find('li').eq(newIndex).css({'position': 'relative'});
                curSlider.find('li').eq(newIndex).animate({'opacity': 1}, contentSpeed, function() {
                    curSlider.data('disableAnimation', false);
                    curSlider.data('curIndex', newIndex);
                    curSlider.find('ul').css({'min-height': 0});
                    $('.content-slider-ctrl span').html(newIndex + 1);
                });
            }
            return false;
        });

        $('.content-slider-preview a').click(function() {
            if (!$(this).hasClass('active')) {
                var curSlider = $('.content-slider');
                if (!curSlider.data('disableAnimation')) {

                    var curIndex = curSlider.data('curIndex');
                    var newIndex = $('.content-slider-preview a').index($(this));

                    $('.content-slider-preview a').removeClass('active');
                    $('.content-slider-preview a').eq(newIndex).addClass('active');

                    curSlider.data('disableAnimation', true);
                    curSlider.find('ul').css({'min-height': curSlider.find('li').eq(curIndex).height()});
                    curSlider.find('li').eq(curIndex).css({'position': 'absolute'});
                    curSlider.find('li').eq(curIndex).animate({'opacity': 0}, contentSpeed);
                    curSlider.find('li').eq(newIndex).css({'position': 'relative'});
                    curSlider.find('li').eq(newIndex).animate({'opacity': 1}, contentSpeed, function() {
                        curSlider.data('disableAnimation', false);
                        curSlider.data('curIndex', newIndex);
                        curSlider.find('ul').css({'min-height': 0});
                        $('.content-slider-ctrl span').html(newIndex + 1);
                    });
                }
            }
            return false;
        });

        // список артистов
        $('.artists-letters a').click(function() {
            $.scrollTo($($(this).attr('href')), speedScroll, {offset: {'top': -20}});
            return false;
        });

        // заказ артиста
        $('.artist-order-link a').click(function() {
            windowOpen($('.order-artist-window').html());
            return false;
        });

        $('.window .callback-select > input').live('click', function() {
            $('.window .callback-select-window').toggle();
        });

        $('.window .callback-select-close').live('click', function() {
            $('.window .callback-select-window').hide();
            return false;
        });

        $('.window .callback-select-row div').live('click', function() {
            var curSpan = $(this).find('span');
            curSpan.toggleClass('checked');
            curSpan.find('input').prop('checked', curSpan.hasClass('checked')).trigger('change');

            var curText = '';
            $('.window .callback-select-row span.checked').each(function() {
                if (curText != '') {
                    curText += ', ' + $(this).parent().text();
                } else {
                    curText += $(this).parent().text();
                }
            });
            if (curText.length > 45) {
                curText = curText.substr(0, 42) + '...';
            }
            $('.window .callback-select > input').val(curText);
        });

        // фотоотчеты
        $('.photoreports-menu > ul > li > a').click(function() {
            var curLi = $(this).parent();
            curLi.find('ul').slideToggle();
            curLi.toggleClass('open');
            return false;
        });

        $('.photoalbum-list').each(function() {
            $(this).find('a').fancybox();
        });

        $('.contacts-form').each(function() {
            $('.contacts-form form').validate({
                messages: {
                    name: 'Укажите свое имя!',
                    phone: 'Укажите свой телефон!',
                    message: 'Введите сообщение!'
                }
            });
        });

    });

    // меню в списке артистов
    $(window).bind('load scroll resize', function() {
        $('.artists-letters').each(function() {
            var curTop = $(window).scrollTop();
            if (curTop > $('.artists-letters').offset().top) {
                $('.artists-letters-inner').addClass('artists-letters-fix');
                $('.artists-letters-inner').css({'left': $('.artists-letters').offset().left});
            } else {
                $('.artists-letters-inner').removeClass('artists-letters-fix');
                $('.artists-letters-inner').css({'left': 'auto'});
            }
        });
    });

    // открытие окна
    function windowOpen(contentWindow) {
        var windowWidth  = $(window).width();
        var windowHeight = $(window).height();
        var curScrollTop = $(window).scrollTop();

        $('body').css({'width': windowWidth, 'height': windowHeight, 'overflow': 'hidden'});
        $(window).scrollTop(0);
        $('.wrapper').css({'top': -curScrollTop});
        $('.wrapper').data('scrollTop', curScrollTop);

        $('body').append('<div class="window"><div class="window-overlay"></div><div class="window-container">' + contentWindow + '<a href="#" class="window-close"><span></span></a></div></div>')
        recalcWindow();

        $('.window .callback-form form').validate({
            messages: {
                name: 'Укажите свое имя!',
                phone: 'Укажите свой телефон!',
                email: 'Укажите корректный e-mail!',
                message: 'Введите сообщение!',
                artists: 'Выберите артиста!'
            }
        });

        $('.window-overlay').click(function() {
            windowClose();
        });

        $('.window-close').click(function() {
            windowClose();
            return false;
        });

        $('body').bind('keydown', keyDownBody);
    }

    // функция обновления позиции окна
    function recalcWindow() {
        var windowWidth  = $(window).width();
        var windowHeight = $(window).height();
        if ($('.window-container').width() < windowWidth) {
            $('.window-container').css({'margin-left': -$('.window-container').width() / 2});
        } else {
            $('.window-container').css({'left': 0});
        }
        if ($('.window-container').height() < windowHeight) {
            $('.window-container').css({'margin-top': -$('.window-container').height() / 2});
        } else {
            $('.window-container').css({'top': 20});
            $('.window-overlay').css({'min-height': $('.window-container').height() + 40});
        }
    }

    // обработка Esc после открытия окна
    function keyDownBody(e) {
        if (e.keyCode == 27) {
            if ($('.window .callback-select-window:visible').length == 1) {
                $('.window .callback-select-window').hide();
            } else {
                windowClose();
            }
        }
    }

    // закрытие окна
    function windowClose() {
        $('body').unbind('keypress keydown', keyDownBody);
        $('.window').remove();
        $('.wrapper').css({'top': 'auto'});
        $('body').css({'width': 'auto', 'height': '100%', 'overflow': 'auto'});
        var curScrollTop = $('.wrapper').data('scrollTop');
        $(window).scrollTop(curScrollTop);
    }

})(jQuery);