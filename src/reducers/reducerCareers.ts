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
  action: ActionCareers,
): { [key: string]: CareerSummary } => {
  switch (action.type) {
    case FETCH_CAREERS:
      return action.payload;
    default:
      return state;
  }
};
