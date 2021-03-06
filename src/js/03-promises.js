import { Notify } from 'notiflix/build/notiflix-notify-aio';

const ref = {
  delay: document.querySelector('[name="delay"]'),
  step: document.querySelector('[name="step"]'),
  amount: document.querySelector('[name="amount"]'),
  button: document.querySelector('[type="submit"]'),
}

ref.button.addEventListener("click", create);

let delay = null;
let step = null;
let amount = null;
let position;

function create(event) {
  event.preventDefault();
  delay = Number(ref.delay.value);
  step = Number(ref.step.value);
  amount = Number(ref.amount.value);
 
  if (delay< 0 || step< 0 || amount < 0) {
        Notify.failure(`Введите плюсовые значения`)
    return;
  }
  for (let i = 1; i <= ref.amount.value; i += 1){
    position = i;
    
    createPromise(position, delay)
      .then(({ position, delay }) => {
    Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
    
  })
      .catch(({ position, delay }) => {
    Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`)
    
  });
   
    delay += step;
};
  
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
      
    resolve({ position, delay });
  } else {
       reject({ position, delay });
  }
  }, delay);
  })
 
 
}

