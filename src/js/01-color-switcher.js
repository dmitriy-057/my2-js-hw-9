const refs = {
    startBtn: document.querySelector("button[data-start]"),
    stopBtn: document.querySelector("button[data-stop]"),
};

let intervalId;

refs.startBtn.addEventListener('click', onStartBtnClick);
refs.stopBtn.addEventListener("click", onStopBtnClick);
refs.stopBtn.disabled = true;

function onStartBtnClick() {
    refs.startBtn.disabled = true;
    refs.stopBtn.disabled = false;

    if(intervalId) {
        return;
    };

    intervalId = setInterval(()=> {
    document.body.style.backgroundColor = getRandomHexColor()
    },1000);
};

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
  };

  function onStopBtnClick() {
    clearInterval(intervalId);
    intervalId = null;
    refs.startBtn.disabled = false;
    refs.stopBtn.disabled = true;
  };

