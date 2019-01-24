import {
  SELECT_TACTIC,
  DESELECT_TACTIC,
  RESET_SELECTED_TACTICS,
  SET_SELECTED_TACTICS,
} from '../actions/actionSelectedTactics';

export default function(state = [], action) {
  switch (action.type) {
    case SELECT_TACTIC:
      return [...action.payload.tacticsArray, action.payload.tacticId];
    case DESELECT_TACTIC:
      return [
        ...action.payload.tacticsArray.slice(0, action.payload.tacticIndex),
        ...action.payload.tacticsArray.slice(action.payload.tacticIndex + 1),
      ];
    case RESET_SELECTED_TACTICS:
      return action.payload;
    case SET_SELECTED_TACTICS:
      return action.payload;
    default:
      return state;
  }
}
