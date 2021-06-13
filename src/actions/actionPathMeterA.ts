export const SET_PATH_METER_A = 'set_path_meter_a';
export const RESET_PATH_METER_A = 'reset_path_meter_a';

export function setPathMeterA(points: number): {
  type: 'set_path_meter_a';
  payload: number;
} {
  return {
    type: SET_PATH_METER_A,
    payload: Number(points),
  };
}

export function resetPathMeterA(): {
  type: 'reset_path_meter_a';
} {
  return {
    type: RESET_PATH_METER_A,
  };
}

export type ActionPathMeterA =
  | ReturnType<typeof setPathMeterA>
  | ReturnType<typeof resetPathMeterA>;
