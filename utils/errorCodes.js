const ERROR_CODE = {
  status: 400,
  message: 'Переданы некорректные данные',
};

const ERROR_NOT_FOUND = {
  status: 404,
  message: 'Карточка или пользователь не найден',
};

const ERROR_DEFAULT = {
  status: 500,
  message: 'Ошибка по-умолчанию',
};

module.exports = {
  ERROR_CODE,
  ERROR_NOT_FOUND,
  ERROR_DEFAULT,
};
