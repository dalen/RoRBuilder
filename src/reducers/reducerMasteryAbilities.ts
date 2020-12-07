import {
  ADD_MASTERY_ABILITY,
  REMOVE_MASTERY_ABILITY,
  RESET_MASTERY_ABILITIES,
  SET_MASTERY_ABILITIES,
  ActionMasteryAbility,
} from '../actions/actionMasteryAbilities';

export default (
  state: readonly number[] = [],
  action: ActionMasteryAbility,
) => {
  switch (action.type) {
    case ADD_MASTERY_ABILITY:
      return [...action.payload.abilitiesArray, action.payload.abilityId];
    case REMOVE_MASTERY_ABILITY:
      return [
        ...action.payload.abilitiesArray.slice(0, action.payload.abilityIndex),
        ...action.payload.abilitiesArray.slice(action.payload.abilityIndex + 1),
      ];
    case RESET_MASTERY_ABILITIES:
      return action.payload;
    case SET_MASTERY_ABILITIES:
      return action.payload;
    default:
      return state;
  }
};
