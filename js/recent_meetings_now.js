(function() {

  function main() {
    let now = new Date();
    let days = [
      'sunday',
      'monday',
      'tuesday',
      'wednesday',
      'thursday',
      'friday',
      'saturday',
    ];
    let day = days[now.getDay()];
    let hours = now.getHours();
    let amPm = 'AM';
    if (hours > 12) {
      hours -= 12;
      amPm = 'PM';
    }
    let mins;
    if (now.getMinutes() >= 30) {
      mins = '30';
    } else {
      mins = '00';
    }
    let target = day + ' ' + hours + ':' + mins + ' ' + amPm;
    let divs = document.getElementsByTagName('div');
    for (let i=0; i<divs.length; i++) {
      let div = divs[i];
      if (!div.id || div.id != 'arm-time') {
        continue;
      }
      let time = div.innerText;
      console.log(time);
      if (time == target) {
        alert(div);
        break;
      }
    }
  }

  main();
})();
