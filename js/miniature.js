const renderPictures = (publications) => {
  const pictureTemplate = document.querySelector('#picture')
    .content;

  const publicationPictures = document.createDocumentFragment();

  publications.forEach(({url, likes, comments}) => {
    const picture = pictureTemplate.cloneNode(true);
    picture.querySelector('.picture__img').src = url;
    picture.querySelector('.picture__comments').textContent = comments.length;
    picture.querySelector('.picture__likes').textContent = likes;
    publicationPictures.appendChild(picture);
  });
  const photos = document.querySelector('.pictures');
  photos.classList.remove('hidden');

  photos.appendChild(publicationPictures);
};

export {renderPictures};
