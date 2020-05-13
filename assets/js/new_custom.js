
var allExpressSelect = $('.express-price__select')
$('.express-price__select.model').prop('disabled', true)
$('.express-price__select.year').prop('disabled', true)
/* $(allExpressSelect[allExpressSelect.length - 1]).prop('disabled', true)
$(allExpressSelect[allExpressSelect.length - 2]).prop('disabled', true) */
/* $('.express-price__input').prop('disabled', true)
$('.field__file').prop('disabled', true)
$('.express-price__checkbox').prop('disabled', true) */
var docWidth = $(document).width()

$(document).ready(function () {
    var BeforeChange
    $('body').on('click', '.express-price__select', function () {
        BeforeChange = $(this).val()
        if ($(this).hasClass('incorrect')) {
            $(this).removeClass('incorrect')
        }
    })

    // Функционал работы селектов //
    $('body').on('change', '.express-price__select', function () {
        if ($(this).hasClass('marks')) {
            if ($(this).val() == 'Марка') {
                $(this).parents('.express-price__select-wrapper').next().find('.express-price__select.model option:first').prop('selected', true);
                $(this).parents('.express-price__select-wrapper').next().find('.express-price__select.model').prop('disabled', true)
                $(this).parents('.express-price__form').find('.express-price__select.year option:first').prop('selected', true);
                $(this).parents('.express-price__form').find('.express-price__select.year').prop('disabled', true)
            }
            if ($(this).val() != 'Марка') {
                $(this).parents('.express-price__select-wrapper').next().find('.express-price__select.model').prop('disabled', false)
            }
            if ($(this).val() != BeforeChange) {
                $(this).parents('.express-price__select-wrapper').next().find('.express-price__select.model option:first').prop('selected', true);
                $(this).parents('.express-price__form').find('.express-price__select.year option:first').prop('selected', true);
                $(this).parents('.express-price__form').find('.express-price__select.year').prop('disabled', true)
            }
        }
        if ($(this).hasClass('model')) {
            if ($(this).val() == 'Модель') {
                $(this).parents('.express-price__select-wrapper').next().find('.express-price__select.year option:first').prop('selected', true);
                $(this).parents('.express-price__select-wrapper').next().find('.express-price__select.year').prop('disabled', true)
            }
            if ($(this).val() != 'Модель') {
                $(this).parents('.express-price__select-wrapper').next().find('.express-price__select.year').prop('disabled', false)
            }
            if ($(this).val() != BeforeChange) {
                $(this).parents('.express-price__select-wrapper').next().find('.express-price__select.year option:first').prop('selected', true);
            }
        }
    })
    // ---------------------- //

    // Инициализации макси ввода номера номера //
    $(".mask-phone").inputmask({
        mask: "+7 (999) 999-99-99"
    });
    // ---------------------- //

    // Удаление класса валидации при клике на поле ввода телефона
    $('.mask-phone, .express-price__label-checkbox').click(function () {
        if ($(this).hasClass('incorrect')) {
            $(this).removeClass('incorrect')
        }
    })
    // Проверка формы перед отправкой на сервер //
    $('.express-price__submit').on('click', function () {
        $(this).parents('.express-price__form').submit(function (e) {
            e.preventDefault();
            if ($(this).find('.express-price__select.marks').val() == 'Марка') {
                $(this).find('.express-price__select.marks').addClass('incorrect')
            }
            if ($(this).find('.express-price__select.model').val() == 'Модель' && $(this).find('.express-price__select.model').prop('disabled') == false) {
                $(this).find('.express-price__select.model').addClass('incorrect')
            }
            if ($(this).find('.express-price__select.year').val() == 'Год выпуска' && $(this).find('.express-price__select.year').prop('disabled') == false) {
                $(this).find('.express-price__select.year').addClass('incorrect')
            }
            if (!$(this).find(".mask-phone").inputmask("isComplete") && $(this).find(".mask-phone").prop('disabled') == false) {
                $(this).find('.mask-phone').addClass('incorrect')
            }
            if ($(this).find('.incorrect').length > 0 || !$(this).find('.express-price__checkbox').prop('checked')) {
                if (!$(this).find('.express-price__checkbox').prop('checked')) {
                    $(this).find('.express-price__label-checkbox').addClass('incorrect')
                }
                return false
            }
            else {
                if (!$(this).next('.express-price__send-request').hasClass('open')) {
                    $(this).next('.express-price__send-request').addClass('open')
                }
            }
        })
    })
    $('body').on('click', '.express-price__send-request.open .ok-btn-close, .express-price__send-request.open .btn', function (e) {
        e.preventDefault();
        $('.express-price__send-request.open').removeClass('open')
    })
    //----------------------//

    // Обработка загрузки файлов для отправки на сервер //
    let fields = document.querySelectorAll('.field__file');
    Array.prototype.forEach.call(fields, function (input) {
        let label = input.nextElementSibling,
            labelVal = label.querySelector('.field__file-fake').innerText;

        input.addEventListener('change', function (e) {
            let countFiles = '';
            if (this.files && this.files.length >= 1)
                countFiles = this.files.length;

            if (countFiles) {
                if ($(input).hasClass('incorrect')) {
                    $(input).removeClass('incorrect')
                }
                label.querySelector('.field__file-fake').innerText = 'Выбрано файлов: ' + countFiles;
                const close = document.createElement('span')
                label.querySelector('.field__file-fake').appendChild(close)
            }
            else
                label.querySelector('.field__file-fake').innerText = labelVal;
        });
        $('body').on('click', '.field__file-fake span', function (e) {
            e.preventDefault()
            if (input.files.length >= 1) {
                $(input).val('')
                label.querySelector('.field__file-fake').innerText = labelVal;
            }
        })
    });

    // Анимация для якорных ссылок //
    var MenuHeight;
    function animatedScroll(w) {
        $("body").on('click', ".anchor", function (e) {
            e.preventDefault();
            var positionScroll = $('html,body').scrollTop();
            if (positionScroll == 0) {
                if (w >= 768) {
                    MenuHeight = $('.header').height();
                }
                if (w < 768) {
                    if ($('.navbar-collapse').hasClass('in'))
                        MenuHeight = $('.header').height() - $('.navbar-collapse').height()
                    else
                        MenuHeight = $('.header').height()
                    console.log(MenuHeight)
                }
            }
            if (positionScroll > 0) {
                if (w >= 768) {
                    MenuHeight = 146
                }
                if (w < 768) {
                    if ($('.navbar-collapse').hasClass('in'))
                        MenuHeight = $('.header__inner').height() - $('.navbar-collapse').height()
                    else MenuHeight = $('.header__inner').height()
                    console.log(MenuHeight)
                }
            }
            if (w < 768) {
                if ($('.navbar-collapse').hasClass('in')) {
                    $('.navbar-collapse').removeClass('in')
                    $('.navbar-collapse').attr('aria-expanded', false)
                }
            }
            /*  if (w < 1200)
                 ScrollPadding = 50; */
            $('html,body').stop().animate({ scrollTop: $(this.hash).offset().top - MenuHeight }, 500);
        });
    }
    animatedScroll(docWidth)
    //----------------------//

    $(document).scroll(function (e) {
        var ScrollPositionNow = $(this).scrollTop();
        if (docWidth < 768) {
            if (ScrollPositionNow > 0) {
                if (!$('.header').hasClass('fixed')) {
                    $('.top-header').hide()
                    $('.header').addClass('fixed')
                    $('body').css({ 'margin-top': $('.header').height() })
                }
            }
            else {
                if ($('.header').hasClass('fixed')) {
                    $('.header').removeClass('fixed')
                    $('.top-header').show()
                    $('body').css({ 'margin-top': '' })
                }
            }
        }
    })
    $('.footer__btn.scroll').click(function (e) {
        if ($('.header').hasClass('fixed')) {
            $('body').css({ 'margin-top': '' })
        }
    })
})