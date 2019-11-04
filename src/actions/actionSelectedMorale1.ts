export const SELECT_MORALE_1 = 'select_morale_1';
export const RESET_SELECTED_MORALE_1 = 'reset_selected_morale_1';

export function selectMorale1(abilityId: number | string) {
  return {
    type: SELECT_MORALE_1,
    payload: Number(abilityId),
  } as const;
}

export function resetSelectedMorale1() {
  return {
    type: RESET_SELECTED_MORALE_1,
    payload: false,
  } as const;
}

export type ActionMorale1 =
  | ReturnType<typeof selectMorale1>
  | ReturnType<typeof resetSelectedMorale1>;
