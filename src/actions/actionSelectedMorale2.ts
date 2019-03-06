export const SELECT_MORALE_2 = 'select_morale_2';
export const RESET_SELECTED_MORALE_2 = 'reset_selected_morale_2';

export function selectMorale2(abilityId: number | string) {
  return {
    type: SELECT_MORALE_2,
    payload: Number(abilityId),
  };
}

export function resetSelectedMorale2() {
  return {
    type: RESET_SELECTED_MORALE_2,
    payload: false,
  };
}
