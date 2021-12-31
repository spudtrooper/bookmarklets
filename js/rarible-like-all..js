
/*
 * @Title: Rarible Like All
 * @Description: Like all on rarible.com
 */
(function () {
    let times = parseInt(prompt('# iterations', '1'));
    let count = 0;
    let loop = () => {
        Array.from(document.getElementsByClassName('sc-bdvvtL sc-gKclnd sc-iCfMLu sc-cjrPHo kMXwoE eehqFj cCtwBW sc-cvlWTT dVFwth')).forEach((el) => el.click());
        window.scrollTo(0, document.body.scrollHeight);
        setTimeout(function () {
            Array.from(document.querySelectorAll('button')).filter((el) => el.innerText == 'Load more').forEach((el) => el.click());
            if (++count < times) {
                setTimeout(loop, 3000);
            }
        }, 2000);
    };
    loop();
})();
