const canvas = document.getElementById('canvas');
const faceColor = document.getElementById('face-color');
const borderColor = document.getElementById('border-color');
const numberLinesColor = document.getElementById('number-lines-color');
const largeHandsColor = document.getElementById('large-hands-color');
const secondHandColor = document.getElementById('second-hand-color');

function clock() {
  const now = new Date();
  const ctx = canvas.getContext('2d');
  //Setup canvas
  ctx.save(); // save the default state
  ctx.clearRect(0, 0, 500, 500);
  ctx.translate(250, 250); // put (0,0) in the center
  ctx.rotate(-Math.PI / 2); // rotate clock negative 90 degrees

  // Set default styles
  ctx.strokeStyle = numberLinesColor.value;
  ctx.lineWidth = 5;
  ctx.lineCap = 'round';

  // ctx.save() saves all the values above it. After saving all states we can change the values and do what we want. With ctx.restore(), all the values stored by save is restored so all the changes between save() and restore() is discarded/lost.
  // Draw clock face and border
  ctx.save();
  ctx.beginPath();
  ctx.lineWidth = 14;
  ctx.strokeStyle = borderColor.value;
  ctx.fillStyle = faceColor.value;
  ctx.arc(0, 0, 130, 0, Math.PI * 2, true);
  ctx.stroke();
  ctx.fill();
  ctx.restore();

  // Draw hour lines
  ctx.save();
  for (let i = 0; i < 12; i++) {
    ctx.beginPath();
    ctx.rotate(Math.PI / 6);
    ctx.moveTo(100, 0);
    ctx.lineTo(120, 0);
    ctx.stroke();
  }
  ctx.restore();

  // Draw minute lines
  ctx.save();
  ctx.lineWidth = 4;
  for (let i = 0; i < 60; i++) {
    if (i % 5 !== 0) {
      ctx.beginPath();
      ctx.moveTo(117, 0);
      ctx.lineTo(120, 0);
      ctx.stroke();
    }
    ctx.rotate(Math.PI / 30);
  }
  ctx.restore();

  // Get current time
  const hr = now.getHours() % 12; // To reduce 24 hours base to 12 hour base
  const min = now.getMinutes();
  const sec = now.getSeconds();

  // Draw hour hand
  ctx.save();
  // in 12 hours, hour hand moves 2PI degrees.
  // in 1 hr or 60 mins or 3600 seconds, hour hand moves 2PI/12 = PI/6 degrees
  // in 1 min, hour hand moves (PI/6)/60 degrees = PI/360 degrees
  // in 1 sec, hour hand moves (PI/6)/(60*60) degrees = PI/21600
  ctx.rotate((Math.PI / 6) * hr + (Math.PI / 360) * min + (Math.PI / 21600) * sec);
  ctx.strokeStyle = largeHandsColor.value;
  ctx.lineWidth = 14;
  ctx.beginPath();
  ctx.moveTo(-20, 0);
  ctx.lineTo(70, 0);
  ctx.stroke();
  ctx.restore();

  // Draw min hand
  ctx.save();
  // in 60 mins, min hand moves 2PI degrees.
  // in 1 min or 60 seconds, min hand moves 2PI/60 degrees= PI/30 degrees
  // in 1 sec, min hand moves (PI/30)/60 degrees = PI/1800 degrees
  ctx.rotate((Math.PI / 30) * min + (Math.PI / 1800) * sec);
  ctx.strokeStyle = largeHandsColor.value;
  ctx.lineWidth = 10;
  ctx.beginPath();
  ctx.moveTo(-28, 0);
  ctx.lineTo(112, 0);
  ctx.stroke();
  ctx.restore();

  // Draw sec hand
  ctx.save();
  // in 60 seconds, sec hand moves 2PI degrees
  // in 1 sec, sec hand moves 2PI/60 degrees = PI/30 degrees
  ctx.rotate((Math.PI / 30) * sec);
  ctx.strokeStyle = secondHandColor.value;
  ctx.lineWidth = 6;
  ctx.beginPath();
  ctx.moveTo(-30, 0);
  ctx.lineTo(100, 0);
  ctx.stroke();
  ctx.restore();
  ctx.beginPath();
  ctx.fillStyle = '#FF7F50';
  ctx.arc(0, 0, 10, 0, Math.PI * 2, true);
  ctx.fill();
  ctx.restore(); // restore default state
  requestAnimationFrame(clock);
}

requestAnimationFrame(clock);

document.getElementById('save-btn').addEventListener('click', () => {
  const dataURL = canvas.toDataURL('image/png');
  const link = document.createElement('a');
  link.download = 'clock.png';
  link.href = dataURL;
  link.click();
  saveDataToLocalStorage();
});

document.addEventListener('DOMContentLoaded', getDataFromLocalStorage);

function saveDataToLocalStorage() {
  let clockInputData = [
    faceColor.value,
    borderColor.value,
    numberLinesColor.value,
    largeHandsColor.value,
    secondHandColor.value,
  ];
  localStorage.setItem('clockInputData', JSON.stringify(clockInputData));
}

function getDataFromLocalStorage() {
  let clockInputData = JSON.parse(localStorage.getItem('clockInputData'));
  if (clockInputData) {
    [faceColor.value, borderColor.value, numberLinesColor.value, largeHandsColor.value, secondHandColor.value] =
      clockInputData;
  }
}
