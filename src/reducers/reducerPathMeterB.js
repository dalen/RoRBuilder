import {
  RESET_PATH_METER_B,
  SET_PATH_METER_B,
} from '../actions/actionPathMeterB';

const initialPoints = 0;

export default function(state = initialPoints, action) {
  switch (action.type) {
    case SET_PATH_METER_B:
      return action.payload;
    case RESET_PATH_METER_B:
      return initialPoints;
    default:
      return state;
  }
}
