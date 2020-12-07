import {
  SELECT_MORALE_1,
  RESET_SELECTED_MORALE_1,
  ActionMorale1,
} from '../actions/actionSelectedMorale1';

export default (state: number | boolean = false, action: ActionMorale1) => {
  switch (action.type) {
    case SELECT_MORALE_1:
      return action.payload;
    case RESET_SELECTED_MORALE_1:
      return action.payload;
    default:
      return state;
  }
};
