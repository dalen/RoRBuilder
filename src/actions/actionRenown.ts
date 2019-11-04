export const SET_RENOWN = 'set_renown';
export const RESET_RENOWN = 'reset_renown';

export function setRenown(renown: number) {
  return {
    type: SET_RENOWN,
    payload: Number(renown),
  } as const;
}

export function resetRenown() {
  return {
    type: RESET_RENOWN,
  } as const;
}

export type ActionRenown =
  | ReturnType<typeof setRenown>
  | ReturnType<typeof resetRenown>;
