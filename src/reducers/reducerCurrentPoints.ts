import { AnyAction } from 'redux';
import {
  RESET_CURRENT_POINTS,
  SET_CURRENT_POINTS,
  ActionSetCurrentPoints,
  ActionCurrentPoints,
} from '../actions/actionCurrentPoints';

const initialPoints = 26;

export default (
  state: number = initialPoints,
  action: ActionCurrentPoints | AnyAction,
): number => {
  switch (action.type) {
    case SET_CURRENT_POINTS:
      return (action as ActionSetCurrentPoints).payload;
    case RESET_CURRENT_POINTS:
      return initialPoints;
    default:
      return state;
  }
};
