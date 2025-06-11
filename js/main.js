
let time = 25 * 60;
let interval;

function startPomodoro() {
  clearInterval(interval);
  interval = setInterval(() => {
    const minutes = String(Math.floor(time / 60)).padStart(2, '0');
    const seconds = String(time % 60).padStart(2, '0');
    document.getElementById('timerDisplay').textContent = `${minutes}:${seconds}`;
    time--;
    if (time < 0) clearInterval(interval);
  }, 1000);
}

function resetPomodoro() {
  clearInterval(interval);
  time = 25 * 60;
  document.getElementById('timerDisplay').textContent = '25:00';
}

function summarize() {
  const textArea = document.getElementById('textToSummarize');
  const output = document.getElementById('summaryOutput');
  const text = textArea.value.trim();

  if (!text) {
    output.textContent = 'Please enter text to summarize.';
    return;
  }

  const sentences = text.match(/[^\.!\?]+[\.!\?]+/g);
  if (!sentences || sentences.length === 0) {
    output.textContent = 'Text is too short or not recognizable.';
    return;
  }

  const summary = sentences.slice(0, 2).join(' ');
  output.textContent = summary;
}

function clearSummary() {
  document.getElementById('textToSummarize').value = '';
  document.getElementById('summaryOutput').textContent = '';
}


let timerInterval = null;
let timeLeft = 25 * 60; 

const timerDisplay = document.getElementById('timerDisplay');
const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const resetBtn = document.getElementById('resetBtn');

function updateDisplay(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  timerDisplay.textContent = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

function startPomodoro() {
  if (timerInterval) return; 

  startBtn.disabled = true;
  pauseBtn.disabled = false;

  timerInterval = setInterval(() => {
    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      timerInterval = null;
      startBtn.disabled = false;
      pauseBtn.disabled = true;
      alert('Time is up! Take a break 😊');
      return;
    }
    timeLeft--;
    updateDisplay(timeLeft);
  }, 1000);
}

function pausePomodoro() {
  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
    startBtn.disabled = false;
    pauseBtn.disabled = true;
  }
}

function resetPomodoro() {
  clearInterval(timerInterval);
  timerInterval = null;
  timeLeft = 25 * 60;
  updateDisplay(timeLeft);
  startBtn.disabled = false;
  pauseBtn.disabled = true;
}

startBtn.addEventListener('click', startPomodoro);
pauseBtn.addEventListener('click', pausePomodoro);
resetBtn.addEventListener('click', resetPomodoro);

updateDisplay(timeLeft);
