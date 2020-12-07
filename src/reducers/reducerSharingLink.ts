import {
  SET_SHARING_LINK,
  ActionSharingLink,
} from '../actions/actionSharingLink';

export default (state: string | null = null, action: ActionSharingLink) => {
  switch (action.type) {
    case SET_SHARING_LINK:
      return action.payload;
    default:
      return state;
  }
};
