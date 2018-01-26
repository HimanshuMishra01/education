import { challengeConstants } from '../_constants';

export function challenge(state = {}, action) {
  switch (action.type) {
      case challengeConstants.CHALLENGE_REGISTER_REQUEST:
        return {
          loading: true
        };
      case challengeConstants.CHALLENGE_REGISTER_SUCCESS:
        return {
          challenge: action.challenge
        };
      case challengeConstants.CHALLENGE_REGISTER_FAILURE:
        return state;
      case challengeConstants.GET_ALL_CHALLENGES:
          return {
            loading: true,
            list: []
          };
      case challengeConstants.GET_ALL_CHALLENGES_SUCCESS:
          return {
            loading: false,
            list: action.challenges
          };
      case challengeConstants.GET_ALL_CHALLENGES_FAILURE:
            return state;
      case challengeConstants.SHOW_PROBLEMS:
            return { challengeId: action.challengeId };
      case challengeConstants.SHOW_USER_PROBLEMS:
            return state;
    default:
      return state;
  }
}
