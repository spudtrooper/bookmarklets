
# Bookmarklets

To install, drag the links not titled 'src' to your toolbar.


*	[Find Soonest Remote Meeting](javascript:(function(){function a(a){return a<10?'0'+a:String(a)}function b(d){let g=['SUNDAY','MONDAY','TUESDAY','WEDNESDAY','THURSDAY','FRIDAY','SATURDAY'],f=g[d.getDay()],b=d.getHours(),e='AM';b>12&&(b-=12,e='PM');let c;d.getMinutes()>=30?c='30':c='00';let h=f+' '+b+':'+c+' '+e,i=f+' '+a(b)+':'+c+' '+e,j=[h,i];return a=>j.includes(a)}function c(){let a=Array.from(document.getElementsByTagName('div')).filter(a=>a.id=='arm-time'),c=null;for(i=0;i<10;i++){let c=new Date;c.setTime((new Date).getTime()+i*30*60*1e3);let e=b(c),d=a.filter(a=>e(a.innerText.toUpperCase()));if(d.length)return d[0]}return null}function d(){let a=c();a?a.scrollIntoView():alert('Could not find a meeting now')}d()})()) ([src](https://github.com/spudtrooper/bookmarklets/blob/main/js/recent_remote_meeting.js)) - Scrolls to the soonest or most recent meetings in https://www.nyintergroup.org/remote-meetings/list/.

*	[Instagram Sizes](javascript:(function(){let a=document.querySelector('img[sizes="600px"]').getAttribute('srcset');a.split(',').map(function(b){let a=b.split(' ');return a[1]+' '+a[0]}).forEach(function(a){console.log(a)})})()) ([src](https://github.com/spudtrooper/bookmarklets/blob/main/js/instagram-sizes.js)) - Shows the various sized images for an instagram image. To use: (1) Click on a thumbnail (2) Run this (3) See the output in the dev console.

*	[Recent_meetings_now](javascript:(function(){function a(){let a=new Date,h=['sunday','monday','tuesday','wednesday','thursday','friday','saturday'],f=h[a.getDay()],b=a.getHours(),e='AM';b>12&&(b-=12,e='PM');let c;a.getMinutes()>=30?c='30':c='00';let g=f+' '+b+':'+c+' '+e,d=document.getElementsByTagName('div');for(let b=0;b<d.length;b++){let a=d[b];if(!a.id||a.id!='arm-time')continue;let c=a.innerText;if(console.log(c),c==g){alert(a);break}}}a()})()) ([src](https://github.com/spudtrooper/bookmarklets/blob/main/js/recent_meetings_now.js)) - 

*	[Twitter Like All](javascript:(function(){let b=document.getElementsByTagName('div'),c=0;for(var a=0;a<b.length;a++){let d=b[a];d.getAttribute('aria-label')&&d.getAttribute('aria-label').match(/.*\. Like$/)&&(d.style.backgroundColor='#00ff00',d.click(),c++)}window.scrollTo(0,document.body.scrollHeight),console.log('Liked '+c+' tweets')})()) ([src](https://github.com/spudtrooper/bookmarklets/blob/main/js/twitter-like-all.js)) - Likes all the tweets on a twitter page, then scrolls to the bottom so you can resume.

*	[Wikipedia Menu Hover](javascript:(function(){let a=$('#toc');a.css('position','fixed'),a.css('right','10px'),a.css('top','90px'),a.css('height','80%'),a.css('overflow','auto'),a.css('display','block')})()) ([src](https://github.com/spudtrooper/bookmarklets/blob/main/js/wikipedia-toc.js)) - Makes wikipedia menus hover and track with the page, e.g. https://imgur.com/a/N6kMzrg.

		