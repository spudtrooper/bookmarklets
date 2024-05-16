/*
 * @Description: Follows people in bulk, 25 at a time.
 */
(function () {
  function clickFollowersButton() {
    Array.from(document.getElementsByTagName('a')).forEach((el) => {
      if (el.href && el.href.match(/\/followers\//)) {
        console.log('click');
        el.click();
      }
    });
  }

  function findFollowButtons() {
    return Array.from(document.querySelectorAll('button')).filter(el => el.textContent == 'Follow');
  }

  function findFollowButton() {
    return Array.from(document.querySelectorAll('button')).find(el => el.textContent == 'Follow');
  }

  function expandDialog() {
    const div = Array.from(document.querySelectorAll('div')).filter(el => el.style?.maxHeight === '400px')[0];
    if (!div) return;
    div.style.maxHeight = '1800px';
  }

  function click(btn) {
    btn.style.backgroundColor = 'green';
    btn.click();
  }

  function main() {
    clickFollowersButton();

    expandDialog();

    const loop = () => {
      const followButtons = findFollowButtons();
      if (!followButtons || !followButtons.length || followButtons.length < 5) {
        console.log('waiting for follow buttons');
        setTimeout(loop, 1000);
        return;
      }
      const followNext = (done) => {
        let btn = findFollowButton();
        if (!btn) {
          setTimeout(followNext.bind(null, done), 200);
          return;
        }
        click(btn);
        done.call(null);
      };
      const burnDownFollowingButtons = () => {
        if (followButtons.length) {
          let nextBtn = followButtons.pop(0);
          nextBtn.click();
          followNext(burnDownFollowingButtons);
        }

      };
      burnDownFollowingButtons();
    };
    loop();
  }

  main();
})();