function getNumber(min, max) {
  if(min >= max && min >= 0 && max >= 0) {
    max += min;
  }
  if(min >= 0 && max >= 0) {
    return Math.floor(Math.random() * (max - min + 1)) + min;  // Источник: https://html5css.ru/js/js_random.php
  }
  return 'Требуется указать только положительное число.';
}
getNumber(50, 100);
