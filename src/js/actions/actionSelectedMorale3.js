export const SELECT_MORALE_3 = 'select_morale_3';
export const RESET_SELECTED_MORALE_3 = 'reset_selected_morale_3';

export function selectMorale3(abilityId) {
  return {
    type: SELECT_MORALE_3,
    payload: abilityId,
  };
}

export function resetSelectedMorale3() {
  return {
    type: RESET_SELECTED_MORALE_3,
    payload: false,
  };
}
