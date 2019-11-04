import { Reducer } from 'redux';
import { SET_SLUG, ActionSlug } from '../actions/actionSlug';

const reducer: Reducer<string | null, ActionSlug> = (
  state = null,
  action: ActionSlug,
) => {
  switch (action.type) {
    case SET_SLUG:
      return action.payload;
    default:
      return state;
  }
};

export default reducer;
