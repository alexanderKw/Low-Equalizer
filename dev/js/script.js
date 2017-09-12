const wrVolume = document.querySelector('.volume-wr-circle');
const volume = document.querySelector('.volume-in-circle');

let wrVolRects = wrVolume.getBoundingClientRect();
let volX = wrVolRects.left + wrVolRects.width / 2;
let volY = wrVolRects.top + wrVolRects.height / 2;
let mouseDown = false;

wrVolume.addEventListener('mousedown', e => {
  e.preventDefault();
  mouseDown = true;
});

wrVolume.addEventListener('mouseup', () => {
  mouseDown = false;
});

document.addEventListener('mousemove', e => {
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

/*2*/
// volume.style.transform = `rotate(90deg)`;
// let mouseDown = false;
// let offset = wrVolume.getBoundingClientRect();

// wrVolume.addEventListener('mousemove', e => {
//   let centerX = offset.left + offset.width / 2;
//   let centerY = offset.top + offset.height / 2;
//   let mouseX = e.offsetX;
//   let mouseY = e.offsetY;

//   if (mouseDown) {
//     let radians = Math.atan2(mouseX - centerX, mouseY - centerY);
//     let degree = radians * (180 / Math.PI) * -1 + 90;
//     volume.style.transform = `rotate(${degree}deg)`;
//     console.log(degree);
//   }
// });

/*1*/
// let a = 0;
// let x = 0;
// let y = 0;
// wrVolume.addEventListener('mousemove', e => {
//   x = e.offsetX;
//   y = e.offsetY;
//   let newRad = x;
//   newRad += x - a;
//   if (clicking) {
//     if (e.offsetX) {
//       a += x / 20;
//       volume.style.transform = `rotate(${a}deg)`;
//       // console.log('a1: ' + a);
//     } else if (e.offsetY) {
//       a -= y / 20;
//       // console.log('a2: ' + a);
//       volume.style.transform = `rotate(${a}deg)`;
//     }
//   }
// });
