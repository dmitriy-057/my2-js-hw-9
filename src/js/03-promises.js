const refs = {
  delay: document.querySelector('input[name="delay"]'),
  step: document.querySelector('input[name="step"]'),
  amount: document.querySelector('input[name="amount"]'),
  submit: document.querySelector("button"),
};

console.log(refs);
const delay = Number(refs.delay.value);
const step = Number(refs.step.value);
const amount = Number(refs.amount.value);

refs.submit.addEventListener("click", onFormSubmit);

function onFormSubmit(evt) {
  evt.preventDefault();


  for(let i = 1; i <= amount; i +=1) {
    const calculateDelay = delay + (i - 1) * step;
    
      createPromise(i, calculateDelay)
      .then(({ position, delay }) => {
        console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        console.log(`❌ Rejected promise ${position} in ${delay}ms`);
      });
  }
};

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  const promise = new Promise((resolve, reject) => {

    setTimeout(()=> {
      if (shouldResolve) {
        resolve({position, delay})
      } else {
        reject({position,delay})
      }
    }, delay);

  })

  promise
  .then(result => {
    console.log(`Промис ${result.position} выполнен через ${result.delay}ms`)})
  .catch(error => {
    console.log(`Промис ${error.position} не выполнен через ${error.delay}ms`)
  })

}
