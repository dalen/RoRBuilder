import { SET_SLUG } from '../actions/actionSlug';

export default function(state = false, action) {
  switch (action.type) {
    case SET_SLUG:
      return action.payload;
    default:
      return state;
  }
}
