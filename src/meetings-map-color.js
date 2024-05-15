
/*
 * @Title: Meetings Map Color
 * @Description: Color the markers of meetings map by upcoming time (e.g. green: <= 2h, yellow <= 4h, red: other)
 * @Context https://www.nyintergroup.org/meetings/?tsml-day=5&tsml-time=upcoming&tsml-view=map
 */
(function () {

  function findMeetings() {
    return Array.from(document.querySelectorAll('td[class=\'location\']')).filter(el => !!el.getAttribute('data-sort')).map(el => {
      let m = el.getAttribute('data-sort').match(/(.*)-(\d+)-(\d+:\d+)$/);
      if (!m || m.length != 4) return;
      let div = el.querySelector('div[class=\'location-name\']'),
        title = div.innerHTML,
        key = m[1], num = m[2], time = m[3];
      return {
        key: key,
        num: num,
        time: time,
        title: title,
      };
    });
  }


  function main() {
    let meetingsMap = {};
    let meetings = findMeetings();
    meetings.forEach(m => {
      meetingsMap[m.title] = m;
    });
    let nowHours = new Date().getHours();
    Array.from(document.querySelectorAll('div[role=\'button\''))
      .filter(el => el.getAttribute('title') && el.getAttribute('title') == el.getAttribute('aria-label'))
      .forEach(el => {
        let title = el.getAttribute('title');
        let m = meetingsMap[title];
        if (!m) {
          el.parentNode.removeChild(el);
          return;
        };
        let time = m.time,
          timeParts = time.split(':'),
          hours = parseInt(timeParts[0]),
          hoursDiff = hours - nowHours;
        console.log(hoursDiff, m);
        let src = '/' + '/maps.google.com/mapfiles/marker.png'
        if (hoursDiff <= 2) {
          src = '/' + '/maps.google.com/mapfiles/marker_green.png';
        } else if (hoursDiff <= 4) {
          src = '/' + '/maps.google.com/mapfiles/marker_yellow.png';
        }
        let img = el.querySelector('img');
        img.src = src;
      });
  }

  main();

})();
