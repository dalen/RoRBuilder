export const ADD_MASTERY_TACTIC = 'add_mastery_tactic';
export const REMOVE_MASTERY_TACTIC = 'remove_mastery_tactic';
export const RESET_MASTERY_TACTICS = 'reset_mastery_tactics';
export const SET_MASTERY_TACTICS = 'set_mastery_tactics';

export function addMasteryTactic(
  abilitiesArray: number[],
  abilityId: number,
): {
  type: 'add_mastery_tactic';
  payload: {
    abilitiesArray: number[];
    abilityId: number;
  };
} {
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
): {
  type: 'remove_mastery_tactic';
  payload: {
    abilitiesArray: number[];
    abilityIndex: number;
  };
} {
  return {
    type: REMOVE_MASTERY_TACTIC,
    payload: {
      abilitiesArray,
      abilityIndex: abilitiesArray.indexOf(abilityId),
    },
  };
}

export function resetMasteryTactics(): {
  type: 'reset_mastery_tactics';
  payload: never[];
} {
  return {
    type: RESET_MASTERY_TACTICS,
    payload: [],
  };
}

export function setMasteryTactics(tactics: number[]): {
  type: 'set_mastery_tactics';
  payload: number[];
} {
  return {
    type: SET_MASTERY_TACTICS,
    payload: tactics,
  };
}

export type ActionMasteryTactics =
  | ReturnType<typeof addMasteryTactic>
  | ReturnType<typeof removeMasteryTactic>
  | ReturnType<typeof resetMasteryTactics>
  | ReturnType<typeof setMasteryTactics>;
