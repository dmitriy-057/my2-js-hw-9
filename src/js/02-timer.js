import flatpickr from "flatpickr";
// import "flatpickr/dist/flatpickr.min.css";
import "flatpickr/dist/themes/dark.css";
// import Notiflix from 'notiflix';
import { Report } from 'notiflix/build/notiflix-report-aio';
import 'animate.css';


const dateTimeInput = document.getElementById("datetime-picker");
const startBtn = document.querySelector("button[data-start]");

const refs = {
    days: document.querySelector("[data-days]"),
    hours: document.querySelector("[data-hours]"),
    mins: document.querySelector("[data-minutes]"),
    secs: document.querySelector("[data-seconds]"),
};
// add Animate css class
Object.values(refs).forEach(el => {
    el.classList.add('animate__animated', 'animate__flipInX')
});


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
        Report.failure(
        'Вибери дату у майбутньому', 
        'От як таймер може працювати у минулому?!',
        "OK"
        );
    } else if(userSelectedDate > Date.now()) {
        startBtn.disabled = false;
    }
    },
  };

function onClickBtn() {
    // запрет повторного запуска таймера
    if(intervalId) {
        return;
    };

   intervalId = setInterval(() => {
    const resultMs = Math.floor(userSelectedDate - new Date());

    if(resultMs <= 0) {
        clearInterval(intervalId);
        intervalId = null;
        Report.success("Time is over");
        console.log('Таймер отключен');
        return;
    };

    const time = convertMs(resultMs);
    console.log(time);
    

    refs.days.textContent = addLeadingZero(time.days);
    refs.hours.textContent = addLeadingZero(time.hours);
    refs.mins.textContent = addLeadingZero(time.minutes);
    refs.secs.textContent = addLeadingZero(time.seconds);

    refs.secs.classList.remove('animate__flipInX');
    void refs.secs.offsetWidth; // принудительный reflow
    refs.secs.classList.add('animate__flipInX');

    }, 1000);


};

function addLeadingZero(value){
    return String(value).padStart(2, "0");
}
 
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


