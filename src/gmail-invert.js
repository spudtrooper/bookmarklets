/*
 * @Description: Shows inverted history of gmail messages. You have to select the node and then click the link.
 */
(function () {

  function createBox(els) {
    let box = document.getElementById('_box_');
    if (box) {
      box.parentNode.removeChild(box);
    }
    box = document.createElement('div');
    box.id = '_box_';
    Object.assign(box.style, {
      'position': 'fixed',
      'top': '50px',
      'left': '10px',
      'padding': '10px',
      'width': '90%',
      'height': '90%',
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
      'zIndez': '1000000000',
    });
    closeBtn.addEventListener('click', function () {
      box.parentNode.removeChild(box);
    });
    let list = document.createElement('ol');
    box.appendChild(list);
    els.forEach(el => {
      let listItem = document.createElement('li');
      Object.assign(listItem.style, {
        'margin': '10px',
        'padding': '10px',
        'border': '1px solid black',
        'overflow': 'auto',
        'backgroundColor': '#fff',
      });
      listItem.appendChild(el);
      list.appendChild(listItem);
    })
  }

  function invertQuotes() {
    let selectedNode = getSelection() && getSelection().anchorNode;
    if (!selectedNode) {
      return new Error('no selected node');
    }
    let elWithMsgId = null;
    for (let el = selectedNode; !!el; el = el.parentNode) {
      if (el.nodeName == '#text') continue;
      if (el.getAttribute('data-message-id')) {
        elWithMsgId = el;
        break;
      }
    }
    if (!elWithMsgId) {
      return new Error('could not find node with message id');
    }

    let quoteEls = [];

    let loop = (el) => {
      let gmailQuoteEls = el.querySelectorAll('div.gmail_quote');
      if (!gmailQuoteEls || !gmailQuoteEls.length) return;
      let gmailQuoteEl = gmailQuoteEls[0];
      console.log(gmailQuoteEl);
      quoteEls.push(gmailQuoteEl);
      loop(gmailQuoteEl);
    };

    loop(elWithMsgId);

    if (!quoteEls.length) {
      return new Error('no quoted messages found');
    }

    createBox(quoteEls.reverse());


    return null;
  }

  function main() {
    let err = invertQuotes();
    if (err) {
      alert(err.message);
    }
  }

  main();
})();
