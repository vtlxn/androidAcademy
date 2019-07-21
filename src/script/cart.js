(() => {

    let addCourse = document.querySelectorAll('[data-addCourse]');
    let priceElm = document.getElementById('total_price');
    let courses = document.querySelectorAll('[data-course]');
    let cartItemsEl = document.getElementById('cart_items');
    let form = document.getElementById('cart_form');
    let emails = document.querySelectorAll('[data-email]');
    let errorElm = document.querySelector('[data-error]');
    let submitBtns = form.querySelectorAll('input[type="submit"]');
    let coupon = 0;
    let discount = 0;

    const checkLocalStorage = () => {
        localStorage.getItem('course1') == 1 ?
        courses[0].click() : null;
        localStorage.getItem('course2') == 1 ?
        courses[1].click() : null;
        localStorage.getItem('course3') == 1 ?
        courses[2].click() : null;
    };
    
    const cart = () => {
        let course1 = 0;
        let course2 = 0;
        let course3 = 0;

        addCourse.forEach((el) => {
            el.addEventListener('click', () => {
            let course = document.querySelector('[data-course="' + el.getAttribute('data-addCourse') +'"]');
            course.checked === true ?
                null :
                (() => {
                    el.innerHTML = 'Добавлено в корзину';
                    el.classList.add('locked');
                    course.checked = true;
                    course.parentNode.classList.add('active');
                    localStorage.setItem(course.getAttribute('name'), 1);
                    checkPrice();
                })();
            });
        });
        courses.forEach((el, ind) => {
            el.addEventListener('change', () => {
                el.checked === true ?
                    (() => {
                        el.parentNode.classList.add('active');
                        addCourse[ind].innerHTML = 'Добавлено в корзину';
                        addCourse[ind].classList.add('locked');
                        localStorage.setItem('course' + (ind + 1), 1);
                    })() :
                    (() => {
                        el.parentNode.classList.remove('active');
                        addCourse[ind].innerHTML = 'Добавить в корзину';
                        addCourse[ind].classList.remove('locked');
                        localStorage.setItem('course' + (ind + 1), 0);
                    })();
                checkPrice();
            });
        });

        submitBtns.forEach((el, ind) => {
            el.addEventListener('click', (e) => {
                e.preventDefault();
                validateEmail() === true ?
                (() => {
                    errorElm.style.display = 'none';

                    courses[0].checked === true ? 
                        course1 = 1: 
                        course1 = 0;
                    courses[1].checked === true ?
                        course2 = 1:
                        course2 = 0;
                    courses[2].checked === true ?
                        course3 = 1:
                        course3 = 0;
                    if(course1 === 0 && course2 === 0 && course3 === 0) {
                        errorElm.style.display = 'block';
                        errorElm.innerHTML = 'Вы не выбрали ни одного курса. <br> Выберите хотя бы 1 курс';
                    } else {
                        let paytype = el.getAttribute('data-paytype');
                        let pparams = "?pt="+paytype+"&course1="+course1+"&course2="+course2+"&course3="+course3+"&coupon="+coupon+"&email="+btoa(emails[0].value); 
                        saveCookies(emails[0].value, course1, course2, course3);
                        window.open("php/order.php"+pparams, "_blank");
                    }
                })() : null;
            })
        });
    };

    const checkCoupon = () => {
        let cuponBtn = document.querySelectorAll('[data-cuponBtn]');
        let inputText = document.querySelectorAll('[data-cuponInp]');
        let couponText = document.querySelectorAll('[data-cuponText]');
        let priceHandlers = document.querySelectorAll('[data-priceHandler]');
        let cuponObj = {
            couponsMD5: [
                "206ebd415d9b66824c398d079f514157","4548b225318ffe56734890dda15252bc", "c746e514c550d492ffec09b3f9656e55", "5985727f46a221e508036b7ce12c8f8c", "4fbd180ace62b8532328e5653e1afc22", "4511ddb97563cd33ef97fbdfa63790d0", "593f4ff55601c809d7b32a874e4aa15b"
            ],
            couponsNames: [
                "<b>-10%</b> от FLATINGO",
                "<b>-10%</b> для новых учеников",
                "<b>-10%</b> для новых учеников",
                "<b>-10%</b> для новых учеников",
                "<b>-10%</b> для новых учеников",
                "<b>-10%</b> от Хауди Хо",
                "<b>-10%</b> от Моделлера"
            ],
            couponsDiscounts: [
                10,
                10,
                10,
                10,
                10,
                10,
                10

            ]
        }
        cuponBtn.forEach((el, ind) => {
            el.addEventListener('click', () => {
                if (cuponObj.couponsMD5.includes(HashMD5(inputText[ind].value.toUpperCase()))) {
                    let indInArr = cuponObj.couponsMD5.indexOf(HashMD5(inputText[ind].value.toUpperCase()));
                    couponText.forEach(el => {
                        el.innerHTML = cuponObj.couponsNames[indInArr];
                    });
                    inputText.forEach(el => {
                        el.value = inputText[ind].value;
                    });
                    discount = cuponObj.couponsDiscounts[indInArr];
                    coupon = cuponObj.couponsMD5[indInArr];
                    priceHandlers.forEach(el => {
                       el.innerHTML = (el.dataset.pricehandler - (el.dataset.pricehandler/100*cuponObj.couponsDiscounts[indInArr])).toFixed() ;
                    });
                    checkPrice();
                    return true;
                }
                else {
                    couponText.forEach(el => {
                        el.classList.add('active');
                        el.innerHTML = "Купон не существует";
                    });
                    inputText.forEach(el => {
                        el.value = inputText[ind].value;
                    });
                    discount = 0;
                    priceHandlers.forEach(el => {
                        console.log(el.dataset.pricehandler)
                        el.innerHTML = el.dataset.pricehandler;
                     });
                    checkPrice();
                    return false;
                }
            });
        });
    };
    function HashMD5(d) {var result = M(V(Y(X(d),8*d.length)));return result.toLowerCase()};function M(d){for(var _,m="0123456789ABCDEF",f="",r=0;r<d.length;r++)_=d.charCodeAt(r),f+=m.charAt(_>>>4&15)+m.charAt(15&_);return f}function X(d){for(var _=Array(d.length>>2),m=0;m<_.length;m++)_[m]=0;for(m=0;m<8*d.length;m+=8)_[m>>5]|=(255&d.charCodeAt(m/8))<<m%32;return _}function V(d){for(var _="",m=0;m<32*d.length;m+=8)_+=String.fromCharCode(d[m>>5]>>>m%32&255);return _}function Y(d,_){d[_>>5]|=128<<_%32,d[14+(_+64>>>9<<4)]=_;for(var m=1732584193,f=-271733879,r=-1732584194,i=271733878,n=0;n<d.length;n+=16){var h=m,t=f,g=r,e=i;f=md5_ii(f=md5_ii(f=md5_ii(f=md5_ii(f=md5_hh(f=md5_hh(f=md5_hh(f=md5_hh(f=md5_gg(f=md5_gg(f=md5_gg(f=md5_gg(f=md5_ff(f=md5_ff(f=md5_ff(f=md5_ff(f,r=md5_ff(r,i=md5_ff(i,m=md5_ff(m,f,r,i,d[n+0],7,-680876936),f,r,d[n+1],12,-389564586),m,f,d[n+2],17,606105819),i,m,d[n+3],22,-1044525330),r=md5_ff(r,i=md5_ff(i,m=md5_ff(m,f,r,i,d[n+4],7,-176418897),f,r,d[n+5],12,1200080426),m,f,d[n+6],17,-1473231341),i,m,d[n+7],22,-45705983),r=md5_ff(r,i=md5_ff(i,m=md5_ff(m,f,r,i,d[n+8],7,1770035416),f,r,d[n+9],12,-1958414417),m,f,d[n+10],17,-42063),i,m,d[n+11],22,-1990404162),r=md5_ff(r,i=md5_ff(i,m=md5_ff(m,f,r,i,d[n+12],7,1804603682),f,r,d[n+13],12,-40341101),m,f,d[n+14],17,-1502002290),i,m,d[n+15],22,1236535329),r=md5_gg(r,i=md5_gg(i,m=md5_gg(m,f,r,i,d[n+1],5,-165796510),f,r,d[n+6],9,-1069501632),m,f,d[n+11],14,643717713),i,m,d[n+0],20,-373897302),r=md5_gg(r,i=md5_gg(i,m=md5_gg(m,f,r,i,d[n+5],5,-701558691),f,r,d[n+10],9,38016083),m,f,d[n+15],14,-660478335),i,m,d[n+4],20,-405537848),r=md5_gg(r,i=md5_gg(i,m=md5_gg(m,f,r,i,d[n+9],5,568446438),f,r,d[n+14],9,-1019803690),m,f,d[n+3],14,-187363961),i,m,d[n+8],20,1163531501),r=md5_gg(r,i=md5_gg(i,m=md5_gg(m,f,r,i,d[n+13],5,-1444681467),f,r,d[n+2],9,-51403784),m,f,d[n+7],14,1735328473),i,m,d[n+12],20,-1926607734),r=md5_hh(r,i=md5_hh(i,m=md5_hh(m,f,r,i,d[n+5],4,-378558),f,r,d[n+8],11,-2022574463),m,f,d[n+11],16,1839030562),i,m,d[n+14],23,-35309556),r=md5_hh(r,i=md5_hh(i,m=md5_hh(m,f,r,i,d[n+1],4,-1530992060),f,r,d[n+4],11,1272893353),m,f,d[n+7],16,-155497632),i,m,d[n+10],23,-1094730640),r=md5_hh(r,i=md5_hh(i,m=md5_hh(m,f,r,i,d[n+13],4,681279174),f,r,d[n+0],11,-358537222),m,f,d[n+3],16,-722521979),i,m,d[n+6],23,76029189),r=md5_hh(r,i=md5_hh(i,m=md5_hh(m,f,r,i,d[n+9],4,-640364487),f,r,d[n+12],11,-421815835),m,f,d[n+15],16,530742520),i,m,d[n+2],23,-995338651),r=md5_ii(r,i=md5_ii(i,m=md5_ii(m,f,r,i,d[n+0],6,-198630844),f,r,d[n+7],10,1126891415),m,f,d[n+14],15,-1416354905),i,m,d[n+5],21,-57434055),r=md5_ii(r,i=md5_ii(i,m=md5_ii(m,f,r,i,d[n+12],6,1700485571),f,r,d[n+3],10,-1894986606),m,f,d[n+10],15,-1051523),i,m,d[n+1],21,-2054922799),r=md5_ii(r,i=md5_ii(i,m=md5_ii(m,f,r,i,d[n+8],6,1873313359),f,r,d[n+15],10,-30611744),m,f,d[n+6],15,-1560198380),i,m,d[n+13],21,1309151649),r=md5_ii(r,i=md5_ii(i,m=md5_ii(m,f,r,i,d[n+4],6,-145523070),f,r,d[n+11],10,-1120210379),m,f,d[n+2],15,718787259),i,m,d[n+9],21,-343485551),m=safe_add(m,h),f=safe_add(f,t),r=safe_add(r,g),i=safe_add(i,e)}return Array(m,f,r,i)}function md5_cmn(d,_,m,f,r,i){return safe_add(bit_rol(safe_add(safe_add(_,d),safe_add(f,i)),r),m)}function md5_ff(d,_,m,f,r,i,n){return md5_cmn(_&m|~_&f,d,_,r,i,n)}function md5_gg(d,_,m,f,r,i,n){return md5_cmn(_&f|m&~f,d,_,r,i,n)}function md5_hh(d,_,m,f,r,i,n){return md5_cmn(_^m^f,d,_,r,i,n)}function md5_ii(d,_,m,f,r,i,n){return md5_cmn(m^(_|~f),d,_,r,i,n)}function safe_add(d,_){var m=(65535&d)+(65535&_);return(d>>16)+(_>>16)+(m>>16)<<16|65535&m}function bit_rol(d,_){return d<<_|d>>>32-_}
    
    const checkPrice = () => {
        let price = 0;
        let oldPrice = 0;
        let coursesPrice = 0;
        let cPrice = 0;
        let cartItemsCounter = 0;
        let courseItemsCounter = 0;
        let oldPriceEl = document.getElementById('old_price');
        let buyText = document.getElementById('buy_text');
        let ALLoldPriceEl = document.getElementById("old_price_all");

        buyText.innerHTML = '<span>Ваш заказ: </span>'
        courses.forEach((el) => {
            el.checked === true ?
                (() => {
                    let priceVal = el.parentNode.querySelector('[data-price]').getAttribute('data-price');
                    let oldPriceVal = el.parentNode.querySelector('[data-oldPrice]').getAttribute('data-oldPrice');
                    price += parseInt(priceVal);
                    coursesPrice += parseInt(priceVal);
                    cPrice += parseInt(priceVal);
                    oldPrice += parseInt(oldPriceVal);
                    buyText.innerHTML +=  (cartItemsCounter === 0 ? ' ' : ' + ') + el.nextElementSibling.querySelector('.course-name').innerHTML;
                    cartItemsCounter++;
                    courseItemsCounter++;
                    // if(courseItemsCounter >= 2){
                    //     cPrice = (parseInt(coursesPrice) - (parseInt(coursesPrice) * (20/100)));
                    // }
                })() :
                null;
        });
        cartItemsEl.innerHTML = cartItemsCounter;
            if(discount === 0) {
                priceElm.innerHTML = price.toFixed();
                oldPriceEl.innerHTML = oldPrice.toFixed();
            } else {
                priceElm.innerHTML = (price - (price * (discount/100))).toFixed();
                oldPriceEl.innerHTML = oldPrice.toFixed();
            }
            
            priceElm.innerHTML === oldPriceEl.innerHTML ? 
            ALLoldPriceEl.style.display = 'none' : ALLoldPriceEl.style.display = 'inline';
    };
    
    const validateEmail = () => {
        let regEx =  /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
        let valid = true;

        emails.forEach((el) => {
            if(!regEx.test(el.value)){
                valid = false;
                errorElm.innerHTML = 'Неправильный формат EMAIL. Пожалуйста, проверьте Вашу почту';
                errorElm.style.display = 'block';
            }
        });
        if(emails[0].value !== emails[1].value){
            valid = false;
            errorElm.innerHTML = 'EMAIL должен совпадать в обеих полях! Пожалуйста, проверьте вашу почту.';
            errorElm.style.display = 'block';
        }
        
        return valid;
    };

    const saveCookies = (emailField, course1, course2, course3) => {
        document.cookie = "userEmail="+emailField+"; path=/";
        document.cookie = "course1="+course1+"; path=/";
        document.cookie = "course2="+course2+"; path=/";
        document.cookie = "course3="+course3+"; path=/";
    }
    
    checkCoupon();
    cart();
    checkLocalStorage();
})();
