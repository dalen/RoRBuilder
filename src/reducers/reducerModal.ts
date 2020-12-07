import { OPEN_MODAL, CLOSE_MODAL, ActionModal } from '../actions/actionModal';
import { ModalType } from '../helpers/modalTypes';

export default (state: ModalType | false = false, action: ActionModal) => {
  switch (action.type) {
    case OPEN_MODAL:
      return action.payload;
    case CLOSE_MODAL:
      return action.payload;
    default:
      return state;
  }
};
