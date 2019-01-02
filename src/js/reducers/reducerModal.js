import { OPEN_MODAL, CLOSE_MODAL } from '../actions/actionModal';

export default function(state = false, action) {
  switch (action.type) {
    case OPEN_MODAL:
      return action.payload;
    case CLOSE_MODAL:
      return action.payload;
    default:
      return state;
  }
}
