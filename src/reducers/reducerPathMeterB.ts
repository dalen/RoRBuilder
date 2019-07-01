import { Reducer } from 'redux';
import {
  RESET_PATH_METER_B,
  SET_PATH_METER_B,
  ActionPathMeterB,
} from '../actions/actionPathMeterB';

const initialPoints = 0;

const reducer: Reducer<number> = (
  state: number = initialPoints,
  action: ActionPathMeterB,
) => {
  switch (action.type) {
    case SET_PATH_METER_B:
      return action.payload;
    case RESET_PATH_METER_B:
      return initialPoints;
    default:
      return state;
  }
};

export default reducer;
