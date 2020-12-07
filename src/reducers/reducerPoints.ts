import {
  RESET_POINTS,
  SET_POINTS,
  ActionPoints,
} from '../actions/actionPoints';

const initialPoints = 26;

export default (state = initialPoints, action: ActionPoints) => {
  switch (action.type) {
    case SET_POINTS:
      return action.payload;
    case RESET_POINTS:
      return initialPoints;
    default:
      return state;
  }
};
