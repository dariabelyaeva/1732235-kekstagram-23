import {openPreviewHandler} from './preview.js';

const renderPictures = (publications) => {
  const pictureTemplate = document.querySelector('#picture')
    .content;

  const publicationPictures = document.createDocumentFragment();

  publications.forEach((picture) => {
    const pictureElement = pictureTemplate.cloneNode(true);
    pictureElement.querySelector('.picture__img').src = picture.url;
    pictureElement.querySelector('.picture__comments').textContent = picture.comments.length;
    pictureElement.querySelector('.picture__likes').textContent = picture.likes;
    pictureElement.querySelector('.picture__img').addEventListener('click', () => openPreviewHandler(picture));
    publicationPictures.appendChild(pictureElement);
  });
  const photos = document.querySelector('.pictures');
  photos.classList.remove('hidden');

  photos.appendChild(publicationPictures);
};


export {renderPictures};
