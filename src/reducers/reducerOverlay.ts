import { AnyAction, Reducer } from 'redux';
import { TOGGLE_OVERLAY, ActionOverlay } from '../actions/actionOverlay';

const reducer: Reducer<boolean> = (
  state: boolean = false,
  action: ActionOverlay | AnyAction,
) => {
  switch (action.type) {
    case TOGGLE_OVERLAY:
      return action.payload;
    default:
      return state;
  }
};

export default reducer;
