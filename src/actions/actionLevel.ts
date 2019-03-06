export const SET_LEVEL = 'set_level';
export const RESET_LEVEL = 'reset_level';

export function setLevel(level: number) {
  return {
    type: SET_LEVEL,
    payload: Number(level),
  };
}

export function resetLevel() {
  return {
    type: RESET_LEVEL,
  };
}
