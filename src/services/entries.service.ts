import axios from 'axios';
const API_URL = 'http://localhost:8000/entries/';

type Filter = {
  filter: unknown;
};

class EntriesService {
  async postEntryUser(entry: any) {
    return axios.post(API_URL + 'create', entry, { withCredentials: true });
  }
  async getAllEntriesUser() {
    return axios.get(API_URL + 'find', { withCredentials: true });
  }

  async getEntriesRawUser(filter: Filter) {
    return axios.post(API_URL + 'find-raw', filter, { withCredentials: true });
  }

  async getEntriesTitleUser(value: string) {
    return axios.post(API_URL + 'find-title', { value }, { withCredentials: true })
  }


  async getOneEntryByIdUser(id: string) {
    const params = new URLSearchParams([['id', id]]);
    return axios.get(API_URL + 'find-one', { params, withCredentials: true })
  }

  async getOneEntryRawUser(filter: Filter) {
    return axios.post(API_URL + 'find-one-raw', filter, { withCredentials: true })
  }

  async updateEntryUser(id: string, updateEntryDto: any) {
    const params = new URLSearchParams([['id', id]]);
    return axios.patch(API_URL + 'update-your-entry', updateEntryDto, { params, withCredentials: true })
  }

  async updateEntryDeveloper(id: string, updateEntryDto: any) {
    const params = new URLSearchParams([['id', id]]);
    return axios.patch(API_URL + 'update', updateEntryDto, { params, withCredentials: true })
  }

  async deleteEntryAdmin(id: string) {
    const params = new URLSearchParams([['id', id]]);
    return axios.delete(API_URL + 'delete', { params, withCredentials: true })
  }

  deleteOwnEntryUser(id: string) {
    const params = new URLSearchParams([['id', id]]);
    return axios.delete(API_URL + 'delete-your-account', { params, withCredentials: true })
  }

}
export default new EntriesService();