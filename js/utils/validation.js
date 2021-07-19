const COMMENT_MAX_SYMBOLS = 140;
const HASHTAG_MAX_AMOUNT = 5;
const HASHTAG_REG_EXP = /^#[A-Za-zА-Я-а-я0-9]{1,19}$/;

const setInvalidStyle = (element) => {
  element.style = 'border: 3px solid red';
};
const setValidStyle = (element) => {
  element.style = '';
};

const hashTagInputHandler = (evt) => {
  const tagsInput = evt.target;
  const tags = tagsInput.value.split(' ').filter(Boolean);
  const isValid = tags.every((tag) => HASHTAG_REG_EXP.test(tag));
  if(isValid){
    tagsInput.setCustomValidity('');
    setValidStyle(tagsInput);
  } else if (tags.length > HASHTAG_MAX_AMOUNT) {
    tagsInput.setCustomValidity(`Не более ${HASHTAG_MAX_AMOUNT} хэштегов!`);
    setInvalidStyle(tagsInput);
  } else if (!(tags.length === new Set(tags).size)) {
    tagsInput.setCustomValidity('Хэштеги не могут быть одинаковыми!');
    setInvalidStyle(tagsInput);
  } else {
    tagsInput.setCustomValidity('Ошибка ввода');
    setInvalidStyle(tagsInput);
  }
  tagsInput.reportValidity();
};

const descriptionInputHandler = (evt) => {
  const descriptionInput = evt.target;
  if (descriptionInput.value.length > COMMENT_MAX_SYMBOLS) {
    descriptionInput.setCustomValidity(`Максимальное количество символов ${COMMENT_MAX_SYMBOLS}. Удалите ${descriptionInput.value.length - COMMENT_MAX_SYMBOLS} символов.`);
    setInvalidStyle(descriptionInput);
  } else {
    descriptionInput.setCustomValidity('');
    setValidStyle(descriptionInput);
  }
  descriptionInput.reportValidity();
};

export {descriptionInputHandler, hashTagInputHandler};
