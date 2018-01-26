import { userConstants } from '../_constants';

export function userList(state = {}, action) {
  switch (action.type) {
      case userConstants.GET_ALL_USER_REQUEST:
          return {
            loading: true,
            current_user: state.users
          };
      case userConstants.GET_ALL_USER_USER_SUCCESS:
          return {
            list: action.user
          };
      case userConstants.GET_ALL_USER_FAILURE:
          return state;
    default:
      return state
  }
}
