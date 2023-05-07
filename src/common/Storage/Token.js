const jwtDecode = require('jwt-decode');

// La clase token contiene los metodos de decodificación y codificación del token 
class _Token {
  //decodificación del token

  decode = (token) => jwtDecode(token || this.getToken());

  // confirmar la existencia del token

  isTokenValid = () => {
    try {
      return jwtDecode(this.getToken()) !== undefined;
    } catch (e) {
      return false;
    }
  };
  //obtener el token del local storage

  getToken() {
    return localStorage.getItem('token') || sessionStorage.getItem('token');
  }

  // guardar el token en local storage

  setToken(type, token) {
    if (type == 'local')
      return localStorage.setItem('token', token);
    return sessionStorage.setItem('token', token);
  }
}

export const Token = new _Token()