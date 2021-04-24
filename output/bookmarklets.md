
# Bookmarklets

To install, drag the links not titled 'src' to your toolbar.


*	[Instagram Sizes](javascript:(function(){let a=document.querySelector('img[sizes="600px"]').getAttribute('srcset');a.split(',').map(function(b){let a=b.split(' ');return a[1]+' '+a[0]}).forEach(function(a){console.log(a)})})()) ([src](https://github.com/spudtrooper/bookmarklets/blob/main/js/instagram-sizes.js)) - Shows the various sized images for an instagram image. To use: (1) Click on a thumbnail (2) Run this (3) See the output in the dev console.

*	[Twitter Like All](javascript:(function(){let b=document.getElementsByTagName('div'),c=0;for(var a=0;a<b.length;a++){let d=b[a];d.getAttribute('aria-label')&&d.getAttribute('aria-label').match(/.*\. Like$/)&&(d.style.backgroundColor='#00ff00',d.click(),c++)}window.scrollTo(0,document.body.scrollHeight),console.log('Liked '+c+' tweets')})()) ([src](https://github.com/spudtrooper/bookmarklets/blob/main/js/twitter-like-all.js)) - Likes all the tweets on a twitter page, then scrolls to the bottom so you can resume.

*	[Wikipedia Menu Hover](javascript:(function(){let a=$('#toc');a.css('position','fixed'),a.css('right','10px'),a.css('top','90px'),a.css('height','80%'),a.css('overflow','auto'),a.css('display','block')})()) ([src](https://github.com/spudtrooper/bookmarklets/blob/main/js/wikipedia-toc.js)) - Makes wikipedia menus hover and track with the page, e.g. https://imgur.com/a/N6kMzrg.

		