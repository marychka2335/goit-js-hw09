import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';
import '../css/02-timer.css'

const refs = {
    inputDate: document.querySelector('#datetime-picker'),
    buttonStart: document.querySelector('button[data-start]'),
    days: document.querySelector('span[data-days]'),
    hours: document.querySelector('span[data-hours]'),
    minutes: document.querySelector('span[data-minutes]'),
    seconds: document.querySelector('span[data-seconds]')
};

let deltaTime = 0;
let leftTime = 0;

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        if (selectedDates[0].getTime() < Date.now()) {
          Notiflix.Notify.warning('Please choose a date in the future');
          refs.buttonStart.disabled = true;
        } else {
            refs.buttonStart.disabled = false;
        }
    }
};

flatpickr('#datetime-picker', options);
refs.buttonStart.disabled = true;

refs.buttonStart.addEventListener('click', () => {
    deltaTime = new Date(refs.inputDate.value).getTime() - Date.now();
    leftTime = convertMs(deltaTime);
    changeTimeOnTimer(leftTime);

    const timeInterval = setInterval(() => {
        deltaTime = new Date(refs.inputDate.value).getTime() - Date.now();
        leftTime = convertMs(deltaTime);
        refs.inputDate.disabled = true;
        if (deltaTime < 1000)
        {
            clearInterval(timeInterval);
            refs.inputDate.disabled = false;
        }
        leftTime = convertMs(deltaTime);
        changeTimeOnTimer(leftTime);
    }, 1000)
    
})

function changeTimeOnTimer({days, hours, minutes, seconds}) {
    refs.days.textContent = addLeadingZero(days);
    refs.hours.textContent = addLeadingZero(hours);
    refs.minutes.textContent = addLeadingZero(minutes);
    refs.seconds.textContent = addLeadingZero(seconds);
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
    return String(value).padStart(2, '0')
}