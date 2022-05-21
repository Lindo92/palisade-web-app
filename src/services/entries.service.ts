import axios from 'axios';
const API_URL = 'http://localhost:8000/entries/';

type Filter = {
  filter: unknown;
};

class EntriesService {
  getAllEntriesUser() {
    return axios.get(API_URL + 'find', { withCredentials: true });
  }

  getEntriesRawUser(filter: Filter) {
    return axios.post(API_URL + 'find-raw', filter, { withCredentials: true });
  }

  getOneEntryByIdUser(id: string) {
    const params = new URLSearchParams([['id', id]]);
    return axios.get(API_URL + 'find-one', { params, withCredentials: true })
  }

  getOneEntryRawUser(filter: Filter) {
    return axios.post(API_URL + 'find-one-raw', filter, { withCredentials: true })
  }

  updateEntryUser(id: string, updateEntryDto: any) {
    const params = new URLSearchParams([['id', id]]);
    return axios.patch(API_URL + 'update-your-entry', updateEntryDto, { params, withCredentials: true })
  }

  updateEntryDeveloper(id: string, updateEntryDto: any) {
    const params = new URLSearchParams([['id', id]]);
    return axios.patch(API_URL + 'update', updateEntryDto, { params, withCredentials: true })
  }

  deleteEntryAdmin(id: string) {
    return axios.delete(API_URL + 'delete', { withCredentials: true })
  }

  deleteOwnEntryUser(id: string) {
    const params = new URLSearchParams([['id', id]]);
    return axios.delete(API_URL + 'delete-your-account', { params, withCredentials: true })
  }

}
export default new EntriesService();