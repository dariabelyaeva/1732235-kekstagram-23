function getRandomNumber(min, max) {
  if (min < 0 || max < 0 || min >= max) {
    return null;
  }
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
getRandomNumber(100, 100);

function checkStringLength(inputString, maxLength) {
  return (inputString <= maxLength);
}
checkStringLength(120, 140);
