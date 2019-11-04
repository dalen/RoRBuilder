export const SET_CURRENT_POINTS = 'set_current_points';
export const RESET_CURRENT_POINTS = 'reset_current_points';

export function setCurrentPoints(points: number) {
  return {
    type: SET_CURRENT_POINTS,
    payload: points,
  } as const;
}

export function resetCurrentPoints() {
  return {
    type: RESET_CURRENT_POINTS,
  } as const;
}

export type ActionSetCurrentPoints = ReturnType<typeof setCurrentPoints>;
export type ActionResetCurrentPoints = ReturnType<typeof resetCurrentPoints>;

export type ActionCurrentPoints =
  | ActionSetCurrentPoints
  | ActionResetCurrentPoints;
