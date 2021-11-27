/*
 * @Title: Street Easy All
 * @Description: Shows a page of all streeteasy.com listings instead of paging.
 */
(function () {

  function findMax() {
    let ul = document.getElementsByClassName('pagination-list-container')[0];
    let li = ul.getElementsByClassName('page gap')[0].nextSibling.nextSibling;
    let a = li.firstChild.nextSibling;
    let max = parseInt(a.innerText);
    let baseUrl = a.href.replace('?page=' + max, '');
    return {
      max: max,
      baseUrl: baseUrl,
    };
  }

  function getOrCreate(tag, id, opt_parent) {
    let el = document.getElementById(id);
    if (!el) {
      el = document.createElement(tag);
      if (opt_parent) {
        opt_parent.appendChild(el);
      }
    }
    return el;
  }

  function makeRequest(div, maxObj, page) {
    let url = maxObj.baseUrl + '?page=' + page;
    console.log('url', url);
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        let text = xhttp.responseText;
        var el = document.createElement('html');
        el.innerHTML = text;
        let cards = el.getElementsByClassName(
          'listingCard listingCard--rentalCard jsItem');
        for (let j = 0; j < cards.length; j++) {
          let li = document.createElement('SPAN');
          li.style.float = 'left';
          li.appendChild(cards[j]);
          div.appendChild(li);
        }
      }
    };
    xhttp.open('GET', url, true);
    xhttp.send();
  }

  function makeRequests(maxObj) {
    let max = maxObj.max;
    let div = getOrCreate('SPAN', '_listings_', document.body);
    div.style.width = '100%';
    div.style.display = 'inline';
    let loop = (i) => {
      console.log('Creating listings for ' + i);
      makeRequest(div, maxObj, i);
      if (i <= max) {
        setTimeout(function () {
          loop(i + 1);
        }, 3000);
      } else {
        console.log('done');
      }
    };
    loop(1);
  }

  function main() {
    let max = findMax();
    makeRequests(max);
  }

  main();
})();
