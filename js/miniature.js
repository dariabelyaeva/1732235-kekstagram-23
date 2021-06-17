import {publishPhotos} from './publication.js';

const pictureTemplate = document.querySelector('#picture')
  .content;

const publishedPublication = publishPhotos();
const publicationPictures = document.createDocumentFragment();

const createPicturePublication = () => {
  publishedPublication.forEach(({url, likes, comments}) => {
    const picture = pictureTemplate.cloneNode(true);
    picture.querySelector('.picture__img').src = url;
    picture.querySelector('.picture__comments').textContent = comments.length;
    picture.querySelector('.picture__likes').textContent = likes;
    publicationPictures.appendChild(picture);
  });
};

export {createPicturePublication};
