import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const formData = {
  email: '',
  message: '',
};
const form = document.querySelector('.js-form');

const LOCAL_KEY = 'feedback-form-state';
const formDataLs = getFromLS(LOCAL_KEY);

if (formDataLs) {
  const { email, message } = formDataLs;
  formData.email = email || '';
  formData.message = message || '';
  form.elements.email.value = email;
  form.elements.message.value = message;
}

form.addEventListener('input', textForm);

function textForm() {
  formData.email = form.elements.email.value.trim();
  formData.message = form.elements.message.value.trim();

  saveInLS(LOCAL_KEY, formData);
}

form.addEventListener('submit', textFormSubmit);

function textFormSubmit(event) {
  event.preventDefault();
  if (formData.email === '' || formData.message === '') {
    iziToast.warning({
      timeout: 5000,
      message: 'Fill please all fields',
      position: 'topRight',
    });
    return;
  }
  console.log(formData);
  form.reset();
  removeFromLS(LOCAL_KEY);
  formData.email = '';
  formData.message = '';
  iziToast.success({
    timeout: 5000,
    position: 'topRight',
    message: 'Message sent! We appreciate your input!',
  });
}

function saveInLS(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

function getFromLS(key) {
  const savedData = localStorage.getItem(key);
  if (savedData) {
    return JSON.parse(savedData);
  }
  return null;
}

function removeFromLS(key) {
  localStorage.removeItem(key);
}
