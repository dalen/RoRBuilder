export const SELECT_MORALE_4 = 'select_morale_4';
export const RESET_SELECTED_MORALE_4 = 'reset_selected_morale_4';

export function selectMorale4(
  abilityId: number | string,
): {
  type: 'select_morale_4';
  payload: number;
} {
  return {
    type: SELECT_MORALE_4,
    payload: Number(abilityId),
  };
}

export function resetSelectedMorale4(): {
  type: 'reset_selected_morale_4';
  payload: false;
} {
  return {
    type: RESET_SELECTED_MORALE_4,
    payload: false,
  };
}

export type ActionMorale4 =
  | ReturnType<typeof selectMorale4>
  | ReturnType<typeof resetSelectedMorale4>;
