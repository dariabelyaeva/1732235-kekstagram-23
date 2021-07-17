import {isEscEvent} from './util.js';
import {sendImages} from './api.js';
import {resetEffect} from './image-settings.js';

const COMMENT_MAX_SYMBOLS = 140;
const HASHTAG_MAX_AMOUNT = 5;
const HASHTAG_REG_EXP = /^#[A-Za-zА-Я-а-я0-9]{1,19}$/;
const body = document.body;
const uploadForm = document.querySelector('.img-upload__form');
const uploadButton = document.querySelector('#upload-file');
const uploadCancelButton = document.querySelector('#upload-cancel');
const editPanel = document.querySelector('.img-upload__overlay');
const hashTagInput = document.querySelector('.text__hashtags');
const descriptionInput = document.querySelector('.text__description');
const errorTemplate = document.querySelector('#error').content;
const error = document.querySelector('.error');
const errorButton = errorTemplate.querySelector('.error__button');
const successTemplate = document.querySelector('#success').content;
const success = document.querySelector('.success');
const successButton = successTemplate.querySelector('.success__button');

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
  editPanel.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', modalCloseEscHandler);
};
uploadButton.addEventListener('click', modalOpenHandler);
//закрытие формы и удаление обработчика Esc
function modalCloseHandler () {
  editPanel.classList.add('hidden');
  body.classList.remove('modal-open');
  resetForm();
  document.removeEventListener('keydown', modalCloseEscHandler);
}
uploadCancelButton.addEventListener('click', modalCloseHandler);

//валидация хэштега и описания
const hashTagInputHandler = (evt) => {
  const tagsInput = evt.target;
  const tags = tagsInput.value.split(' ');
  const isValid = tags.every((tag) => HASHTAG_REG_EXP.test(tag));
  if(!isValid){
    tagsInput.setCustomValidity('Ошибка ввода');
    hashTagInput.style.border = '5px solid red';
  } else if (tags.length > HASHTAG_MAX_AMOUNT) {
    tagsInput.setCustomValidity(`Не более ${HASHTAG_MAX_AMOUNT} хэштегов!`);
  } else if (!(tags.length === new Set(tags).size)) {
    tagsInput.setCustomValidity('Хэштеги не могут быть одинаковыми!');
  } else {
    tagsInput.setCustomValidity('');
  }
  tagsInput.reportValidity();
};
hashTagInput.addEventListener('input', hashTagInputHandler);

const descriptionInputHandler = (evt) => {
  const descriptionInputForm = evt.target;
  if (descriptionInputForm.value.length > COMMENT_MAX_SYMBOLS) {
    descriptionInput.setCustomValidity(`Максимальное количество символов ${COMMENT_MAX_SYMBOLS}. Удалите ${descriptionInputForm.value.length - COMMENT_MAX_SYMBOLS} символов.`);
    descriptionInput.style.border = '5px solid red';
  } else {
    descriptionInput.setCustomValidity('');
  }
  descriptionInput.reportValidity();
};
descriptionInput.addEventListener('input', descriptionInputHandler);

//закрытие сообщения об ошибке
const closeMessageSuccessHandler = () => {
  success.classList.add('hidden');
  success.remove();
};
  // при нажатии на Esc
const closeMessageSuccessEscHandler = (evt) => {
  if (isEscEvent(evt) && evt.target === success) {
    closeMessageSuccessHandler();
  }
};
  // при нажатии вне поля
const closeMessageSuccessOutHandler = (evt) => {
  if (evt.target === success) {
    closeMessageSuccessHandler();
  }
};
//ошибка отправки
const showMessageSuccess = () => {
  const successElement = errorTemplate.cloneNode(true);
  body.appendChild(successElement);
  modalCloseHandler();

  successButton.addEventListener('click', closeMessageSuccessHandler);
  document.addEventListener('click', closeMessageSuccessEscHandler);
  document.addEventListener('keydown', closeMessageSuccessOutHandler);
};

//закрытие сообщения об ошибке
const closeMessageErrorHandler = () => {
  error.classList.add('hidden');
  error.remove();
};
  // при нажатии на Esc
const closeMessageErrorEscHandler = (evt) => {
  if (isEscEvent(evt) && evt.target === error) {
    closeMessageErrorHandler();
  }
};
  // при нажатии вне поля
const closeMessageErrorOutHandler = (evt) => {
  if (evt.target === error) {
    closeMessageErrorHandler();
  }
};
//ошибка отправки
const showMessageError = () => {
  const errorElement = errorTemplate.cloneNode(true);
  body.appendChild(errorElement);
  modalCloseHandler();

  errorButton.addEventListener('click', closeMessageErrorHandler);
  document.addEventListener('click', closeMessageErrorOutHandler);
  document.addEventListener('keydown', closeMessageErrorEscHandler);
};

//отправка формы
const userFormSubmitHandler = (evt) => {
  evt.preventDefault();
  sendImages(
    () => {
      showMessageSuccess();
    },
    () => {
      showMessageError();
    },
    new FormData(evt.target),
  );
};
uploadForm.addEventListener('submit', userFormSubmitHandler);
