/**
 * @Description: Likes all the tweets on a twitter page, then scrolls to the bottom so you can resume.
 */
(function() {
    let divs = document.getElementsByTagName('div');
    let count = 0;
    for (var i = 0; i < divs.length; i++) {
	let div = divs[i];
	if (div.getAttribute('aria-label') &&
	    div.getAttribute('aria-label').match(/.*\. Like$/)) {
	    div.style.backgroundColor = '#00ff00';
	    div.click();
	    count++;
	}
    }
    window.scrollTo(0, document.body.scrollHeight);
    console.log('Liked ' + count + ' tweets');
})();