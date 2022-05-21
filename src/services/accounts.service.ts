import axios from 'axios';
const API_URL = 'http://localhost:8000/accounts/';

type Filter = {
  filter: unknown;
};

class AccountsService {
  getAllAccountsAdmin() {
    return axios.get(API_URL + 'find', { withCredentials: true });
  }

  getAccountsRawAdmin(filter: Filter) {
    return axios.post(API_URL + 'find-raw', filter, { withCredentials: true });
  }

  getOneAccountByIdAdmin(id: string) {
    const params = new URLSearchParams([['id', id]]);
    return axios.get(API_URL + 'find-one', { params, withCredentials: true })
  }

  getOneAccountRawAdmin(filter: Filter) {
    return axios.post(API_URL + 'find-one-raw', filter, { withCredentials: true })
  }

  updateAccountUser(id: string, updateAccountDto: any) {
    return axios.patch(API_URL + 'update-your-account', updateAccountDto, { withCredentials: true })
  }

  deleteAccountAdmin(id: string) {
    return axios.delete(API_URL + 'delete', { withCredentials: true })
  }

  deleteOwnAccountUser(id: string) {
    return axios.delete(API_URL + 'delete-your-account', { withCredentials: true })
  }

}
export default new AccountsService();