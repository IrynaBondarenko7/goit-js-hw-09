import Notiflix from 'notiflix';

const form = document.querySelector('.form');

form.addEventListener('submit', onFormSubmit);

//функція, яка створює і повертає один проміс
function createPromise(position, delay) {
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
  return promise;
}

function onFormSubmit(evt) {
  evt.preventDefault();

  //доступ до значень елементів форми
  const {
    elements: { delay, step, amount },
  } = evt.currentTarget;

  let firstDelay = Number(delay.value);
  const stepDeley = Number(step.value);

  //цикл створює стільки промісів, скільки введено в поле amount
  for (let i = 0; i < amount.value; i++) {
    createPromise(1 + i, firstDelay + i * stepDeley)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      });
  }
  form.reset();
}
