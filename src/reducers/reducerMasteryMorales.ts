import {
  ADD_MASTERY_MORALE,
  REMOVE_MASTERY_MORALE,
  RESET_MASTERY_MORALES,
  SET_MASTERY_MORALES,
  ActionMasteryMorales,
} from '../actions/actionMasteryMorales';

export default (
  state: readonly number[] = [],
  action: ActionMasteryMorales,
) => {
  switch (action.type) {
    case ADD_MASTERY_MORALE:
      return [...action.payload.abilitiesArray, action.payload.abilityId];
    case REMOVE_MASTERY_MORALE:
      return [
        ...action.payload.abilitiesArray.slice(0, action.payload.abilityIndex),
        ...action.payload.abilitiesArray.slice(action.payload.abilityIndex + 1),
      ];
    case RESET_MASTERY_MORALES:
      return action.payload;
    case SET_MASTERY_MORALES:
      return action.payload;
    default:
      return state;
  }
};
