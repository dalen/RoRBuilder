import {
  RESET_PATH_METER_A,
  SET_PATH_METER_A,
} from '../actions/actionPathMeterA';

const initialPoints = 0;

export default function(state = initialPoints, action) {
  switch (action.type) {
    case SET_PATH_METER_A:
      return action.payload;
    case RESET_PATH_METER_A:
      return initialPoints;
    default:
      return state;
  }
}
