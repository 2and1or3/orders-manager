const ERROR_CODES = {
  EMAIL_NOT_FOUND: 'Пользователь с таким email не найден',
  INVALID_PASSWORD: 'Пароль неверен',
  auth: 'Войдите в систему',
};

export function error(code) {
  return ERROR_CODES[code] || code;
}
