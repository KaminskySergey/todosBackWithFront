export const setAuthTokenAndContext = (
  token: string,
  setToken: React.Dispatch<React.SetStateAction<string>>
) => {
  localStorage.setItem('token', token);

  setToken(token);
};

export const removeAuthTokenAndContext = (
  setToken: React.Dispatch<React.SetStateAction<string>>
) => {
  localStorage.removeItem('token');

  setToken('');
};

export const getAuthTokenFromLocalStorage = () => localStorage.getItem('token');
