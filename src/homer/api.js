import axios from 'axios';

import { API_URL } from './constants';

const HTTP = axios.create({
  baseURL: API_URL,
});


const tokenizeContent = content => content.map(line => [...line, line[1].split(' ')]);

const tokenizeData = (data) => {
  return data.chunks.map((chunk) => {
    const newChunk = { ...chunk };
    newChunk.items[0].content = tokenizeContent(chunk.items[0].content);
    newChunk.items[1].content = tokenizeContent(chunk.items[1].content);
    return newChunk;
  });
};

const api = {
  fetchText: (urn, card) => HTTP.get(`${urn}:${card}/`),
  fetchEnglishAlignment: (urn, card) => HTTP.get(`${urn}/alignment/eng/${card}/`).then(r => tokenizeData(r.data)),
};

export default api;
