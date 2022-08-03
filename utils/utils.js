const ERROR_CODE = {
  status: 400,
  message: 'Переданы некорректные данные',
};

const ERROR_NOT_FOUND = {
  status: 404,
  message: 'Карточка, страница или пользователь не найден',
};

const ERROR_DEFAULT = {
  status: 500,
  message: 'Ошибка по-умолчанию',
};

const SUCCESS_STATUS = {
  status: 201,
};

module.exports = {
  ERROR_CODE,
  ERROR_NOT_FOUND,
  ERROR_DEFAULT,
  SUCCESS_STATUS,
};
