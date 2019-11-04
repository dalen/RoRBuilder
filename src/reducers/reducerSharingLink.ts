import {
  SET_SHARING_LINK,
  ActionSharingLink,
} from '../actions/actionSharingLink';

export default function(
  state: string | false = false,
  action: ActionSharingLink,
) {
  switch (action.type) {
    case SET_SHARING_LINK:
      return action.payload;
    default:
      return state;
  }
}
