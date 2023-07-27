function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`;
}

const startButton = document.querySelector('[data-start]');
const stopButton = document.querySelector('[data-stop]');
const body = document.body;

let intervalId = null;

function setColorInterval() {
  intervalId = setInterval(() => {
    body.style.backgroundColor = getRandomHexColor();
  }, 1000);
}

function startColorSwitcher() {
  startButton.disabled = true;
  stopButton.disabled = false;
  setColorInterval();
}

function stopColorSwitcher() {
  startButton.disabled = false;
  stopButton.disabled = true;
  clearInterval(intervalId);
}

startButton.addEventListener('click', startColorSwitcher);
stopButton.addEventListener('click', stopColorSwitcher);