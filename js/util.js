const getRandomNumber = (min, max) => {
  if (min < 0 || max < 0 || min > max) {
    throw new Error('Ошибка выбора диапазона');
  }
  return Math.floor(Math.random() * (max - min + 1) + min);
};
const checkStringMaxLength = (string, maxLength) => {
  string.length <= maxLength;
};

const getRandomArrayElement = (elements) =>
  elements[getRandomNumber(0, elements.length - 1)];
const getUniqueArrayElement = (elements) => elements.splice(getRandomNumber(0, elements.length - 1), 1)[0];

const isEscEvent = (evt) => evt.key === 'Escape' || evt.key === 'Esc';

export {getRandomNumber, getRandomArrayElement, getUniqueArrayElement, checkStringMaxLength, isEscEvent};
