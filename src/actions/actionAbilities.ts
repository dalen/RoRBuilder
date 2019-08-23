import { Action } from 'redux';
import axios, { AxiosPromise } from 'axios';

import { Career } from '../helpers/abilities';

export const FETCH_ABILITIES = 'fetch_abilities';
export const RESET_ABILITIES = 'reset_abilities';

export interface FetchAbilitiesAction extends Action<typeof FETCH_ABILITIES> {
  type: typeof FETCH_ABILITIES;
  payload: AxiosPromise<Career>;
}

export interface ResetAbilitiesAction extends Action<typeof RESET_ABILITIES> {
  type: typeof RESET_ABILITIES;
  payload: never[];
}

export type AbilitiesAction = FetchAbilitiesAction | ResetAbilitiesAction;

const JSON_ROOT = '/json/';

export function fetchAbilities(slug: string): FetchAbilitiesAction {
  const request = axios.get(`${JSON_ROOT}/abilities/${slug}.json`);

  return {
    type: FETCH_ABILITIES,
    payload: request,
  };
}

export function resetAbilities(): ResetAbilitiesAction {
  return {
    type: RESET_ABILITIES,
    payload: [],
  };
}
