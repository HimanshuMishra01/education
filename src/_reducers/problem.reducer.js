import { problemConstants } from '../_constants';

export function problem(state = {}, action) {
  switch (action.type) {
      case problemConstants.PROBLEM_REGISTER_REQUEST:
        return {
          loading: true
        };
      case problemConstants.PROBLEM_REGISTER_SUCCESS:
        return {
          problem: action.problem
        };
      case problemConstants.PROBLEM_REGISTER_FAILURE:
        return state;
      case problemConstants.GET_PROBLEM_COUNT_REQUEST:
        return {
          loading: true
        };
      case problemConstants.GET_PROBLEM_COUNT_SUCCESS:
        return {
          count: action.count
        };
      case problemConstants.GET_PROBLEM_COUNT_FAILURE:
        return state;
      case problemConstants.SHOW_PROBLEM:
         return {problemId: action.problemId};
    default:
      return state;
  }
}
