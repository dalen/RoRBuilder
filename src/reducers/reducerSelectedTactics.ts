import {
  SELECT_TACTIC,
  DESELECT_TACTIC,
  RESET_SELECTED_TACTICS,
  SET_SELECTED_TACTICS,
  ActionSelectedTactics,
} from '../actions/actionSelectedTactics';

export default (
  state: readonly number[] = [],
  action: ActionSelectedTactics,
) => {
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
};
