import {debounce} from './utils/debounce.js';
import {renderPictures} from './renderPictures.js';
import {getImages} from './api.js';
import {showMessageError} from './pictureForm.js';


const COUNT_RANDOM_IMAGES = 10;
const TIME_DELAY = 500;
const imageFilters = document.querySelector('.img-filters');
const imageFiltersForm = document.querySelector('.img-filters__form');
const filtersButtons = document.querySelectorAll('.img-filters__button');


const showFilters = () => {
  imageFilters.classList.remove('img-filters--inactive');
};

const filterHandler = (evt) => {
  filtersButtons.forEach((button) => {button.classList.remove('img-filters__button--active');});
  evt.target.classList.add('img-filters__button--active');
  getImages((publications) => {
    if(evt.target.id === 'filter-default') {
      renderPictures(publications);
    } else if (evt.target.id === 'filter-random') {
      renderPictures(publications.slice().sort(() => Math.random() - 0.5).slice(0, COUNT_RANDOM_IMAGES));
    } else if (evt.target.id === 'filter-discussed') {
      renderPictures(publications.slice().sort((a, b) => b.comments.length - a.comments.length));
    }
  }, showMessageError);
};
imageFiltersForm.addEventListener('click', debounce(filterHandler, TIME_DELAY));


export {showFilters};
