import {
  SELECT_MORALE_3,
  RESET_SELECTED_MORALE_3,
  ActionMorale3,
} from '../actions/actionSelectedMorale3';

export default (state: number | boolean = false, action: ActionMorale3) => {
  switch (action.type) {
    case SELECT_MORALE_3:
      return action.payload;
    case RESET_SELECTED_MORALE_3:
      return action.payload;
    default:
      return state;
  }
};
