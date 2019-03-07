export const ADD_MASTERY_TACTIC = 'add_mastery_tactic';
export const REMOVE_MASTERY_TACTIC = 'remove_mastery_tactic';
export const RESET_MASTERY_TACTICS = 'reset_mastery_tactics';
export const SET_MASTERY_TACTICS = 'set_mastery_tactics';

export function addMasteryTactic(abilitiesArray: number[], abilityId: number) {
  return {
    type: ADD_MASTERY_TACTIC,
    payload: {
      abilitiesArray,
      abilityId,
    },
  };
}

export function removeMasteryTactic(
  abilitiesArray: number[],
  abilityId: number,
) {
  return {
    type: REMOVE_MASTERY_TACTIC,
    payload: {
      abilitiesArray,
      abilityIndex: abilitiesArray.indexOf(abilityId),
    },
  };
}

export function resetMasteryTactics() {
  return {
    type: RESET_MASTERY_TACTICS,
    payload: [],
  };
}

export function setMasteryTactics(tactics: (string | number)[]) {
  // Ensure that values are integers not string (as can happen coming from query string)
  const newArray = tactics.map(abilityId => Number(abilityId));

  return {
    type: SET_MASTERY_TACTICS,
    payload: newArray,
  };
}
