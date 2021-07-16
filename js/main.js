import {renderPictures} from './miniature.js';
import {modalOpenHandler, modalCloseHandler, modalCloseEscHandler} from './modal.js';
import {hashTagInputHandler, descriptionInputHandler} from './validation.js';
import './image-settings.js';

const uploadForm = document.querySelector('.img-upload__form');
const uploadButton = document.querySelector('#upload-file');
const uploadCancelButton = document.querySelector('#upload-cancel');
const hashTagInput = uploadForm.querySelector('.text__hashtags');
const descriptionInput = document.querySelector('.text__description');


uploadButton.addEventListener('click', modalOpenHandler);
uploadCancelButton.addEventListener('click', modalCloseHandler);
document.addEventListener('keydown', modalCloseEscHandler);

hashTagInput.addEventListener('input', hashTagInputHandler);
descriptionInput.addEventListener('input', descriptionInputHandler);
renderPictures();
