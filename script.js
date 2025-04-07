const hrsInput = document.getElementById('hrs');
const minsInput = document.getElementById('mins');
const secsInput = document.getElementById('secs');
const startBtn = document.getElementById('start');
const audioFile = document.getElementById('userAudio');
const countdownDisplay = document.getElementById('countdown');
const alarmSound = document.getElementById('defaultAudio');

let countdown;

startBtn.addEventListener('click', () => {
  const hrs = parseInt(hrsInput.value) || 0;
  const mins = parseInt(minsInput.value) || 0;
  const secs = parseInt(secsInput.value) || 0;

  const totalSeconds = hrs * 3600 + mins * 60 + secs;

  if (totalSeconds <= 0) {
    alert("Please enter a valid time.");
    return;
  }

  const file = audioFile.files[0];
  if (file) {
    const url = URL.createObjectURL(file);
    alarmSound.src = url;
  } else {
    alarmSound.src = "./Alarm/audio.mp3";
  }

  clearInterval(countdown);
  let remainingTime = totalSeconds;

  updateDisplay(remainingTime);

  countdown = setInterval(() => {
    remainingTime--;
    updateDisplay(remainingTime);

    if (remainingTime <= 0) {
      clearInterval(countdown);
      alarmSound.play();
    }
  }, 1000);
});

function updateDisplay(seconds) {
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  countdownDisplay.textContent = `${pad(hrs)}:${pad(mins)}:${pad(secs)}`;
}

function pad(num) {
  return num.toString().padStart(2, '0');
}