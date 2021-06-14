import {PHOTOS_COUNT, createPublication} from './publication.js';

const publicationPhotos = () => new Array(PHOTOS_COUNT).fill('').map(() => createPublication());
publicationPhotos();
