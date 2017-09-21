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

    volume.style.transform = `rotate(${Math.atan2(e.y - volY, e.x - volX)}rad)`;

    document.querySelector(
      '.volume-point'
    ).style.transform = `rotate(${-Math.atan2(e.y - volY, e.x - volX)}rad)`;

    const volumeValue = document.querySelector('#volume-value');
    const volumeValueRadius = volumeValue.getAttribute('r');
    const volumeValueLength = 2 * Math.PI * volumeValueRadius;
    const strokeDashArr_1 = (volumeValueLength + deg * 5) / 2.22;
    const strokeDashArr_2 =
      volumeValueLength - (volumeValueLength + deg * 5) / 2.22;

    if (
      strokeDashArr_1 > volumeValueLength ||
      strokeDashArr_2 > volumeValueLength
    ) {
      return;
    }

    volumeValue.setAttribute(
      'stroke-dasharray',
      strokeDashArr_1 + ',' + strokeDashArr_2
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
  e.preventDefault();

  let thumbCoords = getCoords(rangeBassThumb);
  let shiftY = e.pageY - thumbCoords.top;
  let sliderCoords = getCoords(rangeBass);

  document.onmousemove = function(e) {
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
  e.preventDefault();

  let thumbCoords = getCoords(rangeHighThumb);
  let shiftY = e.pageY - thumbCoords.top;
  let sliderCoords = getCoords(rangeHigh);

  document.onmousemove = function(e) {
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
  e.preventDefault();

  let thumbCoords = getCoords(progressThumb);
  let shiftX = e.pageX - thumbCoords.left;
  let sliderCoords = getCoords(progressElem);

  document.onmousemove = function(e) {
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
