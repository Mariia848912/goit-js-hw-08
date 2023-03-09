import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');

form.addEventListener('input', throttle(onElementFormInput, 500));
form.addEventListener('submit', onFormSubmit);

const STORAGE_KEY = 'feedback-form-state';
let formData = {};

console.log(formData);
populateTextarea();

function onElementFormInput(evt) {
  if (localStorage.getItem(STORAGE_KEY)) {
    formData = JSON.parse(localStorage.getItem(STORAGE_KEY));
  }
  formData[evt.target.name] = evt.target.value;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

function onFormSubmit(evt) {
  evt.preventDefault();
  if (form.email.value && form.message.value) {
    evt.currentTarget.reset();
    localStorage.removeItem(STORAGE_KEY);
    console.log(formData);
  } else {
    alert('Для отправки сообщения необходимо заполнить Email и Message');
  }
  formData = {};
}

function populateTextarea() {
  const informationFromStorageJson = localStorage.getItem(STORAGE_KEY);
  const informationFromStorage = JSON.parse(informationFromStorageJson);

  if (informationFromStorage) {
    form.email.value = informationFromStorage.email || '';
    form.message.value = informationFromStorage.message || '';
  }
}
