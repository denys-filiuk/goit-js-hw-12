import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';

export const params = {
  key: '49327646-fcd0425046884d30268cb7003',
  image_type: 'photo',
  orientation: 'horizontal',
  safesearch: true,
};

export function fetchSearchResult(query) {
  return axios
    .get('/', {
      params: { ...params, q: query },
    })
    .then(resp => {
      const hits = resp.data.hits;
      return hits;
    })
    .catch(error => {
      console.error(error);
      return [];
    });
}
