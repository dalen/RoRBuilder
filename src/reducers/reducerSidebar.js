import { TOGGLE_SIDEBAR } from '../actions/actionSidebar';

export default (state = false, action) => {
  switch (action.type) {
    case TOGGLE_SIDEBAR:
      return action.payload;
    default:
      return state;
  }
};
