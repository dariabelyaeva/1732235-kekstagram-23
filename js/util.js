function getRandomNumber(min, max) {
  if (min < 0 || max < 0 || min > max) {
    throw new Error('Ошибка выбора диапазона');
  }
  return Math.floor(Math.random() * (max - min + 1) + min);
}
function checkStringMaxLength(string, maxLength) {
  return (string.length <= maxLength);
}
const getRandomArrayElement = (elements) =>
  elements[getRandomNumber(0, elements.length - 1)];
const getUniqueArrayElement = (elements) => elements.splice(getRandomNumber(0, elements.length - 1), 1)[0];

export {getRandomNumber, getRandomArrayElement, getUniqueArrayElement, checkStringMaxLength};
