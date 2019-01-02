export const ADD_MASTERY_ABILITY = 'add_mastery_ability';
export const REMOVE_MASTERY_ABILITY = 'remove_mastery_ability';
export const RESET_MASTERY_ABILITIES = 'reset_mastery_abilities';
export const SET_MASTERY_ABILITIES = 'set_mastery_abilities';

export function addMasteryAbility(abilitiesArray, abilityId) {
  return {
    type: ADD_MASTERY_ABILITY,
    payload: {
      abilitiesArray,
      abilityId,
    },
  };
}

export function removeMasteryAbility(abilitiesArray, abilityId) {
  return {
    type: REMOVE_MASTERY_ABILITY,
    payload: {
      abilitiesArray,
      abilityIndex: abilitiesArray.indexOf(abilityId),
    },
  };
}

export function resetMasteryAbilities() {
  return {
    type: RESET_MASTERY_ABILITIES,
    payload: [],
  };
}

export function setMasteryAbilities(abilities) {
  // Ensure that values are integers not string (as can happen coming from query string)
  const newArray = [];
  abilities.forEach(abilityId => {
    newArray.push(Number(abilityId));
  });

  return {
    type: SET_MASTERY_ABILITIES,
    payload: newArray,
  };
}
