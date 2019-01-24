import {
  SELECT_MORALE_3,
  RESET_SELECTED_MORALE_3,
} from '../actions/actionSelectedMorale3';

export default function(state = false, action) {
  switch (action.type) {
    case SELECT_MORALE_3:
      return action.payload;
    case RESET_SELECTED_MORALE_3:
      return action.payload;
    default:
      return state;
  }
}
