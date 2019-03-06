export const ADD_MASTERY_MORALE = 'add_mastery_morale';
export const REMOVE_MASTERY_MORALE = 'remove_mastery_morale';
export const RESET_MASTERY_MORALES = 'reset_mastery_morales';
export const SET_MASTERY_MORALES = 'set_mastery_morales';

export function addMasteryMorale(abilitiesArray: number[], abilityId: number) {
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
) {
  return {
    type: REMOVE_MASTERY_MORALE,
    payload: {
      abilitiesArray,
      abilityIndex: abilitiesArray.indexOf(abilityId),
    },
  };
}

export function resetMasteryMorales() {
  return {
    type: RESET_MASTERY_MORALES,
    payload: [],
  };
}

export function setMasteryMorales(morales: (number | string)[]) {
  // Ensure that values are integers not string (as can happen coming from query string)
  const newArray = morales.map(abilityId => Number(abilityId));

  return {
    type: SET_MASTERY_MORALES,
    payload: newArray,
  };
}
