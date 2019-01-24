import {
  SELECT_MORALE_4,
  RESET_SELECTED_MORALE_4,
} from '../actions/actionSelectedMorale4';

export default function(state = false, action) {
  switch (action.type) {
    case SELECT_MORALE_4:
      return action.payload;
    case RESET_SELECTED_MORALE_4:
      return action.payload;
    default:
      return state;
  }
}
