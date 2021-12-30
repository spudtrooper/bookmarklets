
/*
 * @Title: Rarible Follow All
 * @Description: Follow all on rarible.com
 */
(function () {
    let times = prompt('# iterations', '1');
    let count = 0;
    let loop = () => {
        Array.from(document.querySelectorAll('button')).filter((el) => el.innerText == 'Follow').forEach((el) => el.click());
        let el = document.getElementsByClassName('ReactVirtualized__Grid ReactVirtualized__List')[0];
        el.scrollTop = el.scrollHeight;
        count++;
        if (count < 5) {
            setTimeout(loop, 1000);
        }
    };
    loop();
})();
