const ref = {
    start: document.querySelector("[data-start]"),
    stop: document.querySelector("[data-stop]"),
    body: document.body,
};

let timerId = null;

ref.start.addEventListener("click", onStartBtnClick);
ref.stop.addEventListener("click", onStoptBtnClick);

function onStartBtnClick() {
    ref.start.disabled = true;
    ref.stop.disabled = false;
    timerId = setInterval(changeBodyColor, 1000);
};

function onStoptBtnClick() { 
    ref.start.disabled = false;
    ref.stop.disabled = true;
    clearInterval(timerId);
};

function changeBodyColor() {
    ref.body.style.backgroundColor = `${getRandomHexColor()}`;
   
};






function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
};



