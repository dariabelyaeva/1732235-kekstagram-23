import {isEscEvent} from './util.js';
const body = document.body;
const uploadForm = document.querySelector('.img-upload__form');
const editPanel = document.querySelector('.img-upload__overlay');

const modalOpenHandler = () => {
  editPanel.classList.remove('hidden');
  body.classList.add('modal-open');
};

const modalCloseHandler = () => {
  editPanel.classList.add('hidden');
  body.classList.remove('modal-open');
  uploadForm.reset();
};

const modalCloseEscHandler = (evt) => {
  if(isEscEvent(evt)) {
    modalCloseHandler();
  }
};

export {modalOpenHandler, modalCloseHandler, modalCloseEscHandler};
