import { Notify } from 'notiflix/build/notiflix-notify-aio';
const refs = {
  delay: document.querySelector('input[name="delay"]'),
  step: document.querySelector('input[name="step"]'),
  amount: document.querySelector('input[name="amount"]'),
  submitForm: document.querySelector("form"),
};

console.log(refs);


refs.submitForm.addEventListener("submit", onFormSubmit);

function onFormSubmit(evt) {
  evt.preventDefault();
  const delay = Number(refs.delay.value);
  const step = Number(refs.step.value);
  const amount = Number(refs.amount.value);
  console.log({delay,step,amount});

  for(let i = 1; i <= amount; i+=1) {
    currentDelay = delay + (i-1) * step;

    createPromise(i, currentDelay)
    .then(({ position, delay }) => {
      Notify.success(`Fulfilled promise ${position} in ${delay}ms`);
    })
    .catch(({ position, delay }) => {
      Notify.failure(` Rejected promise ${position} in ${delay}ms`);
    });
  }

}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  return new Promise((resolve,reject)=> {
    setTimeout(() => {
      if (shouldResolve) {
        console.log({position, delay});
        resolve({position,delay})
      } else {
        {position, delay};
        reject({position,delay})
      }
    }, delay);
  })

}

// function onFormSubmit(evt) {
//   evt.preventDefault();
//   const delay = Number(refs.delay.value);
//   const step = Number(refs.step.value);
//   const amount = Number(refs.amount.value);
//   console.log({delay, step, amount});
//   console.log("onFromSubmit click");
  
//     for(let i= 1; i <= amount; i+=1) {
//       const currentDelay = delay +(i-1) * step;

//       createPromise(i, currentDelay)
//       .then(({ position, delay }) => {
//         console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
//       })
//       .catch(({ position, delay }) => {
//         console.log(`❌ Rejected promise ${position} in ${delay}ms`);
//       });
//     };
// };

// function createPromise(position, delay) {
//   const shouldResolve = Math.random() > 0.3;

//   return new Promise((resolve, reject) => {

//     setTimeout(()=> {
//       if (shouldResolve) {
//         resolve({position, delay})
//       } else {
//         reject({position,delay})
//       }
//     }, delay);
//   })

// }
