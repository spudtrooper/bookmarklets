
/*
 * @Title: Metamask Sign Auto
 * @Description: Automatically signs trivial metamask signature requests
 */
(function () {
    let clicks = 0;
    const sleep = 150;
    const longSleep = 3000;
    let clickSign = () => {
        let div = document.getElementsByClassName('request-signature__rows')[0];
        if (!div) return;
        if (!div.innerText.includes('I would like to follow user')) return;
        Array.from(document.getElementsByClassName('button')).filter((el) => el.getAttribute('data-testid') && el.getAttribute('data-testid') == 'request-signature__sign').forEach((el) => el.click());
        console.log('clicks:' + (++clicks));
        if (clicks % 50 == 0) {
            console.log('sleeping...');
            setTimeout(clickSign, longSleep);
        } else {
            setTimeout(clickSign, sleep);
        }
    };
    setTimeout(clickSign, 5000);
})();
