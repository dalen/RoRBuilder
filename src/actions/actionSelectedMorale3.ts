export const SELECT_MORALE_3 = 'select_morale_3';
export const RESET_SELECTED_MORALE_3 = 'reset_selected_morale_3';

export function selectMorale3(abilityId: number | string) {
  return {
    type: SELECT_MORALE_3,
    payload: Number(abilityId),
  } as const;
}

export function resetSelectedMorale3() {
  return {
    type: RESET_SELECTED_MORALE_3,
    payload: false,
  } as const;
}

export type ActionMorale3 =
  | ReturnType<typeof selectMorale3>
  | ReturnType<typeof resetSelectedMorale3>;
