/*
 * @Description: Expands the list of IG story visitors into a new div the height of the window.
 */
(function () {
  function clickSeenByButton() {
    Array.from(document.getElementsByTagName('button')).forEach((el) => {
      if (el.innerText && el.innerText.match(/^Seen by \d+$/)) {
        console.log('click');
        el.click();
      }
    });
  }

  function findScrollDiv() {
    let res;
    Array.from(document.getElementsByTagName('div')).forEach((el) => {
      if (el.style && el.style.overflow == 'hidden auto') {
        res = el;
        return;
      }
    });
    return res;
  }

  function doScroll(el, fn) {
    let titlesToInfo = {};
    let loop = (nextScrollHeight) => {
      Array.from(document.getElementsByTagName('a')).filter(el => {
        return el.getAttribute('role') == 'link' && el.href && el.href.match(/https:\/\/(www\.)?instagram\.com\/[a-z0-9]+\/?/);
      }).map(el => {
        function findImage(t) {
          let res;
          Array.from(document.getElementsByTagName('img')).forEach((el) => {
            if (el.alt && el.alt.startsWith(t) && el.alt.endsWith('profile picture')) {
              res = el.src;
              return;
            }
          });
          return res;
        }        
        let t = el.title;
        if (!t) {
          t = el.href.replace(/.*\.instagram.com\/?/, '').replace(/\//g, '');
        }
        let img = findImage(t);
        let p = el.parentNode.parentNode.parentNode.parentNode;
        let nameParts = p.innerText.split('\n'),
          name = nameParts[nameParts.length - 1];
        let verified = p.innerText.includes('Verified'),        
          verifiedClass = verified ? '_act0 _a9_u _9ys8' : ''; /* TODO: This is going to break */
        let info = {
          img: img,
          name: name,
          verifiedClass: verifiedClass,
        };
        titlesToInfo[t] = info;
      });
      console.log('titles', Object.keys(titlesToInfo).length);
      if (nextScrollHeight > el.scrollHeight) {
        fn.call(null, titlesToInfo);
        return;
      }
      el.scrollTo(0, nextScrollHeight);
      setTimeout(loop.bind(null, nextScrollHeight + 100), 200);
    };
    loop(100);
    return true;
  }

  function scroll(fn) {
    let loop = (count) => {
      if (!count) {
        alert('cannot find scroll div');
        return;
      }
      let el = findScrollDiv();
      if (el) {
        doScroll(el, fn);
        return;
      }
      setTimeout(loop.bind(null, count - 1), 200);
    };
    loop(3);
  }

  function createElement(tag, parent, style) {
    let newNode = document.createElement(tag);
    parent.appendChild(newNode);
    if (style) {
      Object.assign(newNode.style, style);
    }
    return newNode;
  }

  function waitForViewers(callback) {
    console.log('waitForViewers');
    const divs = document.getElementsByTagName('div');
    for (let i = 0; i < divs.length; i++) {
      const div = divs[i];
      if (div.style && div.style.maxHeight == '400px') {
        callback.call(null);
        return;
      }
    }
    setTimeout(waitForViewers.bind(null, callback), 200);
  }

  function startScrolling() {
    scroll((titlesToInfo) => {
      let regularTitleInfos = {}, verifiedTitleInfos = {};
      for (const title in titlesToInfo) {
        const info = titlesToInfo[title];
        if (info.verifiedClass) {
          verifiedTitleInfos[title] = info;
        } else {
          regularTitleInfos[title] = info;
        }
      }

      let div = createElement('div', document.body, {
        position: 'absolute',
        top: '10px',
        left: '10px',
        padding: '10px',
        border: '1px solid black',
        overflow: 'auto',
        'z-index': 1000000,
        'background-color': '#fff',
        'max-height': (window.outerHeight - 100) + 'px',
      });
      let ul = createElement('ul', div);

      let processTitles = (titles) => {
        titles.sort();
        titles.forEach(t => {
          let info = titlesToInfo[t],
            src = info.img,
            name = info.name,
            verifiedClass = info.verifiedClass;
          let li = createElement('li', ul);
          let liContent = createElement('span', li, {
            'display': 'block',
          });
          let img = createElement('img', liContent, {
            'width': '22px',
            'height': '22px',
            'border-radius': '50%',
            'vertical-align': 'middle',
          });
          img.src = src;
          let a = createElement('a', liContent, {
            'vertical-align': 'middle',
            'color': '#262626',
            'font-weight': '600',
            'margin-left': '5px',
          });
          a.href = 'http://instagram.com/' + t + '/';
          a.innerHTML = '<b>' + t + '</b>' + ' - ' + '<span style=\'color:#8e8e8e; font-weight:400;\'>' + name + '</span>';
          if (verifiedClass) {
            liContent.innerHTML += '&nbsp;';
            let verifiedSpan = createElement('span', liContent, {
              'display': 'inline',
              'color': '#fff',
            });
            verifiedSpan.className = verifiedClass;
            verifiedSpan.innerText = '__';
          }
        });
      };

      const verifiedTitles = Object.keys(verifiedTitleInfos);
      processTitles(verifiedTitles);
      const regularTitles = Object.keys(regularTitleInfos);
      processTitles(regularTitles);
    });
  }

  function main() {
    clickSeenByButton();
    waitForViewers(startScrolling);
  }

  main();
})();