/*
 * @Title: Twimmage Open All
 * @Description: Open links from twimmage auto output
 */
// javascript:void function(){function e(){var e=document.getElementsByTagName("md-card");console.log(e.length+" md-cards"),e&&e.length||(e=document.getElementsByTagName("card")),console.log(e.length+" cards");for(var t=null,n=0;n<e.length;n++){var a=e[n],r=a.getElementsByClassName("card-title-text ng-binding");if(r&&r.length){var l=r[0].innerText.trim();if("twitterScreenName"==l){t=a;break}}}if(t){for(var o=t.getElementsByClassName("table-body")[0],g=o.getElementsByTagName("text"),i=[],n=0;n<g.length;n++){var c=g[n];if(c.innerHTML){var m=c.innerHTML.trim();/^[0-9]+$/.test(m)||i.push(m)}}return i}}function t(t){for(var n=e(),a=0;a<n.length;a++){var r=t.call(null,n[a]);window.open(r,"_"+a)}}function n(){function e(e){return"https://instagram.com/"+e}t(e)}try{n()}catch(a){alert(a),console.log(a)}}();
(function() { 
  function findLinks() {
    let els = document.getElementsByTagName('a');
    let res = []
    for (let i=0; i<els.length;i++) {
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
    for (let i=0; i<N; i++) {
      let u = urls[i];
      let n =  u.split('/')[u.split('/').length-1];
      window.open(u, '_' + n);
    }
  }

  main();  
})();
