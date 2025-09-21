document.addEventListener('DOMContentLoaded', () => {
  const display = document.getElementById('display');
  const lapsEl = document.getElementById('laps');
  const startBtn = document.getElementById('startBtn');
  const pauseBtn = document.getElementById('pauseBtn');
  const resetBtn = document.getElementById('resetBtn');
  const lapBtn = document.getElementById('lapBtn');

  let startTime = 0;      
  let elapsed = 0;        
  let timerInterval = null;

  function formatTime(ms) {
    const totalCentis = Math.floor(ms / 10);
    const centi = String(totalCentis % 100).padStart(2, '0');
    const totalSeconds = Math.floor(ms / 1000);
    const s = String(totalSeconds % 60).padStart(2, '0');
    const m = String(Math.floor(totalSeconds / 60) % 60).padStart(2, '0');
    const h = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
    return `${h}:${m}:${s}.${centi}`;
  }

  function updateDisplay() {
    display.textContent = formatTime(elapsed);
  }

  function start() {
    if (timerInterval) return; 
    startTime = Date.now() - elapsed;
    timerInterval = setInterval(() => {
      elapsed = Date.now() - startTime;
      updateDisplay();
    }, 10); 
  }

  function pause() {
    if (!timerInterval) return;
    clearInterval(timerInterval);
    timerInterval = null;
  }

  function reset() {
    pause();
    elapsed = 0;
    lapsEl.innerHTML = '';
    updateDisplay();
  }

  function lap() {
    const li = document.createElement('li');
    li.textContent = formatTime(elapsed);
    lapsEl.prepend(li);
  }

  startBtn.addEventListener('click', start);
  pauseBtn.addEventListener('click', pause);
  resetBtn.addEventListener('click', reset);
  lapBtn.addEventListener('click', lap);

  updateDisplay();
});
