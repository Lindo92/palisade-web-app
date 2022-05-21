import axios from 'axios';
const API_URL = 'http://localhost:8000/accounts/';

type Filter = {
  filter: unknown;
};

class AccountsService {
  async getAllAccountsAdmin() {
    return (await axios.get(API_URL + 'find', { withCredentials: true })).data;
  }

  async getAccountsRawAdmin(filter: Filter) {
    return (await axios.post(API_URL + 'find-raw', filter, { withCredentials: true })).data;

  }

  async getOneAccountByIdAdmin(id: string) {
    const params = new URLSearchParams([['id', id]]);
    return (await axios.get(API_URL + 'find-one', { params, withCredentials: true })).data;

  }

  async getOneAccountRawAdmin(filter: Filter) {
    return (await (axios.post(API_URL + 'find-one-raw', filter, { withCredentials: true }))).data;
  }

  async updateAccountUser(id: string, updateAccountDto: any) {
    return (await (axios.patch(API_URL + 'update-your-account', updateAccountDto, { withCredentials: true }))).data;
  }

  async deleteAccountAdmin(id: string) {
    return (await (axios.delete(API_URL + 'delete', { withCredentials: true }))).data;
  }

  async deleteOwnAccountUser(id: string) {
    return (await (axios.delete(API_URL + 'delete-your-account', { withCredentials: true }))).data;
  }

}
export default new AccountsService();