
/*
 * @Title: Rarible Follow All
 * @Description: Follow all on rarible.com
 */
(function () {
    Array.from(document.querySelectorAll('button')).filter((el) => el.innerText == 'Follow').forEach((el) => el.click());
})();
