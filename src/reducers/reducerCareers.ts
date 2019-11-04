import { AnyAction } from 'redux';
import { FETCH_CAREERS, ActionCareers } from '../actions/actionCareers';

export type CareerSummary = {
  name: string;
  slug: string;
  faction: string;
  race: string;
  class: string;
  updated: string;
};

export default (
  state = {},
  action: ActionCareers | AnyAction,
): { [key: string]: CareerSummary } => {
  switch (action.type) {
    case FETCH_CAREERS:
      return action.payload.data;
    default:
      return state;
  }
};
