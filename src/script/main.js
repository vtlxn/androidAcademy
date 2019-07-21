$(document).ready(function () {
    $('[data-fancybox]').fancybox({
        touch: false
    });
    /*=========== WOW animation ===========*/
    function wowAnimation() {
        new WOW({
            offset: 100,
            mobile: true
        }).init()
    }
    wowAnimation();

    /*=========== Page Scrool to id ===========*/
    if ($(".m_PageScroll2id").length) {
        $(".m_PageScroll2id").mPageScroll2id({
            offset: 30
        });
    }

    /*=========== Slick Slider ===========*/
    if ($('.reviews-slider').length) {
        $('.reviews-slider').each(function () {

            var $this = $(this);

            $this.slick({
                slidesToShow: 2,
                slidesToScroll: 1,
                dots: false,
                infinite: true,
                touchMove: true,
                draggable: true,
                lazyLoad: 'ondemand',
                prevArrow: '<button class="slick-prev"></button>',
                nextArrow: '<button class="slick-next"></button>',
                autoplay: true,
                autoplaySpeed: 8000,
                easing: 'swing',
                // centerMode: true,
                // variableWidth: true,
                responsive: [{
                        breakpoint: 992,
                        settings: {
                            slidesToShow: 1,
                        }
                    },
                    {
                        breakpoint: 576,
                        settings: {
                            slidesToShow: 1,
                            arrows: false,
                            dots: true
                        }
                    }
                ]
            });

        });
    }
});


// TIMER
(() => {
    let timers = document.querySelectorAll('[data-timer]');
    timers.forEach((el) => {
        let timer = {};
        let getTimer = () => {
            let countDownDate = new Date('Apr 5, 2022 00:00:00').getTime();
            let now = new Date().getTime();
            let distance = countDownDate - now;


            return {
                days: Math.floor(distance / (1000 * 60 * 60 * 24)),
                hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
                seconds: Math.floor((distance % (1000 * 60)) / 1000)
            }
        };
        let setUpTimer = (timer) => {

            let hours1 = timer.hours == 1 || timer.hours == 21;
            let hours2 = timer.hours == 0 || (timer.hours >= 5 && timer.hours <= 20);
            let hours3 = (timer.hours >= 2 && timer.hours <= 4) || (timer.hours >= 22 && timer.hours <= 24);
            
            let min1 = timer.minutes == 1 || timer.minutes == 21 || timer.minutes == 31 || timer.minutes == 41 || timer.minutes == 51;
            let min2 = timer.minutes == 0 || (timer.minutes >= 5 && timer.minutes <= 20) || (timer.minutes >= 25 && timer.minutes <= 30) || (timer.minutes >= 35 && timer.minutes <= 40) || (timer.minutes >= 45 && timer.minutes <= 50) || (timer.minutes >= 55 && timer.minutes <= 59);
            let min3 = (timer.minutes >= 2 && timer.minutes <= 4) || (timer.minutes >= 22 && timer.minutes <= 24) || (timer.minutes >= 32 && timer.minutes <= 34) || (timer.minutes >= 42 && timer.minutes <= 44) || (timer.minutes >= 52 && timer.minutes <= 54);

            let sec1 = timer.seconds == 1 || timer.seconds == 21 || timer.seconds == 31 || timer.seconds == 41 || timer.seconds == 51;
            let sec2 = timer.seconds == 0 || (timer.seconds >= 5 && timer.seconds <= 20) || (timer.seconds >= 25 && timer.seconds <= 30) || (timer.seconds >= 35 && timer.seconds <= 40) || (timer.seconds >= 45 && timer.seconds <= 50) || (timer.seconds >= 55 && timer.seconds <= 59);
            let sec3 = (timer.seconds >= 2 && timer.seconds <= 4) || (timer.seconds >= 22 && timer.seconds <= 24) || (timer.seconds >= 32 && timer.seconds <= 34) || (timer.seconds >= 42 && timer.seconds <= 44) || (timer.seconds >= 52 && timer.seconds <= 54);

            let timerStr = '';
            timerStr += timer.hours;

            if (hours1) {
                timerStr += " час ";
            }
            if (hours2) {
                timerStr += " часов ";
            }
            if (hours3) {
                timerStr += " часа ";
            }

            timerStr += timer.minutes;
            if (min1) {
                timerStr += " минута ";
            }
            if (min2) {
                timerStr += " минут ";
            }
            if (min3) {
                timerStr += " минуты ";
            }

            timerStr += timer.seconds;
            if (sec1) {
                timerStr += " секунда ";
            }
            if (sec2) {
                timerStr += " секунд ";
            }
            if (sec3) {
                timerStr += " секунды ";
            }

            el.innerHTML = timerStr;
        };
        setInterval(() => {
            timer = getTimer();
            setUpTimer(timer);
        }, 1000);
    })

})();