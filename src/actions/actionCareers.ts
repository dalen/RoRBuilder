import axios, { AxiosResponse } from 'axios';

export const FETCH_CAREERS = 'fetch_careers';
export type ActionCareersAction = {
  type: 'fetch_careers';
  payload: Promise<AxiosResponse<any>>;
};

// After passed through middleware
export type ActionCareers = {
  type: 'fetch_careers';
  payload: AxiosResponse<any>;
};

const JSON_ROOT = '/json/';

export function fetchCareers(): ActionCareersAction {
  const request = axios.get(`${JSON_ROOT}careers.json`);

  return {
    type: FETCH_CAREERS,
    payload: request,
  };
}
