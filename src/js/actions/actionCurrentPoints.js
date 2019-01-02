export const SET_CURRENT_POINTS = 'set_current_points';
export const RESET_CURRENT_POINTS = 'reset_current_points';

export function setCurrentPoints(points) {
  return {
    type: SET_CURRENT_POINTS,
    payload: Number(points),
  };
}

export function resetCurrentPoints() {
  return {
    type: RESET_CURRENT_POINTS,
  };
}
