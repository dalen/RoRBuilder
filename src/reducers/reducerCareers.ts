import { FETCH_CAREERS, ActionCareers } from '../actions/actionCareers';

export default function(state = {}, action: ActionCareers) {
  switch (action.type) {
    case FETCH_CAREERS:
      return action.payload.data;
    default:
      return state;
  }
}
