const wrVolume = document.querySelector('.volume-wr-circle');
const volume = document.querySelector('.volume-in-circle');
volume.style.transform = 0;

let clicking = false;
wrVolume.addEventListener('mousedown', () => {
  clicking = true;
});

wrVolume.addEventListener('mouseup', () => {
  clicking = false;
});

let a = 0;
wrVolume.addEventListener('mousemove', e => {
  let x = e.offsetX;
  let y = e.offsetY;
  let newRad = x;
  newRad += x - a;
  if (clicking) {
    if (newRad > a) {
      volume.style.transform = `rotate(${newRad}deg)`;
    } else {
      a -= x / 20;
      volume.style.transform = `rotate(${a}deg)`;
    }
  }
});
