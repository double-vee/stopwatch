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
  if(sessionStorage.getItem("seconds_paused")) {
    // RESUME
    startTime = Date.now();
    createTimer = setInterval(function() {
      time = Date.now() - startTime;
      seconds = Math.floor(time / 1000) + Number(sessionStorage.getItem("seconds_paused"));
      console.log(time, seconds);

      formatTime();
    }, 1000);

    pauseBtn.classList.add("role-pause");
  } else {
    startTime = Date.now();
    createTimer = setInterval(function() {
    time = Date.now() - startTime;
    seconds = Math.floor(time / 1000);
    console.log(time, seconds);

    formatTime();
    }, 1000);
  }
  
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

stopBtn.addEventListener('click', () => {
  clearInterval(createTimer);
  sessionStorage.removeItem("seconds_paused");
  saveBtn.hidden = false;
  startBtn.disabled = true;
  pauseBtn.disabled = true;
  nextBtn.disabled = true;
});

pauseBtn.addEventListener('click', () => {
  if(createTimer && pauseBtn.classList.contains("role-pause")) {
    clearInterval(createTimer);
    sessionStorage.setItem("seconds_paused", seconds);

    pauseBtn.classList.remove("role-pause");
    startBtn.disabled = false;
  } else {
    // RESUME
    startTime = Date.now();
    createTimer = setInterval(function() {
      time = Date.now() - startTime;
      seconds = Math.floor(time / 1000) + Number(sessionStorage.getItem("seconds_paused"));
      console.log(time, seconds);

      formatTime();
    }, 1000);

    startBtn.disabled = true;
    pauseBtn.classList.add("role-pause");
  }
});

nextBtn.addEventListener('click', () => {
  clearInterval(createTimer);
  previousTimeContainer.textContent = timeContainer.textContent;
  timeContainer.textContent = `0:00`;
  previousTimeContainer.hidden = false;

  startTime = Date.now();
  createTimer = setInterval(function() {
    time = Date.now() - startTime;
    seconds = Math.floor(time / 1000);
    formatTime();
  }, 1000);

  if(!pauseBtn.classList.contains("role-pause")) {
    pauseBtn.classList.add("role-pause");
  }
});

saveBtn.addEventListener('click', () => {
  let previousResult;
  let nextResult;
  let result;

  const resultHTML = document.createElement("article");
  
  if(previousTimeContainer.textContent !== `0:00`) {
    previousResult = prompt("1st result entry name:");
    localStorage.setItem(previousResult, previousTimeContainer.textContent);

    nextResult = prompt("2nd result entry name:");
    localStorage.setItem(nextResult, timeContainer.textContent);
  } else {
    result = prompt("Result entry name:");
    let entryName = result;
    localStorage.setItem(result, timeContainer.textContent);

    resultHTML.innerHTML = `
    <h3 class="result-name text-l font-bold font-sans text-indigo-600">${entryName}:</h3>
    <p class="result-time text-l font-bold font-sans text-indigo-600 hidden">${localStorage.getItem(result)}</p>`;

    resultsContainer.append(resultHTML);
  }

  // WIP
  const resultName = document.querySelectorAll(".result-name");
  console.log(resultName);

  resultName.forEach(function(element) {
    element.addEventListener("click", event => {
      event.target.nextElementSibling.classList.toggle("hidden");
    });  
  });
  // WIP

  timeContainer.textContent = `0:00`;
  previousTimeContainer.textContent = `0:00`;

  startBtn.disabled = false;
  pauseBtn.disabled = true;
  nextBtn.disabled = true;
  stopBtn.hidden = true;
  saveBtn.hidden = true;
  previousTimeContainer.hidden = true;

  if(!pauseBtn.classList.contains("role-pause")) {
    pauseBtn.classList.add("role-pause");
  }
});

resetBtn.addEventListener('click', () => {
  clearInterval(createTimer);
  timeContainer.textContent = `0:00`;
  previousTimeContainer.textContent = `0:00`;
  sessionStorage.removeItem("seconds_paused");
  startBtn.disabled = false;
  pauseBtn.disabled = true;
  nextBtn.disabled = true;
  stopBtn.hidden = true;
  saveBtn.hidden = true;
  previousTimeContainer.hidden = true;

  if(!pauseBtn.classList.contains("role-pause")) {
    pauseBtn.classList.add("role-pause");
  }
});












