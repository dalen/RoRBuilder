export const SET_PATH_METER_A = 'set_path_meter_a';
export const RESET_PATH_METER_A = 'reset_path_meter_a';

export function setPathMeterA(points) {
  return {
    type: SET_PATH_METER_A,
    payload: Number(points),
  };
}

export function resetPathMeterA() {
  return {
    type: RESET_PATH_METER_A,
  };
}
