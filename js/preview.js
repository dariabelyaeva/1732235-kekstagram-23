import {isEscEvent} from './util.js';

const COMMENTS_STEP = 5;
const body = document.body;
const bigPicture = document.querySelector('.big-picture');
const imageBigPicture = document.querySelector('.big-picture__img img');
const bigPictureClose = document.querySelector('.big-picture__cancel');
const likesCount = document.querySelector('.likes-count');
const commentsBlock = document.querySelector('.social__comments');
const commentsCountBlock = document.querySelector('.social__comment-count');
const socialCaption = document.querySelector('.social__caption');
const commentsCount = document.querySelector('.comments-count');
const commentsLoader = document.querySelector('.comments-loader');


//создание комментариев
const renderComments = (comments, commentsLength) => {
  const publicationComments = comments.slice(0, commentsLength);
  const publicationCommentsString = publicationComments.map((comment) => `
  <li class="social__comment">
    <img
        class="social__picture"
        src="${comment.avatar}"
        alt="${comment.name}"
        width="35" height="35">
    <p class="social__text">${comment.message}</p>
  </li>
  `).join('\n');
  commentsBlock.innerHTML = publicationCommentsString;
  if(publicationComments.length === comments.length) {
    commentsLoader.classList.add('hidden');
  }
  const visibleCommentsCount = `${publicationComments.length} из <span class="comments-count">${comments.length}</span> комментариев`;
  commentsCountBlock.innerHTML = visibleCommentsCount;
};

// закрытие полноразм изобр, удаление обработчика по Б26
const closeBigPicturesHandler = () => {
  bigPicture.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', closeBigPicturesEscHandler);
};

//закрытие полноразмерного изображения Esc
function closeBigPicturesEscHandler (evt) {
  if(isEscEvent(evt)) {
    closeBigPicturesHandler();
  }
}
const showMoreCommentsHandler = (picture) => {
  const visibleCommentsLength = commentsBlock.children.length;
  renderComments(picture.comments, visibleCommentsLength + COMMENTS_STEP);
};

//открыть полноразм изоб и заполнить данные об этом изображении
const openPreviewHandler = (picture) => {
  body.classList.add('modal-open');
  bigPicture.classList.remove('hidden');
  commentsLoader.classList.remove('hidden');
  commentsCountBlock.classList.remove('hidden');
  bigPictureClose.addEventListener('click', closeBigPicturesHandler);
  document.addEventListener('keydown', closeBigPicturesEscHandler);
  imageBigPicture.src = picture.url;
  socialCaption.textContent = picture.description;
  likesCount.textContent = picture.likes;
  commentsCount.textContent = picture.comments.length;
  commentsLoader.addEventListener('click', () => showMoreCommentsHandler(picture));
  renderComments(picture.comments, 5);
};

export {openPreviewHandler};
