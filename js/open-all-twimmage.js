/*
 * @Title: Twimmage Open All
 * @Description: Open links from twimmage auto output
 */
(function () {
  function findLinks() {
    let els = document.getElementsByTagName('a');
    let res = []
    for (let i = 0; i < els.length; i++) {
      let el = els[i];
      if (el.href && el.href.match(/^https?:\/\/instagram.com\/[a-zA-Z0-9_]+$/)) {
        res.push(el.href);
      }
    }
    return res;
  }

  function main() {
    let urls = findLinks();
    let N = parseInt(window.prompt('Number of results', 30));
    for (let i = 0; i < N; i++) {
      let u = urls[i];
      let n = u.split('/')[u.split('/').length - 1];
      window.open(u, '_' + n);
    }
  }

  main();
})();
