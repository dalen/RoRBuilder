export const SET_LEVEL = 'set_level';
export const RESET_LEVEL = 'reset_level';

export function setLevel(level: number) {
  return {
    type: SET_LEVEL,
    payload: Number(level),
  } as const;
}

export function resetLevel() {
  return {
    type: RESET_LEVEL,
  } as const;
}

export type ActionSetLevel = ReturnType<typeof setLevel>;

export type ActionResetLevel = ReturnType<typeof resetLevel>;

export type ActionLevel = ActionSetLevel | ActionResetLevel;
