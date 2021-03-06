
# Bookmarklets

To install, drag the links not titled 'src' to your toolbar.


*	[Congress Show Titles](javascript:(function(){function findEls(){let els=[];Array.from(document.getElementsByTagName('span')).forEach((el,i)=>{if(el.className=='result-title'){els.push(el);}});els.sort((a,b)=>{let fst=a.innerText.toLowerCase();let snd=b.innerText.toLowerCase();if(fst<snd){return-1;}
if(snd<fst){return 1;}
return 0;});return els;}
function createBox(els){let box=document.getElementById('_box_');if(box){box.parentNode.removeChild(box);}
box=document.createElement('div');box.id='_box_';Object.assign(box.style,{'position':'fixed','top':'10px','right':'10px','padding':'10px','minWidth':'550px','maxWidth':'550px','minHeight':'800px','maxHeight':'800px','backgroundColor':'#ddd','zIndez':'1000000000','border':'1px solid black','overflow':'auto',});document.body.append(box);let closeBtn=document.createElement('a');box.append(closeBtn);closeBtn.innerText='close';closeBtn.href='#';Object.assign(closeBtn.style,{'margin-bottom':'20px',});closeBtn.addEventListener('click',function(){box.parentNode.removeChild(box);});let list=document.createElement('ol');box.appendChild(list);for(let i=0;i<els.length;i++){let el=els[i];let link=document.createElement('a');link.innerText=el.innerText;link.href='#';link.addEventListener('click',function(el){window.scrollTo(document.body,el.offsetTop,250);}.bind(null,el));let listItem=document.createElement('li');listItem.appendChild(link);list.appendChild(listItem);}}
function main(){let els=findEls();createBox(els);}
main();})();) ([src](https://github.com/spudtrooper/bookmarklets/blob/main/src/congress-show-titles.js)) - Shows a box with the titles of bills returned from a search on congress.gov

*	[Find Soonest Remote Meeting](javascript:(function(){function pad(n){return n<10?'0'+n:String(n);}
function getMatchFn(d){let days=['SUNDAY','MONDAY','TUESDAY','WEDNESDAY','THURSDAY','FRIDAY','SATURDAY',];let day=days[d.getDay()];let hours=d.getHours();let amPm='AM';if(hours>12){hours-=12;amPm='PM';}
let mins;if(d.getMinutes()>=30){mins='30';}else{mins='00';}
let target=day+' '+hours+':'+mins+' '+amPm;let paddedTarget=day+' '+pad(hours)+':'+mins+' '+amPm;let targets=[target,paddedTarget];return(s)=>{return targets.includes(s);};}
function findSoonest(){let allEls=Array.from(document.getElementsByTagName('div')).filter(el=>el.id=='arm-time');let matchedEl=null;for(let i=0;i<10;i++){let d=new Date();d.setTime(new Date().getTime()+i*30*60*1000);let matchFn=getMatchFn(d);let els=allEls.filter(el=>matchFn(el.innerText.toUpperCase()));if(els.length){return els[0];}}
return null;}
function main(){let el=findSoonest();if(el){el.scrollIntoView();}else{alert('Could not find a meeting now');}}
main();})();) ([src](https://github.com/spudtrooper/bookmarklets/blob/main/src/recent-remote-meetings.js)) - Scrolls to the soonest or most recent meetings in <a target="_" href="https://www.nyintergroup.org/remote-meetings/list/">www.nyintergroup.org/remote-meetings/list/</a>.

*	[Hackernews Poll](javascript:(function(){const MAX_CHARS=75;function setStyle(el,style){for(var i in style){el.style[i]=style[i];}}
function normalize(n,v,min,max,d){d=d||n/2;return Math.floor(n-d*(max-v)/(max-min));}
function createScoreDiv(span,score,min,max){var chars=normalize(MAX_CHARS,score,min,max);var cval=normalize(0xff,score,min,max,0xee);var color='#'+cval.toString(16)+'0000';var td=span.parentNode;td.appendChild(document.createTextNode(' '));var el=document.createElement('span');td.appendChild(el);var elStyle={'height':'100%','background-color':color,'color':color};var str='';for(var i=0;i<chars;i++)str+='|';el.innerHTML=str;setStyle(el,elStyle);console.log(el);}
function main(){var spans=document.getElementsByTagName('span');var pairs=[];function makePair(span,score){return{span:span,score:score};}
var min;var max;for(var i in spans){var span=spans[i];if(!span.id||!span.id.match(/score_/))continue;var score=parseInt(span.innerHTML.match(/(\d+) /)[0]);if(!min||score<min)min=score;if(!max||score>max)max=score;pairs.push(makePair(span,score));}
for(var i in pairs){if(i==0)continue;var p=pairs[i];createScoreDiv(p.span,p.score,min,max)}}
main();})();) ([src](https://github.com/spudtrooper/bookmarklets/blob/main/src/hackernews-poll.js)) - Adds colored histograms to polls on news.ycombinator.org

*	[Instagram Sizes](javascript:(function(){let srcset=document.querySelector('img[sizes="600px"]').getAttribute('srcset');srcset.split(',').map(function(e){let p=e.split(' ');return p[1]+' '+p[0];}).forEach(function(e){console.log(e);});})();) ([src](https://github.com/spudtrooper/bookmarklets/blob/main/src/instagram-sizes.js)) - Shows the various sized images for an instagram image. To use: (1) Click on a thumbnail (2) Run this (3) See the output in the dev console.

*	[Instagram Story Visitors Expand](javascript:(function(){function clickSeenByButton(){Array.from(document.getElementsByTagName('button')).forEach((el)=>{if(el.innerText&&el.innerText.match(/^Seen by \d+$/)){console.log('click');el.click();}});}
function findScrollDiv(){let res;Array.from(document.getElementsByTagName('div')).forEach((el)=>{if(el.style&&el.style.overflow=='hidden auto'){res=el;return;}});return res;}
function findImage(t){let res;Array.from(document.getElementsByTagName('img')).forEach((el)=>{if(el.alt&&el.alt.startsWith(t)&&el.alt.endsWith('profile picture')){res=el.src;return;}});return res;}
function doScroll(el,fn){let titlesToInfo={};let loop=(nextScrollHeight)=>{Array.from(document.getElementsByTagName('a')).filter(el=>{return el.getAttribute('role')=='link'&&el.href&&el.href.match(/https:\/\/(www\.)?instagram\.com\/[a-z0-9]+\/?/);}).map(el=>{let t=el.title;if(!t){t=el.href.replace(/.*\.instagram.com\/?/,'').replace(/\//g,'');}
let img=findImage(t);let p=el.parentNode.parentNode.parentNode;let nameParts=p.innerText.split('\n'),name=nameParts[nameParts.length-1];let verified=p.innerText.includes('Verified'),verifiedClass=verified?'_act0 _a9_u _9ys8':'';let info={img:img,name:name,verifiedClass:verifiedClass,};titlesToInfo[t]=info;});console.log('titles',Object.keys(titlesToInfo).length);if(nextScrollHeight>el.scrollHeight){fn.call(null,titlesToInfo);return;}
el.scrollTo(0,nextScrollHeight);setTimeout(loop.bind(null,nextScrollHeight+100),200);};loop(100);return true;}
function scroll(fn){let loop=(count)=>{if(!count){alert('cannot find scroll div');return;}
let el=findScrollDiv();if(el){doScroll(el,fn);return;}
setTimeout(loop.bind(null,count-1),200);};loop(3);}
function createElement(tag,parent,style){let newNode=document.createElement(tag);parent.appendChild(newNode);if(style){Object.assign(newNode.style,style);}
return newNode;}
function waitForViewers(callback){console.log('waitForViewers');const divs=document.getElementsByTagName('div');for(let i=0;i<divs.length;i++){const div=divs[i];if(div.style&&div.style.maxHeight=='400px'){callback.call(null);return;}}
setTimeout(waitForViewers.bind(null,callback),200);}
function startScrolling(){scroll((titlesToInfo)=>{let regularTitleInfos={},verifiedTitleInfos={};for(const title in titlesToInfo){const info=titlesToInfo[title];if(info.verifiedClass){verifiedTitleInfos[title]=info;}else{regularTitleInfos[title]=info;}}
let div=createElement('div',document.body,{position:'absolute',top:'10px',left:'10px',padding:'10px',border:'1px solid black',overflow:'auto','z-index':1000000,'background-color':'#fff','max-height':(window.outerHeight-100)+'px',});let ul=createElement('ul',div);let processTitles=(titles)=>{titles.sort();titles.forEach(t=>{let info=titlesToInfo[t],src=info.img,name=info.name,verifiedClass=info.verifiedClass;let li=createElement('li',ul);let liContent=createElement('span',li,{'display':'block',});let img=createElement('img',liContent,{'width':'22px','height':'22px','border-radius':'50%','vertical-align':'middle',});img.src=src;let a=createElement('a',liContent,{'vertical-align':'middle','color':'#262626','font-weight':'600','margin-left':'5px',});a.href='http://instagram.com/'+t+'/';a.innerHTML='<b>'+t+'</b>'+' - '+'<span style=\'color:#8e8e8e; font-weight:400;\'>'+name+'</span>';if(verifiedClass){liContent.innerHTML+='&nbsp;';let verifiedSpan=createElement('span',liContent,{'display':'inline','color':'#fff',});verifiedSpan.className=verifiedClass;verifiedSpan.innerText='__';}});};const verifiedTitles=Object.keys(verifiedTitleInfos);processTitles(verifiedTitles);const regularTitles=Object.keys(regularTitleInfos);processTitles(regularTitles);});}
function main(){clickSeenByButton();waitForViewers(startScrolling);}
main();})();) ([src](https://github.com/spudtrooper/bookmarklets/blob/main/src/instagram-story-visitors-expand.js)) - Expands the list of IG story visitors into a new div the height of the window.

*	[Instagram Unfollow All](javascript:(function(){function clickFollowingButton(){Array.from(document.getElementsByTagName('a')).forEach((el)=>{if(el.href&&el.href.match(/\/following\//)){console.log('click');el.click();}});}
function findFollowingButtons(){return Array.from(document.querySelectorAll('button')).filter(el=>el.textContent=='Following');}
function findUnfollowButton(){return Array.from(document.querySelectorAll('button')).find(el=>el.textContent=='Unfollow');}
function main(){clickFollowingButton();let loop=()=>{let followingButtons=findFollowingButtons();if(!followingButtons||!followingButtons.length||followingButtons.length<5){console.log('waiting for following buttons');setTimeout(loop,1000);return;}
let unfollowNext=(done)=>{let btn=findUnfollowButton();if(!btn){setTimeout(unfollowNext.bind(null,done),200);return;}
btn.click();done.call(null);};let burnDownFollowingButtons=()=>{if(followingButtons.length){let nextBtn=followingButtons.pop(0);nextBtn.click();unfollowNext(burnDownFollowingButtons);}};burnDownFollowingButtons();};loop();}
main();})();) ([src](https://github.com/spudtrooper/bookmarklets/blob/main/src/instagram-unfollow-all.js)) - Unfollows people in bulk, 25 at a time.

*	[Meetings Map Color](javascript:(function(){function findMeetings(){return Array.from(document.querySelectorAll('td[class=\'location\']')).filter(el=>!!el.getAttribute('data-sort')).map(el=>{let m=el.getAttribute('data-sort').match(/(.*)-(\d+)-(\d+:\d+)$/);if(!m||m.length!=4)return;let div=el.querySelector('div[class=\'location-name\']'),title=div.innerHTML,key=m[1],num=m[2],time=m[3];return{key:key,num:num,time:time,title:title,};});}
function main(){let meetingsMap={};let meetings=findMeetings();meetings.forEach(m=>{meetingsMap[m.title]=m;});let nowHours=new Date().getHours();Array.from(document.querySelectorAll('div[role=\'button\'')).filter(el=>el.getAttribute('title')&&el.getAttribute('title')==el.getAttribute('aria-label')).forEach(el=>{let title=el.getAttribute('title');let m=meetingsMap[title];if(!m){el.parentNode.removeChild(el);return;};let time=m.time,timeParts=time.split(':'),hours=parseInt(timeParts[0]),hoursDiff=hours-nowHours;console.log(hoursDiff,m);let src='/'+'/maps.google.com/mapfiles/marker.png'
if(hoursDiff<=2){src='/'+'/maps.google.com/mapfiles/marker_green.png';}else if(hoursDiff<=4){src='/'+'/maps.google.com/mapfiles/marker_yellow.png';}
let img=el.querySelector('img');img.src=src;});}
main();})();) ([src](https://github.com/spudtrooper/bookmarklets/blob/main/src/meetings-map-color.js)) - Color the markers of meetings map by upcoming time (e.g. green: <= 2h, yellow <= 4h, red: other)

*	[Metamask Sign Auto](javascript:(function(){let clicks=0;const sleep=150;const longSleep=3000;let clickSign=()=>{let div=document.getElementsByClassName('request-signature__rows')[0];if(!div)return;if(!div.innerText.includes('I would like to follow user'))return;Array.from(document.getElementsByClassName('button')).filter((el)=>el.getAttribute('data-testid')&&el.getAttribute('data-testid')=='request-signature__sign').forEach((el)=>el.click());console.log('clicks:'+(++clicks));if(clicks%50==0){console.log('sleeping...');setTimeout(clickSign,longSleep);}else{setTimeout(clickSign,sleep);}};setTimeout(clickSign,5000);})();) ([src](https://github.com/spudtrooper/bookmarklets/blob/main/src/metamask-sign-auto.js)) - Automatically signs trivial metamask signature requests

*	[Rarible Follow All](javascript:(function(){let times=100;let count=0;let loop=()=>{Array.from(document.querySelectorAll('button')).filter((el)=>el.innerText=='Follow').forEach((el)=>el.click());let el=document.getElementsByClassName('ReactVirtualized__Grid ReactVirtualized__List')[0];el.scrollTop=2*el.scrollHeight/3;if(++count<times){setTimeout(loop,3000);}};loop();setInterval(loop,1000*30);})();) ([src](https://github.com/spudtrooper/bookmarklets/blob/main/src/rarible-follow-all.js)) - Follow all on rarible.com

*	[Rarible Follow One](javascript:(function(){Array.from(document.querySelectorAll('button')).filter((el)=>el.innerText=='Follow').forEach((el)=>el.click());})();) ([src](https://github.com/spudtrooper/bookmarklets/blob/main/src/rarible-follow-one.js)) - Follow the first person on rarible.com

*	[Rarible Like All](javascript:(function(){let loop=()=>{Array.from(document.getElementsByClassName('sc-bdvvtL sc-gKclnd sc-iCfMLu sc-cjrPHo kMXwoE eehqFj cCtwBW sc-cvlWTT dVFwth')).forEach((el)=>el.click());window.scrollTo(0,2*document.body.scrollHeight/3);Array.from(document.querySelectorAll('button')).filter((el)=>el.innerText=='Load more').forEach((el)=>el.click());setTimeout(loop,1000);};loop();})();) ([src](https://github.com/spudtrooper/bookmarklets/blob/main/src/rarible-like-all..js)) - Like all on rarible.com

*	[Rarible Sort Users](javascript:(function(){let times=parseInt(prompt('# iterations','1'));let count=0;let loop=()=>{let userMap=new Map();Array.from(document.querySelectorAll('a')).filter((el)=>el.getAttribute('data-marker')&&el.getAttribute('data-marker').startsWith('root/appPage/search/lists/users/cards/')).forEach((el)=>{let m=el.innerText.match(/(\d+) followers/);if(m)userMap.set(el,parseInt(m[1]));});Array.from(document.querySelectorAll('div')).filter((el)=>el.style.position=='absolute').forEach((el)=>{el.removeChild(el.firstChild);});let sorted=new Map([...userMap.entries()].sort((a,b)=>b[1]-a[1]));let sortedEls=[];sorted.forEach((count,el)=>sortedEls.push(el));Array.from(document.querySelectorAll('div')).filter((el)=>el.style.position=='absolute').forEach((el)=>{let a=sortedEls.pop(0);el.appendChild(a);});window.scrollTo(0,document.body.scrollHeight);if(++count<times){setTimeout(loop,3000);}};loop();})();) ([src](https://github.com/spudtrooper/bookmarklets/blob/main/src/rarible-sort-users.js)) - Sort users by followers on rarible search page (e.g. <a target="_" href="https://rarible.com/search/users/art">rarible.com/search/users/art</a>)

*	[Street Easy All](javascript:(function(){function findMax(){let ul=document.getElementsByClassName('pagination-list-container')[0];let li=ul.getElementsByClassName('page gap')[0].nextSibling.nextSibling;let a=li.firstChild.nextSibling;let max=parseInt(a.innerText);let baseUrl=a.href.replace('?page='+max,'');return{max:max,baseUrl:baseUrl,};}
function getOrCreate(tag,id,opt_parent){let el=document.getElementById(id);if(!el){el=document.createElement(tag);if(opt_parent){opt_parent.appendChild(el);}}
return el;}
function makeRequest(div,maxObj,page){let url=maxObj.baseUrl+'?page='+page;console.log('url',url);var xhttp=new XMLHttpRequest();xhttp.onreadystatechange=function(){if(this.readyState==4&&this.status==200){let text=xhttp.responseText;var el=document.createElement('html');el.innerHTML=text;let cards=el.getElementsByClassName('listingCard listingCard--rentalCard jsItem');for(let j=0;j<cards.length;j++){let li=document.createElement('SPAN');li.style.float='left';li.appendChild(cards[j]);div.appendChild(li);}}};xhttp.open('GET',url,true);xhttp.send();}
function makeRequests(maxObj){let max=maxObj.max;let div=getOrCreate('SPAN','_listings_',document.body);div.style.width='100%';div.style.display='inline';let loop=(i)=>{console.log('Creating listings for '+i);makeRequest(div,maxObj,i);if(i<=max){setTimeout(function(){loop(i+1);},3000);}else{console.log('done');}};loop(1);}
function main(){let max=findMax();makeRequests(max);}
main();})();) ([src](https://github.com/spudtrooper/bookmarklets/blob/main/src/streeteasy-all.js)) - Shows a page of all streeteasy.com listings instead of paging.

*	[Twimmage Open All](javascript:(function(){function findLinks(){let els=document.getElementsByTagName('a');let res=[]
for(let i=0;i<els.length;i++){let el=els[i];if(el.href&&el.href.match(/^https?:\/\/instagram.com\/[a-zA-Z0-9_]+$/)){res.push(el.href);}}
return res;}
function main(){let urls=findLinks();let N=parseInt(window.prompt('Number of results',30));for(let i=0;i<N;i++){let u=urls[i];let n=u.split('/')[u.split('/').length-1];window.open(u,'_'+n);}}
main();})();) ([src](https://github.com/spudtrooper/bookmarklets/blob/main/src/open-all-twimmage.js)) - Open links from twimmage auto output

*	[Twitter Like All](javascript:(function(){let divs=document.getElementsByTagName('div');let count=0;for(var i=0;i<divs.length;i++){let div=divs[i];if(div.getAttribute('aria-label')&&div.getAttribute('aria-label').match(/.*\. Like$/)){div.style.backgroundColor='#00ff00';div.click();count++;}}
window.scrollTo(0,document.body.scrollHeight);console.log('Liked '+count+' tweets');})();) ([src](https://github.com/spudtrooper/bookmarklets/blob/main/src/twitter-like-all.js)) - Likes all the tweets on a twitter page, then scrolls to the bottom so you can resume.

*	[Wikipedia Menu Hover](javascript:(function(){let toc=$('#toc');toc.css('position','fixed');toc.css('right','10px');toc.css('top','90px');toc.css('height','80%');toc.css('overflow','auto');toc.css('display','block');})();) ([src](https://github.com/spudtrooper/bookmarklets/blob/main/src/wikipedia-toc.js)) - Makes wikipedia menus hover and track with the page, e.g. <a target="_" href="https://imgur.com/a/N6kMzrg">imgur.com/a/N6kMzrg</a>.

		