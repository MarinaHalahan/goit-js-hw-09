import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const ref = {
  days: document.querySelector("[data-days]"),
  hours: document.querySelector("[data-hours]"),
  minutes: document.querySelector("[data-minutes]"),
  seconds: document.querySelector("[data-seconds]"),
  btnStart: document.querySelector("[data-start]"),
  input: document.querySelector("#datetime-picker"),

};

ref.btnStart.disabled = true;


const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
 
  onClose(selectedDates) {
       
    
    if (selectedDates[0] < options.defaultDate) {
      Notify.failure("Please choose a date in the future");
      return;
    };
    ref.btnStart.disabled = false;
     let selectedTime = Date.parse(ref.input.value);
     
      
    let timerId = null;

    function onclick() {
      ref.btnStart.disabled = true;
      timerId = setInterval(timer, 1000);
    };
  

    function timer() {
    
    let differenceMS = selectedTime - Date.now();
     
      if (differenceMS < 0) {
          clearInterval(timerId);
          return;
      };

      let convertMsData = convertMs(differenceMS);
      ref.days.textContent = convertMsData.days;
      ref.hours.textContent = convertMsData.hours;
      ref.minutes.textContent = convertMsData.minutes;
      ref.seconds.textContent = convertMsData.seconds;
                      
    };
    
    ref.btnStart.addEventListener("click", onclick);

  },
};

const fp = flatpickr("#datetime-picker", options);


function addLeadingZero(value) {
  if(String(value).length < 2) {
    return String(value).padStart(2, "0");
  }
  return value;
};

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
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));
 

  return { days, hours, minutes, seconds };
}

