
# Bookmarklets

To install, drag the links not titled 'src' to your toolbar.


*	[Instagram Sizes](javascript:(function(){let a=document.querySelector(&#39;img[sizes=&#34;600px&#34;]&#39;).getAttribute(&#39;srcset&#39;);a.split(&#39;,&#39;).map(function(b){let a=b.split(&#39; &#39;);return a[1]&#43;&#39; &#39;&#43;a[0]}).forEach(function(a){console.log(a)})})()) ([src](https://github.com/spudtrooper/bookmarklets/blob/main/js/instagram-sizes.js)) - Shows the various sized images for an instagram image. To use: (1) Click on a thumbnail (2) Run this (3) See the output in the dev console.

*	[Twitter Like All](javascript:(function(){let b=document.getElementsByTagName(&#39;div&#39;),c=0;for(var a=0;a&lt;b.length;a&#43;&#43;){let d=b[a];d.getAttribute(&#39;aria-label&#39;)&amp;&amp;d.getAttribute(&#39;aria-label&#39;).match(/.*\. Like$/)&amp;&amp;(d.style.backgroundColor=&#39;#00ff00&#39;,d.click(),c&#43;&#43;)}window.scrollTo(0,document.body.scrollHeight),console.log(&#39;Liked &#39;&#43;c&#43;&#39; tweets&#39;)})()) ([src](https://github.com/spudtrooper/bookmarklets/blob/main/js/twitter-like-all.js)) - Likes all the tweets on a twitter page, then scrolls to the bottom so you can resume.

*	[Wikipedia Menu Hover](javascript:(function(){let a=$(&#39;#toc&#39;);a.css(&#39;position&#39;,&#39;fixed&#39;),a.css(&#39;right&#39;,&#39;10px&#39;),a.css(&#39;top&#39;,&#39;90px&#39;),a.css(&#39;height&#39;,&#39;80%&#39;),a.css(&#39;overflow&#39;,&#39;auto&#39;),a.css(&#39;display&#39;,&#39;block&#39;)})()) ([src](https://github.com/spudtrooper/bookmarklets/blob/main/js/wikipedia-toc.js)) - Makes wikipedia menus hover and track with the page, e.g. https://imgur.com/a/N6kMzrg.

		