/**
 * Volume Controls
 */
const wrVolume = document.querySelector('.volume-wr-circle');
const volume = document.querySelector('.volume-in-circle');

let wrVolRects = wrVolume.getBoundingClientRect();
let volX = wrVolRects.left + pageXOffset + wrVolRects.width / 2;
let volY = wrVolRects.top + pageYOffset + wrVolRects.height / 2;

wrVolume.addEventListener('mousedown', e => {
  document.onmousemove = e => {
    let rad = Math.atan2(e.y - volY, e.x - volX);
    let deg = rad * (180 / Math.PI);

    if (deg > 77 || deg < -170) {
      return;
    }

    volume.style.transform = `rotate(${Math.atan2(e.y - volY, e.x - volX)}rad)`;

    window.getComputedStyle(volume, '::before').getPropertyValue('conetnt');
    document.styleSheets[0].addRule(
      '.volume-in-circle::before',
      'transform: rotate(' + -Math.atan2(e.y - volY, e.x - volX) + 'rad)'
    );
  };

  document.onmouseup = () => {
    document.onmousemove = document.onmousedown = null;
  };

  return false;
});

wrVolume.ondragstart = () => {
  return false;
};

/**
 * Ranges Controls
 */
const ranges = document.querySelectorAll('.range');
const rangeThumbs = document.querySelectorAll('.range-thumb');
const rangesBgActive = document.querySelectorAll('.range-bg-active');

ranges.forEach(range => {
  rangeThumbs.forEach(rangeThumb => {
    rangeThumb.addEventListener('mousedown', e => {
      let thumbCoords = getCoords(rangeThumb);
      let shiftY = e.pageY - thumbCoords.top;
      let rangeCoords = getCoords(range);

      document.onmousemove = e => {
        e.preventDefault();
        let newTop = e.pageY - shiftY - rangeCoords.top;

        if (newTop < 0) newTop = 0;

        let topEdge = range.offsetHeight - rangeThumb.offsetHeight;
        if (newTop > topEdge) newTop = topEdge;

        // Set thumb value
        rangeThumb.style.top = `${newTop}px`;

        // Set range active background value
        let rangeActiveBg = e.target.parentNode.querySelector(
          '.range-bg-active'
        );
        rangeActiveBg.style.top = `${newTop}px`;
        // console.log(a);
      };

      document.onmouseup = () => {
        document.onmousemove = document.onmousedown = null;
      };

      return false;
    });

    rangeThumb.ondragstart = () => {
      return false;
    };
  });
});

function getCoords(elem) {
  let box = elem.getBoundingClientRect();

  return {
    top: box.top + pageYOffset,
    left: box.left + pageXOffset
  };
}
