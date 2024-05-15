
/*
 * @Title: Rarible Like All
 * @Description: Like all on rarible.com
 */
(function () {
    let loop = () => {
        Array.from(document.getElementsByClassName('sc-bdvvtL sc-gKclnd sc-iCfMLu sc-cjrPHo kMXwoE eehqFj cCtwBW sc-cvlWTT dVFwth')).forEach((el) => el.click());
        window.scrollTo(0, 2 * document.body.scrollHeight / 3);
        Array.from(document.querySelectorAll('button')).filter((el) => el.innerText == 'Load more').forEach((el) => el.click());
        setTimeout(loop, 1000);
    };
    loop();
})();
