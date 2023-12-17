import Notiflix from 'notiflix';


function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
resolve({ position, delay});
      } else {
reject({ position, delay })        
  }
}, delay )
  });
  return promise
}
const refs = {
  form: document.querySelector('.form'),
  inputDelay: document.querySelector('input[name="delay"]'),
  inputStep: document.querySelector('input[name="step"]'),
  inputAmount: document.querySelector('input[name="amount"]'),
  button: document.querySelector('button[type="submit"]')
}

  refs.form.addEventListener('submit', (evt) => {
    evt.preventDefault();
    let delay = Number(refs.inputDelay.value);
    const step = Number(refs.inputStep.value);
    const amount = Number(refs.inputAmount.value);
    for (let i = 1; i <= amount; i += 1) {
      createPromise(i, delay).then(({position, delay}) => {
        Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`)
      }).catch(({position, delay})=> {
        Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`)
      })
      delay += step;
    };
  }
  )

