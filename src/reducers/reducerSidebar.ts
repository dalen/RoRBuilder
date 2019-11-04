import { TOGGLE_SIDEBAR, ActionSidebar } from '../actions/actionSidebar';

export default (state = false, action: ActionSidebar): boolean => {
  switch (action.type) {
    case TOGGLE_SIDEBAR:
      return action.payload;
    default:
      return state;
  }
};
