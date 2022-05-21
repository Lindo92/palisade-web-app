import axios from "axios";



const API_URL = "http://localhost:8000/authentication/";

class AuthService {
  login(username: string, password: string) {

    return axios
      .post(API_URL + "login", {
        username,
        password
      }, { withCredentials: true, auth: { username, password } })
      .then(response => {
        return response.data;
      });
  }
  logout() {
    axios.post(API_URL + "logout", {}, { withCredentials: true })
  }
  register(username: string, email: string, password: string, firstname: string, lastname: string,) {
    return axios.post(API_URL + "createAccount", {
      username,
      email,
      password,
      firstname,
      lastname,
      roles: ['user', 'developer', 'admin'],
    });
  }
  async getCurrentUser() {
    try {
      const response = axios.get(API_URL + "authenticate", { withCredentials: true });
      return (await response).data;
    } catch (error) {
      console.log(error);
    }

  }
}
export default new AuthService();