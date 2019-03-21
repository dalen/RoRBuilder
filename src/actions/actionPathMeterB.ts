export const SET_PATH_METER_B = 'set_path_meter_b';
export const RESET_PATH_METER_B = 'reset_path_meter_b';

export function setPathMeterB(points: number) {
  return {
    type: SET_PATH_METER_B,
    payload: Number(points),
  };
}

export function resetPathMeterB() {
  return {
    type: RESET_PATH_METER_B,
  };
}
