import { TOGGLE_OVERLAY } from '../actions/actionOverlay';

export default function(state = false, action) {
  switch (action.type) {
    case TOGGLE_OVERLAY:
      return action.payload;
    default:
      return state;
  }
}
