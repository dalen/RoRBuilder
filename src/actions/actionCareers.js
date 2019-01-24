import axios from 'axios';

export const FETCH_CAREERS = 'fetch_careers';

const JSON_ROOT = '/json/';

export function fetchCareers() {
  const request = axios.get(`${JSON_ROOT}careers.json`);

  return {
    type: FETCH_CAREERS,
    payload: request,
  };
}
