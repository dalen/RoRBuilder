import { SET_SHARING_LINK } from '../actions/actionSharingLink';

export default function(state = false, action) {
  switch (action.type) {
    case SET_SHARING_LINK:
      return action.payload;
    default:
      return state;
  }
}
