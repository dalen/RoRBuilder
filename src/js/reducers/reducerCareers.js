import { FETCH_CAREERS } from '../actions/actionCareers';

export default function(state = {}, action) {
  switch (action.type) {
    case FETCH_CAREERS:
      return action.payload.data;
    default:
      return state;
  }
}
