export const SET_CURRENT_POINTS = 'set_current_points';
export const RESET_CURRENT_POINTS = 'reset_current_points';

export type ActionSetCurrentPoints = {
  type: 'set_current_points';
  payload: number;
};
export type ActionResetCurrentPoints = {
  type: 'reset_current_points';
};

export type ActionCurrentPoints =
  | ActionSetCurrentPoints
  | ActionResetCurrentPoints;

export function setCurrentPoints(points: number): ActionSetCurrentPoints {
  return {
    type: SET_CURRENT_POINTS,
    payload: Number(points),
  };
}

export function resetCurrentPoints(): ActionResetCurrentPoints {
  return {
    type: RESET_CURRENT_POINTS,
  };
}
