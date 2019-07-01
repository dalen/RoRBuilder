export const SELECT_MORALE_2 = 'select_morale_2';
export const RESET_SELECTED_MORALE_2 = 'reset_selected_morale_2';

export function selectMorale2(
  abilityId: number | string,
): {
  type: 'select_morale_2';
  payload: number;
} {
  return {
    type: SELECT_MORALE_2,
    payload: Number(abilityId),
  };
}

export function resetSelectedMorale2(): {
  type: 'reset_selected_morale_2';
  payload: false;
} {
  return {
    type: RESET_SELECTED_MORALE_2,
    payload: false,
  };
}

export type ActionMorale2 =
  | ReturnType<typeof selectMorale2>
  | ReturnType<typeof resetSelectedMorale2>;
