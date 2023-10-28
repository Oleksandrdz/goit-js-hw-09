import Notiflix from 'notiflix';

const refs = {
  form: document.querySelector('.form'),
  inputs: document.querySelectorAll('input'),
};

refs.form.addEventListener("submit", onClickCreate);


function onClickCreate(evt) {
  evt.preventDefault();

  let input = {};
  refs.inputs.forEach(element => {
    input[element.name] = Number(element.value.trim());
  });


  for (let i = 1; i <= input.amount; i += 1){
    let currentStep = input.delay += input.step;
  createPromise(input.delay, currentStep)
  .then(({ position, delay }) => {
    Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);   
  })
  .catch(({ position, delay }) => {
    Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);   
  });
  }
  // evt.target.reset();
 }


function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
 
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({position, delay});
      } else {
        reject({position, delay});
      }
    }, delay)
  })   
}
 