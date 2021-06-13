export const SET_PATH_METER_B = 'set_path_meter_b';
export const RESET_PATH_METER_B = 'reset_path_meter_b';

export function setPathMeterB(points: number): {
  type: 'set_path_meter_b';
  payload: number;
} {
  return {
    type: SET_PATH_METER_B,
    payload: Number(points),
  };
}

export function resetPathMeterB(): {
  type: 'reset_path_meter_b';
} {
  return {
    type: RESET_PATH_METER_B,
  };
}

export type ActionPathMeterB =
  | ReturnType<typeof setPathMeterB>
  | ReturnType<typeof resetPathMeterB>;
