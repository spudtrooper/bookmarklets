/**
 * @Description: Shows the various sized images for an instagram image. To use: (1) Click on a thumbnail (2) Run this (3) See the output in the dev console.
 */
(function() {
    let srcset = document.querySelector('img[sizes="600px"]')
        .getAttribute('srcset');
    srcset
      .split(',')
      .map(function(e) {
        let p = e.split(' ');
        return p[1] + ' ' + p[0];
      })
      .forEach(function(e) {
        console.log(e);
      });
  })();