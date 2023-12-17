function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`
};

const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');
let colorInterval = 0;

startBtn.addEventListener('click', () => {
  startBtn.disabled = true;
  changeBgColorBody();
  colorInterval = setInterval(changeBgColorBody, 1000);
}
);

stopBtn.addEventListener('click', () => {
  startBtn.disabled = false;
  clearInterval(colorInterval);
})

function changeBgColorBody() {
  document.body.style.backgroundColor = getRandomHexColor();
}
