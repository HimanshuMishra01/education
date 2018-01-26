import { studentConstants } from '../_constants';

export function student(state = {}, action) {

  switch (action.type) {
      case studentConstants.PROBLEM_LIST_REQUEST:
          return {
            loading: true
          };
      case studentConstants.PROBLEM_LIST_SUCCESS:
          return {
            problemList: action.problemList
          };
      case studentConstants.PROBLEM_LIST_ERROR:
          return state;
    default:
      return state;
  }
}
