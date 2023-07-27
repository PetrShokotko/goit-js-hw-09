
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
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

const datetimePicker = document.getElementById('datetime-picker');
const startButton = document.querySelector('[data-start]');
const daysElement = document.querySelector('[data-days]');
const hoursElement = document.querySelector('[data-hours]');
const minutesElement = document.querySelector('[data-minutes]');
const secondsElement = document.querySelector('[data-seconds]');


const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];


    if (selectedDate < new Date()) {
      window.alert("Пожалуйста, укажите дату в будущем");
      startButton.disabled = true;
    } else {
      startButton.disabled = false;
    }
  },
};

flatpickr("#datetime-picker", options);

let countdownInterval;

startButton.addEventListener('click', () => {

  const selectedDate = new Date(datetimePicker.value).getTime();

  countdownInterval = setInterval(() => {
    const currentDate = new Date().getTime();
    const timeLeft = selectedDate - currentDate;

    if (timeLeft <= 0) {
      clearInterval(countdownInterval);
      daysElement.textContent = '00';
      hoursElement.textContent = '00';
      minutesElement.textContent = '00';
      secondsElement.textContent = '00';
    } else {
      const { days, hours, minutes, seconds } = convertMs(timeLeft);
      daysElement.textContent = addLeadingZero(days);
      hoursElement.textContent = addLeadingZero(hours);
      minutesElement.textContent = addLeadingZero(minutes);
      secondsElement.textContent = addLeadingZero(seconds);
    }
  }, 1000);
});