import {isEscEvent} from './utils/isEscEvent.js';
import {sendImages} from './api.js';
import {resetEffect} from './pictureEffects.js';
import {descriptionInputHandler, hashTagInputHandler} from './utils/validation.js';

const body = document.body;
const uploadForm = document.querySelector('.img-upload__form');
const uploadButton = document.querySelector('#upload-file');
const uploadCancelButton = document.querySelector('#upload-cancel');
const editPanel = document.querySelector('.img-upload__overlay');
const hashTagInput = document.querySelector('.text__hashtags');
const descriptionInput = document.querySelector('.text__description');
const errorTemplate = document.querySelector('#error').content;
const successTemplate = document.querySelector('#success').content;

//функция сброса данных формы
const resetForm = () => {
  resetEffect();
  uploadForm.reset();
};

//закрытие формы при нажатии Esc, если фокус на форме, то форма не закроется.
const modalCloseEscHandler = (evt) => {
  if(isEscEvent(evt) && evt.target !== hashTagInput && evt.target !== descriptionInput) {
    modalCloseHandler();
  }
};

//открытие формы
const modalOpenHandler = () => {
  resetForm();
  editPanel.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', modalCloseEscHandler);
  uploadCancelButton.addEventListener('click', modalCloseHandler);
};
uploadButton.addEventListener('click', modalOpenHandler);

//закрытие формы и удаление обработчиков в соответствии с критерием Б26
function modalCloseHandler () {
  editPanel.classList.add('hidden');
  body.classList.remove('modal-open');
  resetForm();
  document.removeEventListener('keydown', modalCloseEscHandler);
  uploadCancelButton.removeEventListener('click', modalCloseHandler);
}

//успешная отправка
const showMessageSuccess = () => {
  const successElement = successTemplate.cloneNode(true);
  body.appendChild(successElement);
  modalCloseHandler();
  const success = document.querySelector('.success');
  const successButton = document.querySelector('.success__button');
  //закрытие сообщения об успешной отправке
  const closeMessageSuccessHandler = () => {
    success.classList.add('hidden');
    success.remove();
  };
  // при нажатии на Esc
  const closeMessageSuccessEscHandler = (evt) => {
    if (isEscEvent(evt)) {
      closeMessageSuccessHandler();
    }
  };
  // при нажатии вне поля
  const closeMessageSuccessOutHandler = (evt) => {
    if (evt.target === success) {
      closeMessageSuccessHandler();
    }
  };
  successButton.addEventListener('click', closeMessageSuccessHandler);
  document.addEventListener('click', closeMessageSuccessOutHandler);
  document.addEventListener('keydown', closeMessageSuccessEscHandler);
};

// ошибка отправки
const showMessageError = (message) => {
  const errorElement = errorTemplate.cloneNode(true);
  const errorMessage = errorElement.querySelector('.error__title');
  const errorButton = errorElement.querySelector('.error__button');
  if (message){
    errorMessage.textContent = message;
    errorButton.textContent = 'ОК';
  }
  body.appendChild(errorElement);
  modalCloseHandler();
  const error = document.querySelector('.error');
  //закрытие сообщения об ошибке
  const closeMessageErrorHandler = () => {
    error.classList.add('hidden');
    error.remove();
  };
  // при нажатии на Esc
  const closeMessageErrorEscHandler = (evt) => {
    if (isEscEvent(evt)) {
      closeMessageErrorHandler();
    }
  };
  // при нажатии вне поля
  const closeMessageErrorOutHandler = (evt) => {
    if (evt.target === error) {
      closeMessageErrorHandler();
    }
  };
  errorButton.addEventListener('click', closeMessageErrorHandler);
  document.addEventListener('click', closeMessageErrorOutHandler);
  document.addEventListener('keydown', closeMessageErrorEscHandler);
};

//отправка формы
const userFormSubmitHandler = (evt) => {
  evt.preventDefault();
  sendImages(
    () => showMessageSuccess(),
    () => showMessageError(),
    new FormData(evt.target),
  );
};
uploadForm.addEventListener('submit', userFormSubmitHandler);

hashTagInput.addEventListener('input', hashTagInputHandler);
descriptionInput.addEventListener('input', descriptionInputHandler);
export {showMessageError};
