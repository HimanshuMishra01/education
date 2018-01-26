import { solutionConstants } from '../_constants';

export function solution(state = {}, action) {
  switch (action.type) {
    case solutionConstants.SOLUTION_SUCCESS:
      return action.solution;
    case solutionConstants.SOLUTION_ERROR: {
      return {}
    }
    default:
    return state;
  }
}
