(function () {
    if (esx.detectVersion() < 6) {
        var moveToRequestPage = confirm("Пожалуйста, установите современную версию веб-браузера с поддержкой EcmaScript 2016 для корректной работы калькулятора.\n\n" +
            "Сейчас вы будете перенаправлены на форму запроса консультации.\n\n" +
            "Пожалуйста заполните ее и мы рассчитаем стоимость для вас.");
        if (moveToRequestPage == true) {
            window.location.href = 'https://infoboxcloud.ru/request/';
        }
    }
})();