import {renderPictures} from './renderPictures.js';
import {showMessageError} from './pictureForm.js';
import './pictureEffects.js';
import {getImages} from './api.js';
import './pictureFullscreen.js';
import {showFilters} from './picturesFilters.js';

getImages((publications) => {
  renderPictures(publications);
  showFilters();
}, showMessageError);

