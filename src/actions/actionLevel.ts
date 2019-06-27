export const SET_LEVEL = 'set_level';
export const RESET_LEVEL = 'reset_level';

export type ActionSetLevel = {
  type: 'set_level';
  payload: number;
};

export type ActionResetLevel = {
  type: 'reset_level';
};

export type ActionLevel = ActionSetLevel | ActionResetLevel;

export function setLevel(level: number): ActionSetLevel {
  return {
    type: SET_LEVEL,
    payload: Number(level),
  };
}

export function resetLevel(): ActionResetLevel {
  return {
    type: RESET_LEVEL,
  };
}
