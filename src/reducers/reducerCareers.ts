import { AnyAction } from 'redux';
import { FETCH_CAREERS, ActionCareers } from '../actions/actionCareers';

export default (state = {}, action: ActionCareers | AnyAction) => {
  switch (action.type) {
    case FETCH_CAREERS:
      return action.payload.data;
    default:
      return state;
  }
};
