export const SELECT_MORALE_1 = 'select_morale_1';
export const RESET_SELECTED_MORALE_1 = 'reset_selected_morale_1';

export function selectMorale1(abilityId: number | string) {
  return {
    type: SELECT_MORALE_1,
    payload: Number(abilityId),
  };
}

export function resetSelectedMorale1() {
  return {
    type: RESET_SELECTED_MORALE_1,
    payload: false,
  };
}
