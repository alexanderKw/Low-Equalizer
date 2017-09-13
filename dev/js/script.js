/**
 * Volume Controls
 */
const wrVolume = document.querySelector('.volume-wr-circle');
const volume = document.querySelector('.volume-in-circle');

let wrVolRects = wrVolume.getBoundingClientRect();
let volX = wrVolRects.left + pageXOffset + wrVolRects.width / 2;
let volY = wrVolRects.top + pageYOffset + wrVolRects.height / 2;
let mouseDown = false;

wrVolume.addEventListener('mousemove', e => {
  let rad = Math.atan2(e.y - volY, e.x - volX);
  let deg = rad * (180 / Math.PI);

  if (deg > 77 || deg < -170) {
    return;
  }

  if (mouseDown) {
    volume.style.transform = `rotate(${Math.atan2(e.y - volY, e.x - volX)}rad)`;

    window.getComputedStyle(volume, '::before').getPropertyValue('conetnt');
    document.styleSheets[0].addRule(
      '.volume-in-circle::before',
      'transform: rotate(' + -Math.atan2(e.y - volY, e.x - volX) + 'rad)'
    );
  }
});

wrVolume.addEventListener('mousedown', e => {
  e.preventDefault();
  mouseDown = true;
});

document.addEventListener('mouseup', () => {
  mouseDown = false;
});

/**
 * Ranges Controls
 */
const range = document.querySelector('.range');
const rangeThumb = document.querySelector('.range-thumb');
const rangeCenter = rangeThumb.getBoundingClientRect().height / 2;
let rangeMouseDown = false;
let rangeY;

range.addEventListener('mousedown', e => {
  e.preventDefault();
  rangeMouseDown = true;
  rangeThumb.style.top = rangeY - rangeCenter + 'px';

  document.onmousemove = e => {
    let rangeHeight = range.getBoundingClientRect().height;
    rangeY = e.offsetY;

    if (rangeMouseDown && rangeHeight >= rangeY) {
      rangeThumb.style.top = rangeY - rangeCenter + 'px';
    }
  };
});

document.addEventListener('mouseup', () => {
  rangeMouseDown = false;
});
