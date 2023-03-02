import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);

    const defoultDateValue = options.defaultDate.getTime();
    const selectedDatesValue = selectedDates[0].getTime();

    //Якщо користувач вибрав дату в минулому
    if (selectedDatesValue - defoultDateValue < 0) {
      Notiflix.Notify.failure('Please choose a date in the future');
    } else {
      refs.btnStart.disabled = false;
      refs.btnStart.style.backgroundColor = '#239b56';
      refs.btnStart.style.color = '#fff';
    }
  },
};

flatpickr('#datetime-picker', options);

const refs = {
  timer: document.querySelector('.timer'),
  inputDate: document.querySelector('#datetime-picker'),
  btnStart: document.querySelector('button[data-start]'),
  daysValue: document.querySelector('span[data-days]'),
  hoursValue: document.querySelector('span[data-hours]'),
  minutesValue: document.querySelector('span[data-minutes]'),
  secondsValue: document.querySelector('span[data-seconds]'),
};

refs.btnStart.disabled = true;

const timer = {
  intervalId: null,
  isActive: false,
  start() {
    if (this.isActive) {
      return;
    }

    this.isActive = true;
    refs.btnStart.disabled = true;

    this.intervalId = setInterval(() => {
      //від дати, що обрав користувач віднімаємо поточний час
      const deltaTime = new Date(refs.inputDate.value) - Date.now();

      if (deltaTime >= 0) {
        const time = convertMs(deltaTime);
        updateTimarFace(time);
      } else {
        clearInterval(this.intervalId);
        Notiflix.Notify.success('Counting finished');
      }
    }, 1000);
  },
};

refs.btnStart.addEventListener('click', onButtonStartClick);

function onButtonStartClick() {
  timer.start();
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}

//функція, яка форматує значення часу до 2х символів
function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

//фунцкія, яка оновлює інтерфейс DOM
function updateTimarFace({ days, hours, minutes, seconds }) {
  refs.daysValue.textContent = `${days}`;
  refs.hoursValue.textContent = `${hours}`;
  refs.minutesValue.textContent = `${minutes}`;
  refs.secondsValue.textContent = `${seconds}`;
}
