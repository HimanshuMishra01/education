import { userConstants } from '../_constants';

export function users(state = {}, action) {
  switch (action.type) {
      case userConstants.USER_REQUEST:
        return {
          loading: true
        };
      case userConstants.USER_SUCCESS:
        return {
          current_user: action.user
        };
      case userConstants.USER_FAILURE:
        return state;
    default:
      return state
  }
}
