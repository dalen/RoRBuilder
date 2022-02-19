export const CALCULATE_TACTIC_LIMIT = 'calculate_tactic_limit';
export const RESET_TACTIC_LIMIT = 'reset_tactic_limit';
export const SET_TACTIC_LIMIT = 'set_tactic_limit';

export function calculateTacticLimit(level: number): {
  type: 'calculate_tactic_limit';
  payload: number;
} {
  const limit = Math.min(Math.floor(level / 8), 4);
  return {
    type: CALCULATE_TACTIC_LIMIT,
    payload: limit,
  };
}

export function resetTacticLimit(): {
  type: 'reset_tactic_limit';
} {
  return {
    type: RESET_TACTIC_LIMIT,
  };
}

export function setTacticLimit(limit: number): {
  type: 'set_tactic_limit';
  payload: number;
} {
  return {
    type: SET_TACTIC_LIMIT,
    payload: limit,
  };
}

export type ActionTacticLimit =
  | ReturnType<typeof calculateTacticLimit>
  | ReturnType<typeof resetTacticLimit>
  | ReturnType<typeof setTacticLimit>;
