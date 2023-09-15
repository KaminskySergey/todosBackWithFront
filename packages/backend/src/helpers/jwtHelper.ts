const jwt = require('jsonwebtoken');

export function getEmailFromToken(activateToken: string): string | null {
  try {
    // Пытаемся верифицировать токен с помощью секретного ключа
    const decodedToken = jwt.verify(activateToken, process.env.JWT_SECRET);

    // Извлекаем email из декодированного токена (предположим, что email хранится в поле "email")
    const { email } = decodedToken;

    return email;
  } catch (error) {
    // Если произошла ошибка при верификации токена или email не найден, возвращаем null
    return null;
  }
}
