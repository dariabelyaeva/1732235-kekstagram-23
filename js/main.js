import {renderPictures} from './miniature.js';
import {showMessageError} from './form.js';
import './image-settings.js';
import {getImages} from './api.js';
import './preview.js';

const PHOTOS_COUNT = 25;

getImages((publications) => {
  renderPictures(publications.slice(0, PHOTOS_COUNT));
}, showMessageError);
