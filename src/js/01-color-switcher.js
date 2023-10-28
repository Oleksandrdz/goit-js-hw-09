const refs = {
    page: document.querySelector("body"),
    startBtn: document.querySelector('[data-start]'),
    stopBtn: document.querySelector('[data-stop]'),
};

let intervalId = null;

refs.startBtn.addEventListener("click", changeColor);
refs.stopBtn.addEventListener("click", stopColor); 

function changeColor(color) {
    stateButtons(true, false);
    intervalId = setInterval(() => {
        color = getRandomHexColor();
        refs.page.style.backgroundColor = color;
    }, 1000);
};

function stopColor() {
    clearInterval(intervalId);
    stateButtons(false, true);
};

function stateButtons(startDisabled, stopDisabled) {
    refs.startBtn.disabled = startDisabled;
    refs.stopBtn.disabled = stopDisabled; 
};

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
};
