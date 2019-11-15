import jwt from "jsonwebtoken";
import moment from "moment";

const TOKEN_KEY = "auth_token";
class AuthService {
  getToken() {
    return localStorage.getItem(TOKEN_KEY);
  }
  decode(token) {
    return jwt.decode(token);
  }

  getExipration(token) {
    return moment.unix(this.decode(token).exp);
  }

  isValid(token) {
    return moment().isBefore(this.getExipration(token));
  }

  isAuthenticated() {
    const token = this.getToken();
    return token && this.isValid(token);
  }

  invalidateUser() {
    localStorage.removeItem(TOKEN_KEY);
  }

  saveToken(token) {
    localStorage.setItem(TOKEN_KEY, token);
  }
}

export default new AuthService();
