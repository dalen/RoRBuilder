export const SET_RENOWN = 'set_renown';
export const RESET_RENOWN = 'reset_renown';

export function setRenown(
  renown: number,
): {
  type: 'set_renown';
  payload: number;
} {
  return {
    type: SET_RENOWN,
    payload: Number(renown),
  };
}

export function resetRenown(): {
  type: 'reset_renown';
} {
  return {
    type: RESET_RENOWN,
  };
}

export type ActionRenown =
  | ReturnType<typeof setRenown>
  | ReturnType<typeof resetRenown>;
