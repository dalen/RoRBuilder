import {
  SET_RENOWN,
  RESET_RENOWN,
  ActionRenown,
} from '../actions/actionRenown';

const initialRenown = 40;

export default (state = initialRenown, action: ActionRenown) => {
  switch (action.type) {
    case SET_RENOWN:
      return action.payload;
    case RESET_RENOWN:
      return initialRenown;
    default:
      return state;
  }
};
