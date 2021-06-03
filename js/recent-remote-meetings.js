/*
 * @Title: Find Soonest Remote Meeting
 * @Description: Scrolls to the soonest or most recent meetings in https://www.nyintergroup.org/remote-meetings/list/.
 */
(function() {
  function pad(n) {
    return n<10 ? '0' + n : String(n);
  }
  
  function getMatchFn(d) {
    let days = [
      'SUNDAY',
      'MONDAY',
      'TUESDAY',
      'WEDNESDAY',
      'THURSDAY',
      'FRIDAY',
      'SATURDAY',
    ];
    let day = days[d.getDay()];
    let hours = d.getHours();
    let amPm = 'AM';
    if (hours > 12) {
      hours -= 12;
      amPm = 'PM';
    }
    let mins;
    if (d.getMinutes() >= 30) {
      mins = '30';
    } else {
      mins = '00';
    }
    let target = day + ' ' + hours + ':' + mins + ' ' + amPm;
    let paddedTarget = day + ' ' + pad(hours) + ':' + mins + ' ' + amPm;
    let targets = [target, paddedTarget];
    return (s) => {
      return targets.includes(s);
    };
  }

  function findSoonest() {
    let allEls = Array.from(document.getElementsByTagName('div'))
        .filter(el => el.id == 'arm-time');
    let matchedEl = null;
    for (let i = 0; i < 10; i++) {
      let d = new Date();
      d.setTime(new Date().getTime() + i*30*60*1000);
      let matchFn = getMatchFn(d);
      let els = allEls.filter(el => matchFn(el.innerText.toUpperCase()));
      if (els.length) {
        return els[0];
      }
    }
    return null;
  }
  
  function main() {
    let el = findSoonest();
    if (el) {
      el.scrollIntoView();
    } else {
      alert('Could not find a meeting now');
    }
  }

  main();  
})();
