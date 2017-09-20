/**
 * Volume Controls
 */
const wrVolume = document.querySelector('.volume-wr-circle');
const volume = document.querySelector('.volume-in-circle');

const wrVolRects = wrVolume.getBoundingClientRect();
const volX = wrVolRects.left + pageXOffset + wrVolRects.width / 2;
const volY = wrVolRects.top + pageYOffset + wrVolRects.height / 2;

wrVolume.addEventListener('mousedown', e => {
  e.preventDefault();
  document.onmousemove = e => {
    let rad = Math.atan2(e.y - volY, e.x - volX);
    let deg = rad * (180 / Math.PI);

    if (deg < -177 || deg > 77) {
      return;
    }

    /**/
    /*
    var progressValue = document.querySelector('#volume-value');

    var RADIUS = 138;
    var CIRCUMFERENCE = 2 * Math.PI * RADIUS;

    function progress(value) {
      var progress = value / 100;
      var dashoffset = CIRCUMFERENCE * (1 - progress);

      console.log('progress:', value + '%', '|', 'offset:', dashoffset);

      if (dashoffset >= volumeCirclelength) {
        progressValue.style.strokeDashoffset = volumeCirclelength;
      } else {
        progressValue.style.strokeDashoffset = dashoffset;
      }
    }

    control.addEventListener('input', function(event) {
        progress(event.target.valueAsNumber);
    });

    progressValue.style.strokeDasharray = CIRCUMFERENCE;
    let v = e.offsetX / 10 + e.offsetY / 10;
    progress(v);
*/
    /**/

    volume.style.transform = `rotate(${Math.atan2(e.y - volY, e.x - volX)}rad)`;

    // window.getComputedStyle(volume, '::before').getPropertyValue('conetnt');
    document.querySelector(
      '.volume-point'
    ).style.transform = `rotate(${-Math.atan2(e.y - volY, e.x - volX)}rad)`;

    // document.styleSheets[0].addRule(
    //   '.volume-in-circle::before',
    //   'transform: rotate(' + -Math.atan2(e.y - volY, e.x - volX) + 'rad)'
    // );

    /**/
    const volumeValue = document.querySelector('#volume-value');
    const volumeValueRadius = volumeValue.getAttribute('r');
    const volumeValueLength = 2 * Math.PI * volumeValueRadius;
    const strokeDashArr_1 = (volumeValueLength + deg * 5) / 2.2;
    const strokeDashArr_2 =
      volumeValueLength - (volumeValueLength + deg * 5) / 2.2;

    if (
      strokeDashArr_1 > volumeValueLength ||
      strokeDashArr_2 > volumeValueLength
    ) {
      return;
    }
    // v.setAttribute(
    //   'stroke-dasharray',
    //   (vL + deg * 5) / 2.2 + ',' + (vL - (vL + deg * 5) / 2.2)
    // );
    volumeValue.setAttribute(
      'stroke-dasharray',
      strokeDashArr_1 + ',' + strokeDashArr_2
    );
    // console.log(v.getTotalLength());
    // console.log(v.getAttribute('stroke-dasharray'));
    // (-progress / 100f * 360f) - 90f
    /**/
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

const rangeBass = document.querySelector('.range-bass');
const rangeBassThumb = document.querySelector('.range-bass .range-thumb');

rangeBassThumb.addEventListener('mousedown', e => {
  let thumbCoords = getCoords(rangeBassThumb);
  let shiftY = e.pageY - thumbCoords.top;
  let sliderCoords = getCoords(rangeBass);

  document.onmousemove = function(e) {
    e.preventDefault();

    let newTop = e.pageY - shiftY - sliderCoords.top;
    if (newTop < 0) newTop = 0;

    let rightEdge = rangeBass.offsetHeight - rangeBassThumb.offsetHeight;
    if (newTop > rightEdge) newTop = rightEdge;

    rangeBassThumb.style.top = `${newTop}px`;

    let rangeValue = document.querySelector('.range-bass-value');
    rangeValue.style.top = `${newTop}px`;
  };

  document.onmouseup = function() {
    document.onmousemove = document.onmouseup = null;
  };

  return false;
});

rangeBassThumb.ondragstart = function() {
  return false;
};

/**
 * Range High
 */
const rangeHigh = document.querySelector('.range-high');
const rangeHighThumb = document.querySelector('.range-high .range-thumb');

rangeHighThumb.addEventListener('mousedown', e => {
  let thumbCoords = getCoords(rangeHighThumb);
  let shiftY = e.pageY - thumbCoords.top;
  let sliderCoords = getCoords(rangeHigh);

  document.onmousemove = function(e) {
    e.preventDefault();

    let newTop = e.pageY - shiftY - sliderCoords.top;
    if (newTop < 0) newTop = 0;

    let rightEdge = rangeHigh.offsetHeight - rangeHighThumb.offsetHeight;
    if (newTop > rightEdge) newTop = rightEdge;

    rangeHighThumb.style.top = `${newTop}px`;

    let rangeValue = document.querySelector('.range-high-value');
    rangeValue.style.top = `${newTop}px`;
  };

  document.onmouseup = function() {
    document.onmousemove = document.onmouseup = null;
  };

  return false;
});

rangeBassThumb.ondragstart = function() {
  return false;
};

/**
 * Progress Bar
 */
const progressElem = document.querySelector('.eq-progress-body');
const progressThumb = document.querySelector('.progress-thumb');
const progressValue = document.querySelector('.progress-value');
const progressBuffer = document.querySelector('.progress-buffer');
let progressBufferWidth = 0;

progressThumb.addEventListener('mousedown', e => {
  let thumbCoords = getCoords(progressThumb);
  let shiftX = e.pageX - thumbCoords.left;
  let sliderCoords = getCoords(progressElem);

  document.onmousemove = function(e) {
    e.preventDefault();

    let newLeft = e.pageX - shiftX - sliderCoords.left;
    if (newLeft < 0) newLeft = 0;

    let rightEdge = progressElem.offsetWidth - progressThumb.offsetWidth;
    if (newLeft > rightEdge) newLeft = rightEdge;

    progressThumb.style.left = `${newLeft}px`;
    progressValue.style.width = `${newLeft}px`;

    progressBufferWidth = newLeft;
    progressBuffer.style.width = `${progressBufferWidth + 100}px`;
  };

  document.onmouseup = function() {
    document.onmousemove = document.onmouseup = null;
  };

  return false;
});

progressThumb.ondragstart = function() {
  return false;
};

function getCoords(elem) {
  let box = elem.getBoundingClientRect();

  return {
    top: box.top + pageYOffset,
    left: box.left + pageXOffset,
    right: box.right + pageXOffset
  };
}
