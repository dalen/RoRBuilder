import { AnyAction } from 'redux';
import {
  SET_SHARING_LINK,
  ActionSharingLink,
} from '../actions/actionSharingLink';

export default function(state = false, action: ActionSharingLink | AnyAction) {
  switch (action.type) {
    case SET_SHARING_LINK:
      return action.payload;
    default:
      return state;
  }
}
