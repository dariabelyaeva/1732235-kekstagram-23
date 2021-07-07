import {isEscEvent} from './util.js';
const body = document.body;
const uploadForm = document.querySelector('.img-upload__form');
const editPanel = document.querySelector('.img-upload__overlay');
const hashTagInput = uploadForm.querySelector('.text__hashtags');
const descriptionInput = document.querySelector('.text__description');

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
  if(isEscEvent(evt) && evt.target !== hashTagInput && evt.target !== descriptionInput) {
    modalCloseHandler();
  }
};

export {modalOpenHandler, modalCloseHandler, modalCloseEscHandler};
