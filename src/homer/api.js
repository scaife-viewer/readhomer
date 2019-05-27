import axios from 'axios';

import { API_URL } from './constants';

const HTTP = axios.create({
  baseURL: API_URL,
});

const api = {
  fetchText: (urn, card) => HTTP.get(`${urn}:${card}/`),
  fetchEnglishAlignment: (urn, card) => HTTP.get(`${urn}/alignment/eng/${card}/`),
};

export default api;
