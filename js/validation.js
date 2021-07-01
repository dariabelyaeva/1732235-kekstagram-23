const COMMENT_MAX_SYMBOLS = 140;
const HASHTAG_MAX_AMOUNT = 5;
const HASHTAG_REG_EXP = /^#[A-Za-zА-Я-а-я0-9]{1,19}$/;
const descriptionInput = document.querySelector('.text__description');

const hashTagInputHandler = (evt) => {
  const tagsInput = evt.target;
  const tags = tagsInput.value.split(' ');
  const isValid = tags.every((tag) => HASHTAG_REG_EXP.test(tag));
  if(!isValid){
    tagsInput.setCustomValidity('Ошибка ввода');
  } else if (tags.length > HASHTAG_MAX_AMOUNT) {
    tagsInput.setCustomValidity(`Не более ${HASHTAG_MAX_AMOUNT} хэштегов!`);
  } else if (!(tags.length === new Set(tags).size)) {
    tagsInput.setCustomValidity('Хэштеги не могут быть одинаковыми!');
  } else {
    tagsInput.setCustomValidity('');
  }
  tagsInput.reportValidity();
};
const descriptionInputHandler = () => {
  const descriptionLength = descriptionInput.value.length;

  if (descriptionLength > COMMENT_MAX_SYMBOLS) {
    descriptionInput.setCustomValidity(`Максимальное количество символов ${COMMENT_MAX_SYMBOLS}. Удалите ${descriptionLength - COMMENT_MAX_SYMBOLS} символов.`);
  } else {
    descriptionInput.setCustomValidity('');
  }
  descriptionInput.reportValidity();
};

export {hashTagInputHandler, descriptionInputHandler};
