import {
  SELECT_MORALE_2,
  RESET_SELECTED_MORALE_2,
} from '../actions/actionSelectedMorale2';

export default function(state = false, action) {
  switch (action.type) {
    case SELECT_MORALE_2:
      return action.payload;
    case RESET_SELECTED_MORALE_2:
      return action.payload;
    default:
      return state;
  }
}
