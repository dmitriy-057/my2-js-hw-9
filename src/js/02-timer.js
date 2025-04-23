import flatpickr from "flatpickr";
// import "flatpickr/dist/flatpickr.min.css";
import "flatpickr/dist/themes/dark.css";


const dateTimeInput = document.getElementById("datetime-picker");
const startBtn = document.querySelector("button[data-start]");

const refs = {
    days: document.querySelector("[data-days]"),
    hours: document.querySelector("[data-hours]"),
    mins: document.querySelector("[data-minutes]"),
    secs: document.querySelector("[data-seconds]"),
};

startBtn.disabled = true;
let intervalId;
let userSelectedDate;
startBtn.addEventListener("click", onClickBtn);

const options = {
    // Включает выбор времени
    enableTime: true,
    time_24hr: true,
    //Устанавливает начальную выбранную дату
    defaultDate: new Date(),
    // Регулирует шаг ввода минут (включая прокрутку)
    minuteIncrement: 1,
    // Функция(и) для срабатывания каждый раз при закрытии календаря
    onClose(selectedDates) {
        userSelectedDate = selectedDates[0];
        console.log(userSelectedDate);
    
    if(userSelectedDate < Date.now()) {
        window.alert("Please choose a date in the future");
    } else if(userSelectedDate > Date.now()) {
        startBtn.disabled = false;
    }
    },
  };

function onClickBtn() {
   intervalId = setInterval(() => {
    const resultMs = Math.floor(userSelectedDate - new Date());

    if(resultMs <= 0) {
        clearInterval(intervalId);
        console.log('Таймер отключен');
        return;
    };

    const time = convertMs(resultMs);
    console.log(time);
    refs.days.textContent = time.days;
    refs.hours.textContent = time.hours;
    refs.mins.textContent = time.minutes;
    refs.secs.textContent = time.seconds;
    }, 1000);

};

flatpickr(dateTimeInput, options);

function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
  
    // Remaining days
    const days = Math.floor(ms / day);
    // Remaining hours
    const hours = Math.floor((ms % day) / hour);
    // Remaining minutes
    const minutes = Math.floor(((ms % day) % hour) / minute);
    // Remaining seconds
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  
    return { days, hours, minutes, seconds };
  }


