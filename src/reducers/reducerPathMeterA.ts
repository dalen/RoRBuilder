import { Reducer } from 'redux';
import {
  RESET_PATH_METER_A,
  SET_PATH_METER_A,
  ActionPathMeterA,
} from '../actions/actionPathMeterA';

const initialPoints = 0;

const reducer: Reducer<number> = (
  state: number = initialPoints,
  action: ActionPathMeterA,
) => {
  switch (action.type) {
    case SET_PATH_METER_A:
      return action.payload;
    case RESET_PATH_METER_A:
      return initialPoints;
    default:
      return state;
  }
};

export default reducer;
