import { SET_LEVEL, RESET_LEVEL } from "../actions/actionLevel";

const initialLevel = 40;

export default function(state = initialLevel, action) {
  switch (action.type) {
    case SET_LEVEL:
      return action.payload;
    case RESET_LEVEL:
      return initialLevel;
    default:
      return state;
  }
}
