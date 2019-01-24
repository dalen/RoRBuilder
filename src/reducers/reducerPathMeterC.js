import {
  RESET_PATH_METER_C,
  SET_PATH_METER_C,
} from '../actions/actionPathMeterC';

const initialPoints = 0;

export default function(state = initialPoints, action) {
  switch (action.type) {
    case SET_PATH_METER_C:
      return action.payload;
    case RESET_PATH_METER_C:
      return initialPoints;
    default:
      return state;
  }
}
