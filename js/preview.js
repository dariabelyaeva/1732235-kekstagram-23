import {isEscEvent} from './util.js';

//const COMMENTS_STEP = 5;
const body = document.body;
const bigPicture = document.querySelector('.big-picture');
const imageBigPicture = document.querySelector('.big-picture__img img');
const bigPictureClose = document.querySelector('.big-picture__cancel');
const likesCount = document.querySelector('.likes-count');
const commentsBlock= document.querySelector('.social__comments');
//const commentsCountBlock = document.querySelector('.social__comment-count');
const socialCaption = document.querySelector('.social__caption');
//const commentTemplate = document.querySelector('#comment').content;
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
  //commentsBlock.appendChild(commentsFragment);
  if(publicationComments.length === comments.length) {
    commentsLoader.classList.add('hidden');
  }
  //показано publicationComments.length комментариев из...(доделать)
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

//открытие окна с полноразмерным изоб
const openBigPictures = () => {
  body.classList.add('modal-open');
  bigPicture.classList.remove('hidden');
  bigPictureClose.addEventListener('click', closeBigPicturesHandler);
  document.addEventListener('keydown', closeBigPicturesEscHandler);
};

//открыть полноразм изоб и заполнить данные об этом изображении
const openPreviewHandler = (picture) => {
  openBigPictures();
  imageBigPicture.src = picture.url;
  socialCaption.textContent = picture.description;
  likesCount.textContent = picture.likes;
  commentsCount.textContent = picture.comments.length;
  renderComments(picture.comments, 5);
  //Сразу после открытия изображения в полноэкранном режиме отображается не более 5 комментариев.
  //Отображение дополнительных комментариев происходит при нажатии на кнопку .comments-loader.
  //При нажатии на кнопку .comments-loader отображается не более 5 новых комментариев.
  //При изменении количества показанных комментариев число показанных комментариев в блоке .social__comment-count также изменяется
};

export {openPreviewHandler};
