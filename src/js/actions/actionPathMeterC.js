export const SET_PATH_METER_C = 'set_path_meter_c';
export const RESET_PATH_METER_C = 'reset_path_meter_c';

export function setPathMeterC(points) {
  return {
    type: SET_PATH_METER_C,
    payload: Number(points),
  };
}

export function resetPathMeterC() {
  return {
    type: RESET_PATH_METER_C,
  };
}
