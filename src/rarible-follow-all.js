
/*
 * @Title: Rarible Follow All
 * @Description: Follow all on rarible.com
 */
(function () {
    let times = 100;
    let count = 0;
    let loop = () => {
        Array.from(document.querySelectorAll('button')).filter((el) => el.innerText == 'Follow').forEach((el) => el.click());
        let el = document.getElementsByClassName('ReactVirtualized__Grid ReactVirtualized__List')[0];
        el.scrollTop = 2 * el.scrollHeight / 3;
        if (++count < times) {
            setTimeout(loop, 3000);
        }
    };
    loop();
    setInterval(loop, 1000 * 30);
})();
