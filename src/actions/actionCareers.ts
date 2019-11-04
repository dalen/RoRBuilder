import careers from '../data/careers.json';

export const FETCH_CAREERS = 'fetch_careers';

export function fetchCareers() {
  return {
    type: FETCH_CAREERS,
    payload: careers,
  } as const;
}

export type ActionCareers = ReturnType<typeof fetchCareers>;
