import { AnyAction } from 'redux';
import { OPEN_MODAL, CLOSE_MODAL, ActionModal } from '../actions/actionModal';

export default function(state = false, action: ActionModal | AnyAction) {
  switch (action.type) {
    case OPEN_MODAL:
      return action.payload;
    case CLOSE_MODAL:
      return action.payload;
    default:
      return state;
  }
}
