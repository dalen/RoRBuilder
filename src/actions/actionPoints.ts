export const SET_POINTS = 'set_points';
export const RESET_POINTS = 'reset_points';

export function setPoints(points: number): {
  type: 'set_points';
  payload: number;
} {
  return {
    type: SET_POINTS,
    payload: Number(points),
  };
}

export function resetPoints(): {
  type: 'reset_points';
} {
  return {
    type: RESET_POINTS,
  };
}

export type ActionPoints =
  | ReturnType<typeof setPoints>
  | ReturnType<typeof resetPoints>;
