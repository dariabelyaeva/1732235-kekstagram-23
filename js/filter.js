import {debounce} from './utils/debounce.js';
import {renderPictures} from './miniature.js';
import {getUniqueArrayElement} from './util';

const COUNT_RANDOM_IMAGES = 10;
const TIME_DELAY = 500;
const imageFilters = document.querySelector('.img-filters');
const filterDefault = document.querySelector('#filter-default');
const filterRandom = document.querySelector('#filter-random');
const filterDiscussed = document.querySelector('#filter-discussed');
const imageFiltersButton = document.querySelectorAll('.img-filters__button');


//3 обработчика на каждый фильтр
//«По умолчанию» — фотографии в изначальном порядке с сервера;
//«Случайные» — 10 случайных, не повторяющихся фотографий;
//«Обсуждаемые» — фотографии, отсортированные в порядке убывания количества комментариев.
//Блок, с помощью которого производится фильтрация фотографий, скрыт изначально и показывается только после окончания загрузки всех фотографий.
// использовать getUniqueArrayElement для получения уникального значения из массива.
