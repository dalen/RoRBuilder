import { Reducer } from 'redux';
import { TOGGLE_OVERLAY, ActionOverlay } from '../actions/actionOverlay';

const reducer: Reducer<boolean, ActionOverlay> = (
  state = false,
  action: ActionOverlay,
) => {
  switch (action.type) {
    case TOGGLE_OVERLAY:
      return action.payload;
    default:
      return state;
  }
};

export default reducer;
