export const SET_PATH_METER_C = 'set_path_meter_c';
export const RESET_PATH_METER_C = 'reset_path_meter_c';

export function setPathMeterC(points: number): {
  type: 'set_path_meter_c';
  payload: number;
} {
  return {
    type: SET_PATH_METER_C,
    payload: Number(points),
  };
}

export function resetPathMeterC(): {
  type: 'reset_path_meter_c';
} {
  return {
    type: RESET_PATH_METER_C,
  };
}

export type ActionPathMeterC =
  | ReturnType<typeof setPathMeterC>
  | ReturnType<typeof resetPathMeterC>;
