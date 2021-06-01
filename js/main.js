function getRandomNumber(min, max) {
  if (min < 0 || max < 0 || min > max) {
    throw new Error('Ошибка выбора диапазона');
  }
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
getRandomNumber(100, 100);

function checkStringLength(string, maxLength) {
  return (string.length <= maxLength);
}
checkStringLength('text', 140);
