import {renderPictures} from './miniature.js';
import {showMessageError} from './form.js';
import './image-settings.js';
import {getImages} from './api.js';
import './preview.js';
import {showFilters} from './filter.js';

getImages((publications) => {
  renderPictures(publications);
  showFilters();
}, showMessageError);

