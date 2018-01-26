import { challengeConstants } from '../_constants';
import { challengeService } from '../_services';
import { alertActions } from './';
import { history } from '../_helpers';

export const challengeActions = {
    register,
    getAllChallenges,
    showProblems,
    getAllUserChallenges,
    showUserProblems
};

function showUserProblems(duration) {
 return dispatch => {
  challengeService.getChallengeStudentTimer()
    .then(
      studentTimer => {
        console.log("studentTimer " + JSON.stringify(studentTimer));
        let elapsedTime = studentTimer.serverTime - studentTimer.startTime;
        console.log("!!!!!!!!!!!!!!!!!!!!!!!! elapsedTime " + (elapsedTime / 1000) + " duration " + duration);
        if(elapsedTime > duration) {
          dispatch(userSolutionPage());
          history.push('/student_solution');
        } else {
          dispatch(userProblemPage());
          history.push('/student_problem');
        }
      },
      error => {
        dispatch(failure(error));
        dispatch(alertActions.error(error));
      }
    );
  };

  function userSolutionPage() {return { type: challengeConstants.SHOW_USER_SOLUTION}};
  function userProblemPage() { return { type: challengeConstants.SHOW_USER_PROBLEMS } }
  function failure(error) { return { type: challengeConstants.GET_ALL_CHALLENGES_FAILURE, error } }
}

function showProblems(challengeId) {
  return dispatch => {
      dispatch(problemPage());
      history.push('/problem');
  };

  function problemPage() { return { type: challengeConstants.SHOW_PROBLEMS, challengeId } }
}

function getAllUserChallenges(currentUser) {
  return dispatch => {
      dispatch(request());

      challengeService.getAllUserChallenges(currentUser)
          .then(
              challenges => {
                  dispatch(success(challenges));
                  console.log("all challenges " + JSON.stringify(challenges));
                  history.push('/challenge_list');
              },
              error => {
                  dispatch(failure(error));
                  dispatch(alertActions.error(error));
              }
          );
  };

  function request() { return { type: challengeConstants.GET_ALL_CHALLENGES } }
  function success(challenges) { return { type: challengeConstants.GET_ALL_CHALLENGES_SUCCESS, challenges } }
  function failure(error) { return { type: challengeConstants.GET_ALL_CHALLENGES_FAILURE, error } }
}

function getAllChallenges() {
    return dispatch => {
        dispatch(request());

        challengeService.getAllChallenges()
            .then(
                challenges => {
                    dispatch(success(challenges));
                    console.log("all challenges " + JSON.stringify(challenges));
                    history.push('/challenge_list');
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };

    function request() { return { type: challengeConstants.GET_ALL_CHALLENGES } }
    function success(challenges) { return { type: challengeConstants.GET_ALL_CHALLENGES_SUCCESS, challenges } }
    function failure(error) { return { type: challengeConstants.GET_ALL_CHALLENGES_FAILURE, error } }
}

function register(challenge) {
  console.log("create challenge " + JSON.stringify(challenge));
    return dispatch => {
        dispatch(request(challenge));

        challengeService.register(challenge)
            .then(
                user => {
                    dispatch(success());
                    dispatch(alertActions.success('Challenge Registration successful'));
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };

    function request(challenge) { return { type: challengeConstants.CHALLENGE_REGISTER_REQUEST, challenge } }
    function success(challenge) { return { type: challengeConstants.CHALLENGE_REGISTER_SUCCESS, challenge } }
    function failure(error) { return { type: challengeConstants.CHALLENGE_REGISTER_FAILURE, error } }
}
