import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';

export const params = {
  key: '49327646-fcd0425046884d30268cb7003',
  image_type: 'photo',
  orientation: 'horizontal',
  safesearch: true,
  per_page: 15,
};

export async function fetchSearchResult(query, page = 1) {
  try {
    const response = await axios.get('/', {
      params: { ...params, q: query, page },
    });

    return {
      images: response.data.hits,
      totalResults: response.data.totalHits,
    };
  } catch (error) {
    console.error(error);
    return { images: [], totalResults: 0 };
  }
}
