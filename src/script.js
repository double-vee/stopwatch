console.log('Good luck!')

const startBtn = document.querySelector("#start-btn");
const nextBtn = document.querySelector("#next-btn");
const stopBtn = document.querySelector("#stop-btn");
const pauseBtn = document.querySelector("#pause-btn");
const saveBtn = document.querySelector("#save-btn");
const resetBtn = document.querySelector("#reset-btn");
const timeContainer = document.querySelector("#time-container");
const previousTimeContainer = document.querySelector("#previous-time-container");
const resultsContainer = document.querySelector("#results-container");

stopBtn.hidden = true;
saveBtn.hidden = true;
previousTimeContainer.hidden = true;
pauseBtn.disabled = true;
nextBtn.disabled = true;

let startTime;
let createTimer;
let time;
let seconds;

startBtn.addEventListener('click', () => {
  startTime = Date.now();
  createTimer = setInterval(function() {
    time = Date.now() - startTime;
    seconds = Math.floor(time / 1000);
    console.log(time, seconds);

    formatTime();
  }, 1000);
  
  startBtn.disabled = true;
  pauseBtn.disabled = false;
  nextBtn.disabled = false;
  stopBtn.hidden = false;
});

function formatTime() {
  let min = Math.floor(seconds / 60);
  let sec = seconds % 60;

  return timeContainer.textContent = `${min < 10 ? "0" + min : min}:${sec < 10 ? "0" + sec : sec}`;
}