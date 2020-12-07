import {
  ADD_MASTERY_TACTIC,
  REMOVE_MASTERY_TACTIC,
  RESET_MASTERY_TACTICS,
  SET_MASTERY_TACTICS,
  ActionMasteryTactics,
} from '../actions/actionMasteryTactics';

export default (
  state: readonly number[] = [],
  action: ActionMasteryTactics,
) => {
  switch (action.type) {
    case ADD_MASTERY_TACTIC:
      return [...action.payload.abilitiesArray, action.payload.abilityId];
    case REMOVE_MASTERY_TACTIC:
      return [
        ...action.payload.abilitiesArray.slice(0, action.payload.abilityIndex),
        ...action.payload.abilitiesArray.slice(action.payload.abilityIndex + 1),
      ];
    case RESET_MASTERY_TACTICS:
      return action.payload;
    case SET_MASTERY_TACTICS:
      return action.payload;
    default:
      return state;
  }
};
