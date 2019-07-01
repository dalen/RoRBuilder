import { Reducer } from 'redux';
import {
  RESET_PATH_METER_C,
  SET_PATH_METER_C,
  ActionPathMeterC,
} from '../actions/actionPathMeterC';

const initialPoints = 0;

const reducer: Reducer<number> = (
  state = initialPoints,
  action: ActionPathMeterC,
) => {
  switch (action.type) {
    case SET_PATH_METER_C:
      return action.payload;
    case RESET_PATH_METER_C:
      return initialPoints;
    default:
      return state;
  }
};

export default reducer;
