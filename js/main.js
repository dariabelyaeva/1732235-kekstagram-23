const PHOTO_COUNT = 25;
const NAMES = ['Дмитрий', 'Артем', 'Ирина', 'Екатерина', 'Максим', 'Стас', 'Елизавета', 'Надя', 'Данил', 'Саша', 'Николай', 'Дарья', 'Юлия', 'Мария', 'Владимир', 'Сергей', 'Женя', 'Ольга', 'Леся', 'Костя', 'Света', 'Андрей', 'Пётр'];
const MESSAGES = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
const DESCRIPTIONS = ['В поле, с рыбкой...', 'Я — бесценных слов транжир и мот', 'Им нипочем огонь забвения', 'Как жизнь и смерть на кончике ножа', 'Пустые споры с небом о дожде', 'Здравствуй лето, зеленое, милое, светлое...', 'В плену сентябрьской тоски', 'Пахнет радостью земля', 'Смелы наши стрелы', 'Да и я не паломник!', 'Свининой на вертеле', 'Поэт и летний дождь...', 'Июнь маячит впереди', 'Пора расходиться', 'У нее цветы, да мед', 'Луна – бесстыжее создание', 'Нас ждут веселые пирушки', 'В итоге здесь не будет ничего', 'В один невыразимый миг', 'Все не то и не так', 'Вот вы, мужчина, у вас в усах капуста', 'Ах, Близнецы, они всегда любимы...', 'Белеют скверы и тропинки', 'Полосато платье', 'В плену безрадостных ночей...'];
const COMMENTS_IDS = new Array(200).fill('').map((value, id) => id + 1).sort(() => Math.random() - 0.5);
const PUBLICATIONS_IDS = new Array(25).fill('').map((value, id) => id + 1);
const PHOTOS_URLS = [];

function getRandomNumber(min, max) {
  if (min < 0 || max < 0 || min > max) {
    throw new Error('Ошибка выбора диапазона');
  }
  return Math.floor(Math.random() * (max - min + 1) + min);
}
getRandomNumber(100, 100);
function checkStringMaxLength(string, maxLength) {
  return (string.length <= maxLength);
}
checkStringMaxLength('text', 140);

const getRandomArrayElement = (elements) =>
  elements[getRandomNumber(0, elements.length - 1)];

for (let id = 1; id <= PHOTO_COUNT; id++) {
  (id < 25) ? PHOTOS_URLS.push(`photos/${id}.jpg`) : PHOTOS_URLS.push(`photos/${id}.jpg`);
}
const getUniqueArrayElement = (elements) => elements.splice(getRandomNumber(0, elements.length - 1), 1).join('');
const getUniqueArrayValue = (elements) => Number(elements.splice(getRandomNumber(0, elements.length - 1), 1));

const createComment = () => ({
  id: getUniqueArrayValue(COMMENTS_IDS),
  avatar: `img/avatar-${getRandomNumber(1, 6)}.svg`,
  message: getRandomArrayElement(MESSAGES),
  name: getRandomArrayElement(NAMES),
});
const createPublication = () => ({
  id: getUniqueArrayValue(PUBLICATIONS_IDS),
  url: getUniqueArrayElement(PHOTOS_URLS),
  description: getRandomArrayElement(DESCRIPTIONS),
  likes: getRandomNumber(15, 200),
  comments: createComment(),
});

const publicationPhotos = new Array(PHOTO_COUNT).fill('').map(() => createPublication());
publicationPhotos;
