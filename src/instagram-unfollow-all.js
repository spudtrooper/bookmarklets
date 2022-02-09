/*
 * @Description: Unfollows people in bulk, 25 at a time.
 */
(function () {
    function clickFollowingButton() {
        Array.from(document.getElementsByTagName('a')).forEach((el) => {
            if (el.href && el.href.match(/\/following\//)) {
                console.log('click');
                el.click();
            }
        });
    }

    function findFollowingButtons() {
        return Array.from(document.querySelectorAll('button')).filter(el => el.textContent == 'Following');
    }

    function findUnfollowButton() {
        return Array.from(document.querySelectorAll('button')).find(el => el.textContent == 'Unfollow');
    }

    function main() {
        clickFollowingButton();

        let loop = () => {
            let followingButtons = findFollowingButtons();
            if (!followingButtons || !followingButtons.length || followingButtons.length < 5) {
                console.log('waiting for following buttons');
                setTimeout(loop, 1000);
                return;
            }
            let unfollowNext = (done) => {
                let btn = findUnfollowButton();
                if (!btn) {
                    setTimeout(unfollowNext.bind(null, done), 200);
                    return;
                }
                btn.click();
                done.call(null);
            };
            let burnDownFollowingButtons = () => {
                if (followingButtons.length) {
                    let nextBtn = followingButtons.pop(0);
                    nextBtn.click();
                    unfollowNext(burnDownFollowingButtons);
                }

            };
            burnDownFollowingButtons();
        };
        loop();
    }

    main();
})();