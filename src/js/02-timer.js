import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

const refs = {
    input: document.querySelector("#datetime-picker"),
    startBtn: document.querySelector("[data-start]"),
    counterDays: document.querySelector("[data-days]"),
    counterHours: document.querySelector("[data-hours]"),
    counterMinutes: document.querySelector("[data-minutes]"),
    counterSeconds: document.querySelector("[data-seconds]"),
};

let selectedDate;
refs.startBtn.disabled = true;

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        if (selectedDates[0] <= new Date()) {
            refs.startBtn.disabled = true;
            Notiflix.Notify.failure('Please choose a date in the future');
        } else {
            refs.startBtn.disabled = false;
            selectedDate = selectedDates[0];
        }
    },
};

flatpickr(refs.input, options);
refs.startBtn.addEventListener('click', onClick);

function onClick() {
    let intervalId = setInterval(() => {
        refs.startBtn.disabled = true;
        const today = new Date();
        let remainingTime = selectedDate - today;
        if (remainingTime < 0) {
            clearInterval(intervalId);
            return
        }
        updateTime(remainingTime);
    }, 1000);
}

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

function updateTime(time) {
    const { days, hours, minutes, seconds } = convertMs(time);
    refs.counterDays.textContent = days.toString().padStart(2, "0");
    refs.counterHours.textContent = hours.toString().padStart(2, "0");
    refs.counterMinutes.textContent = minutes.toString().padStart(2, "0");
    refs.counterSeconds.textContent = seconds.toString().padStart(2, "0");
}