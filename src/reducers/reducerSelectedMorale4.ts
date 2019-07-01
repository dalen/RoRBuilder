import { AnyAction } from 'redux';
import {
  SELECT_MORALE_4,
  RESET_SELECTED_MORALE_4,
  ActionMorale4,
} from '../actions/actionSelectedMorale4';

export default function(state = false, action: ActionMorale4 | AnyAction) {
  switch (action.type) {
    case SELECT_MORALE_4:
      return action.payload;
    case RESET_SELECTED_MORALE_4:
      return action.payload;
    default:
      return state;
  }
}
