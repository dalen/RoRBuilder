export const SELECT_MORALE_3 = 'select_morale_3';
export const RESET_SELECTED_MORALE_3 = 'reset_selected_morale_3';

export function selectMorale3(
  abilityId: number | string,
): {
  type: 'select_morale_3';
  payload: number;
} {
  return {
    type: SELECT_MORALE_3,
    payload: Number(abilityId),
  };
}

export function resetSelectedMorale3(): {
  type: 'reset_selected_morale_3';
  payload: false;
} {
  return {
    type: RESET_SELECTED_MORALE_3,
    payload: false,
  };
}

export type ActionMorale3 =
  | ReturnType<typeof selectMorale3>
  | ReturnType<typeof resetSelectedMorale3>;
