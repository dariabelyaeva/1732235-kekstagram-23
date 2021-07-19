const getImages = (onSuccess, onError) => {
  fetch('https://23.javascript.pages.academy/kekstagram/data')
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error('Ошибка загрузки');
    })
    .then((publications) => {
      onSuccess(publications);
    })
    .catch((error) => {
      onError(error.message);
    });
};

const sendImages = (onSuccess, onError, body) => {
  fetch(
    'https://23.javascript.pages.academy/kekstagram',
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        throw new Error('Не удалось отправить форму. Попробуйте ещё раз');
      }
    })
    .catch((error) => {
      onError(error.message);
    });
};

export {getImages, sendImages};
