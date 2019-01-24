export const SET_POINTS = 'set_points';
export const RESET_POINTS = 'reset_points';

export function setPoints(points) {
  return {
    type: SET_POINTS,
    payload: Number(points),
  };
}

export function resetPoints() {
  return {
    type: RESET_POINTS,
  };
}
