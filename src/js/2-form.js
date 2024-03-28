const STORAGE_KEY = 'feedback-form-state';

const form = document.querySelector('.feedback-form');

function readFormData(form) {
  const email = form.email.value.trim();
  const message = form.message.value.trim();
  return {
    email,
    message,
  };
}

form.addEventListener('submit', event => {
  event.preventDefault();
  const data = readFormData(form);
  if (data.email === '' || data.message === '') {
    alert('Будь ласка, заповніть усі поля форми.');
    return; //Перевірка заповненості полів
  }
  console.log(data); //Повідомленя у консолі
  localStorage.clear();
  localStorage.removeItem(STORAGE_KEY);
  form.reset();
});

form.addEventListener('input', event => {
  const data = readFormData(event.currentTarget);
  data.email = data.email;
  data.message = data.message;
  const jsonData = JSON.stringify(data);
  localStorage.setItem(STORAGE_KEY, jsonData);
});

const rawData = localStorage.getItem(STORAGE_KEY);
if (rawData) {
  const data = JSON.parse(rawData);
  form.message.value = data.message;
  form.email.value = data.email;
}
