
/*
 * @Title: Rarible Follow One
 * @Description: Follow the first person on rarible.com
 */
(function () {
    Array.from(document.querySelectorAll('button')).filter((el) => el.innerText == 'Follow').forEach((el) => el.click());
})();
