export const ADD_MASTERY_MORALE = 'add_mastery_morale';
export const REMOVE_MASTERY_MORALE = 'remove_mastery_morale';
export const RESET_MASTERY_MORALES = 'reset_mastery_morales';
export const SET_MASTERY_MORALES = 'set_mastery_morales';

export function addMasteryMorale(
  abilitiesArray: number[],
  abilityId: number,
): {
  type: 'add_mastery_morale';
  payload: {
    abilitiesArray: number[];
    abilityId: number;
  };
} {
  return {
    type: ADD_MASTERY_MORALE,
    payload: {
      abilitiesArray,
      abilityId,
    },
  };
}

export function removeMasteryMorale(
  abilitiesArray: number[],
  abilityId: number,
): {
  type: 'remove_mastery_morale';
  payload: {
    abilitiesArray: number[];
    abilityIndex: number;
  };
} {
  return {
    type: REMOVE_MASTERY_MORALE,
    payload: {
      abilitiesArray,
      abilityIndex: abilitiesArray.indexOf(abilityId),
    },
  };
}

export function resetMasteryMorales(): {
  type: 'reset_mastery_morales';
  payload: never[];
} {
  return {
    type: RESET_MASTERY_MORALES,
    payload: [],
  };
}

export function setMasteryMorales(morales: (number | string)[]): {
  type: 'set_mastery_morales';
  payload: number[];
} {
  // Ensure that values are integers not string (as can happen coming from query string)
  const newArray = morales.map((abilityId) => Number(abilityId));

  return {
    type: SET_MASTERY_MORALES,
    payload: newArray,
  };
}

export type ActionMasteryMorales =
  | ReturnType<typeof addMasteryMorale>
  | ReturnType<typeof removeMasteryMorale>
  | ReturnType<typeof resetMasteryMorales>
  | ReturnType<typeof setMasteryMorales>;
