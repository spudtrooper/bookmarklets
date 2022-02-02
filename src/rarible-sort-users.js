
/*
 * @Title: Rarible Sort Users
 * @Description: Sort users by followers on rarible search page (e.g. https://rarible.com/search/users/art)
 */
(function () {
    let times = parseInt(prompt('# iterations', '1'));
    let count = 0;
    let loop = () => {
        let userMap = new Map();
        Array.from(document.querySelectorAll('a')).filter((el) => el.getAttribute('data-marker') && el.getAttribute('data-marker').startsWith('root/appPage/search/lists/users/cards/')).forEach((el) => {
            let m = el.innerText.match(/(\d+) followers/);
            if (m) userMap.set(el, parseInt(m[1]));
        });
        Array.from(document.querySelectorAll('div')).filter((el) => el.style.position == 'absolute').forEach((el) => {
            el.removeChild(el.firstChild);
        });
        let sorted = new Map([...userMap.entries()].sort((a, b) => b[1] - a[1]));
        let sortedEls = [];
        sorted.forEach((count, el) => sortedEls.push(el));
        Array.from(document.querySelectorAll('div')).filter((el) => el.style.position == 'absolute').forEach((el) => {
            let a = sortedEls.pop(0);
            el.appendChild(a);
        });
        window.scrollTo(0, document.body.scrollHeight);
        if (++count < times) {
            setTimeout(loop, 3000);
        }
    };
    loop();
})();
