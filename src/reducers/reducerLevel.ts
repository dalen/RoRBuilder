import { SET_LEVEL, RESET_LEVEL, ActionLevel } from '../actions/actionLevel';

const initialLevel = 40;

export default function(state = initialLevel, action: ActionLevel): number {
  switch (action.type) {
    case SET_LEVEL:
      return action.payload;
    case RESET_LEVEL:
      return initialLevel;
    default:
      return state;
  }
}
