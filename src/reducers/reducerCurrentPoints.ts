import {
  RESET_CURRENT_POINTS,
  SET_CURRENT_POINTS,
  ActionCurrentPoints,
} from '../actions/actionCurrentPoints';

const initialPoints = 26;

export default function(
  state: number = initialPoints,
  action: ActionCurrentPoints,
): number {
  switch (action.type) {
    case SET_CURRENT_POINTS:
      return action.payload;
    case RESET_CURRENT_POINTS:
      return initialPoints;
    default:
      return state;
  }
}
