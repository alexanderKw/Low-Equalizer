/**
 * Volume Controls
 */
const wrVolume = document.querySelector('.volume-wr-circle');
const volume = document.querySelector('.volume-in-circle');

let wrVolRects = wrVolume.getBoundingClientRect();
let volX = wrVolRects.left + pageXOffset + wrVolRects.width / 2;
let volY = wrVolRects.top + pageYOffset + wrVolRects.height / 2;

/* Volome progress */
/*
const volumeCircle = document.querySelector('#volume-circle');
const volumeRadius = volumeCircle.getAttribute('r');
const volumeValue = document.querySelector('#volume-value');
const volumeCirclelength = volumeCircle.getTotalLength();
const length = 2 * Math.PI * volumeRadius;
*/
/* */

wrVolume.addEventListener('mousedown', e => {
  document.onmousemove = e => {
    e.preventDefault();

    let rad = Math.atan2(e.y - volY, e.x - volX);
    let deg = rad * (180 / Math.PI);

    if (deg > 77 || deg < -170) {
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

/**/
// var vol_svg = 'http://www.w3.org/2000/svg';

// function createCircle() {
//   var vol = document.createElementNS(vol_svg, 'circle'); //to create a circle, for rectangle use rectangle
//   vol.setAttributeNS(null, 'id', 'vol_svg');
//   vol.setAttributeNS(null, 'cx', 100);
//   vol.setAttributeNS(null, 'cy', 100);
//   vol.setAttributeNS(null, 'r', 50);
//   vol.setAttributeNS(null, 'fill', 'black');
//   vol.setAttributeNS(null, 'stroke', 'none');

//   document.getElementById('vol_svg').appendChild(vol);
// }

// createCircle();

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
