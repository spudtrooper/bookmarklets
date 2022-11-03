/*
 * @Title: Congress Show Titles
 * @Description: Shows a box with the titles of bills returned from a search on congress.gov
 * @Image: https://imgur.com/YrMc4Fk.png
 */
(function () {

  function findEls() {
    let els = [];
    Array.from(document.getElementsByTagName('span')).forEach((el, i) => {
      if (el.className == 'result-title') {
        els.push(el);
      }
    });
    els.sort((a, b) => {
      let fst = a.innerText.toLowerCase();
      let snd = b.innerText.toLowerCase();
      if (fst < snd) {
        return -1;
      }
      if (snd < fst) {
        return 1;
      }
      return 0;
    });
    return els;
  }

  function createBox(els) {
    let box = document.getElementById('_box_');
    if (box) {
      box.parentNode.removeChild(box);
    }
    box = document.createElement('div');
    box.id = '_box_';
    Object.assign(box.style, {
      'position': 'fixed',
      'top': '10px',
      'right': '10px',
      'padding': '10px',
      'minWidth': '550px',
      'maxWidth': '550px',
      'minHeight': '800px',
      'maxHeight': '800px',
      'backgroundColor': '#ddd',
      'zIndez': '1000000000',
      'border': '1px solid black',
      'overflow': 'auto',
    });
    document.body.append(box);
    let closeBtn = document.createElement('a');
    box.append(closeBtn);
    closeBtn.innerText = 'close';
    closeBtn.href = '#';
    Object.assign(closeBtn.style, {
      'margin-bottom': '20px',
    });
    closeBtn.addEventListener('click', function () {
      box.parentNode.removeChild(box);
    });
    let list = document.createElement('ol');
    box.appendChild(list);
    for (let i = 0; i < els.length; i++) {
      let el = els[i];
      let link = document.createElement('a');
      link.innerText = el.innerText;
      link.href = '#';
      link.addEventListener('click', function (el) {
        window.scrollTo(document.body, el.offsetTop, 250);
      }.bind(null, el));
      let listItem = document.createElement('li');
      listItem.appendChild(link);
      list.appendChild(listItem);
    }
  }

  function main() {
    let els = findEls();
    createBox(els);
  }

  main();
})();
