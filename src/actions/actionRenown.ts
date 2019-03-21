export const SET_RENOWN = 'set_renown';
export const RESET_RENOWN = 'reset_renown';

export function setRenown(renown: number) {
  return {
    type: SET_RENOWN,
    payload: Number(renown),
  };
}

export function resetRenown() {
  return {
    type: RESET_RENOWN,
  };
}
