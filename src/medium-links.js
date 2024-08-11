/*
 * @Title: Medium Links
 * @Description: Display links from medium articles
 */
(function () {
  function extractLinksAndContent() {
    const article = document.querySelector('article');
    if (!article) {
      alert('Could not find the article body');
      return;
    }
    const links = article.querySelectorAll(`a[href^='http\']`);
    const results = [];
    links.forEach(link => {
      const paragraph = link.closest('p');
      if (paragraph) {
        const content = paragraph.textContent.trim();
        results.push({
          link: link.href,
          content: content
        });
      }
    });
    return results;
  }

  function displayResults(results) {
    const overlay = document.createElement('div');
    overlay.style.cssText = ` position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0, 0, 0, 0.8); color: white; padding: 20px; font-family: Arial, sans-serif; overflow-y: auto; z-index: 9999; `;
    const closeButton = document.createElement('button');
    closeButton.textContent = 'Close';
    closeButton.style.cssText = ` position: fixed; top: 10px; right: 10px; padding: 5px 10px; background: white; color: black; border: none; cursor: pointer; `;
    closeButton.onclick = () => document.body.removeChild(overlay);
    const content = results.map(item => ` <div style='margin-bottom: 20px;'> <a href='${item.link}' style='color: #58a6ff;'>${item.link}</a> <p>${item.content}</p> </div> `).join('');
    overlay.innerHTML = content;
    overlay.appendChild(closeButton);
    document.body.appendChild(overlay);
  }
  const results = extractLinksAndContent();
  displayResults(results);
})();