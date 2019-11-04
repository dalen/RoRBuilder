export const ADD_MASTERY_ABILITY = 'add_mastery_ability';
export const REMOVE_MASTERY_ABILITY = 'remove_mastery_ability';
export const RESET_MASTERY_ABILITIES = 'reset_mastery_abilities';
export const SET_MASTERY_ABILITIES = 'set_mastery_abilities';

export function addMasteryAbility(abilitiesArray: number[], abilityId: number) {
  return {
    type: ADD_MASTERY_ABILITY,
    payload: {
      abilitiesArray,
      abilityId,
    },
  } as const;
}

export function removeMasteryAbility(
  abilitiesArray: number[],
  abilityId: number,
) {
  return {
    type: REMOVE_MASTERY_ABILITY,
    payload: {
      abilitiesArray,
      abilityIndex: abilitiesArray.indexOf(abilityId),
    },
  } as const;
}

export function resetMasteryAbilities() {
  return {
    type: RESET_MASTERY_ABILITIES,
    payload: [],
  } as const;
}

export function setMasteryAbilities(abilities: number[]) {
  return {
    type: SET_MASTERY_ABILITIES,
    payload: abilities,
  } as const;
}

export type ActionMasteryAbility =
  | ActionAddMasteryAbility
  | ActionRemoveMasteryAbility
  | ActionResetMasteryAbilities
  | ActionSetMasteryAbilities;

export type ActionAddMasteryAbility = ReturnType<typeof addMasteryAbility>;

export type ActionRemoveMasteryAbility = ReturnType<
  typeof removeMasteryAbility
>;

export type ActionResetMasteryAbilities = ReturnType<
  typeof resetMasteryAbilities
>;

export type ActionSetMasteryAbilities = ReturnType<typeof setMasteryAbilities>;
