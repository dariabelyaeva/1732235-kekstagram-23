import {renderPictures} from './miniature.js';
import './form.js';
import './image-settings.js';
import {getImages} from './api.js';

const PHOTOS_COUNT = 25;

getImages((publications) => {
  renderPictures(publications.slice(0, PHOTOS_COUNT));
});
