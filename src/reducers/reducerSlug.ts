import { Reducer, AnyAction } from 'redux';
import { SET_SLUG, ActionSlug } from '../actions/actionSlug';

const reducer: Reducer<string | null> = (
  state = null,
  action: ActionSlug | AnyAction,
) => {
  switch (action.type) {
    case SET_SLUG:
      return action.payload;
    default:
      return state;
  }
};

export default reducer;
