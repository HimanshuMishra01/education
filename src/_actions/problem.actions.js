import { problemConstants } from '../_constants';
import { problemService } from '../_services';
import { alertActions } from './';
import { history } from '../_helpers';

export const problemActions = {
    register,
    getProblemCount
};

function createSingleMoreProblemObject(problemData, challengeData) {
  return {
    questionType: challengeData.problem_type_radio,
    challengeId: challengeData.challengeId,
    score: challengeData.marks,
    penalty: challengeData.penalty,
    singleMoreProblem: {
      problemStatement: problemData.statement,
      problemOptions: [
        {
          label: "option_a",
          value: problemData.option_a
        },
        {
          label: "option_b",
          value: problemData.option_b
        },
        {
          label: "option_c",
          value: problemData.option_c
        },
        {
          label: "option_d",
          value: problemData.option_d
        }
      ],
      correctOptions: [
        {
          label: "sol_option_a",
          value: problemData.sol_option_a
        },
        {
          label: "sol_option_b",
          value: problemData.sol_option_b
        },
        {
          label: "sol_option_c",
          value: problemData.sol_option_c
        },
        {
          label: "sol_option_d",
          value: problemData.sol_option_d
        }
      ]
    }
  };
}

function createIntegerProblemObject(problemData, challengeData) {
  return {
    questionType: challengeData.problem_type_radio,
    challengeId: challengeData.challengeId,
    score: challengeData.marks,
    penalty: challengeData.penalty,
    integerProblem: {
      problemStatement: problemData.statement,
      solution: problemData.solution.split(',')
    }
  }
}

function createMatrixMatchProblemObject(problemData, challengeData) {
  return {
    questionType: challengeData.problem_type_radio,
    challengeId: challengeData.challengeId,
    score: challengeData.marks,
    penalty: challengeData.penalty,
    matrixProblem: {
      problemStatement: problemData.statement,
      leftColumn:[
        {
          label: 'option_a',
          value: problemData.option_a
        },
        {
          label: 'option_b',
          value: problemData.option_b
        },
        {
          label: 'option_c',
          value: problemData.option_c
        },
        {
          label: 'option_d',
          value: problemData.option_d
        }
      ],
      rightColumn:[
        {
          label: 'option_p',
          value: problemData.option_p
        },
        {
          label: 'option_q',
          value: problemData.option_q
        },
        {
          label: 'option_r',
          value: problemData.option_r
        },
        {
          label: 'option_s',
          value: problemData.option_s
        },
        {
          label: 'option_t',
          value: problemData.option_t
        }
      ],
      matrixSolution: [
        {
          leftColumn: 'sol_option_a',
          rightColumn: problemData.sol_option_a.split('$$')
        },
        {
          leftColumn: 'sol_option_b',
          rightColumn: problemData.sol_option_b.split('$$')
        },
        {
          leftColumn: 'sol_option_c',
          rightColumn: problemData.sol_option_c.split('$$')
        },
        {
          leftColumn: 'sol_option_d',
          rightColumn: problemData.sol_option_d.split('$$')
        }
      ]
    }
  };
}

function createProblemObject(problemData, challengeData) {
  switch (challengeData.problem_type_radio) {
    case "INTEGER_TYPE":
      return createIntegerProblemObject(problemData, challengeData);
    case "SINGLE_MORE_TYPE":
      return createSingleMoreProblemObject(problemData, challengeData);
    case "MATRIX_MATCH_TYPE":
      return createMatrixMatchProblemObject(problemData, challengeData);
  }
}


function register(problemData, challengeData) {
  console.log("create problem " + JSON.stringify(problemData) + " challengeData " + JSON.stringify(challengeData));
  const problem = createProblemObject(problemData, challengeData);
  console.log("problem " + JSON.stringify(problem));
    return dispatch => {
        dispatch(request(problem));

        problemService.register(problem)
            .then(
                problem => {
                    dispatch(success());
                    dispatch(alertActions.success('Problem Registration successful'));
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };

    function request(problem) { return { type: problemConstants.PROBLEM_REGISTER_REQUEST, problem } }
    function success(problem) { return { type: problemConstants.PROBLEM_REGISTER_SUCCESS, problem } }
    function failure(error) { return { type: problemConstants.PROBLEM_REGISTER_FAILURE, error } }
}

function getProblemCount(challengeId) {
    return dispatch => {
        dispatch(request());
        problemService.getProblemCount(challengeId)
            .then(
                count => {
                    dispatch(success(count));
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };

    function request() { return { type: problemConstants.GET_PROBLEM_COUNT_REQUEST } }
    function success(count) { return { type: problemConstants.GET_PROBLEM_COUNT_SUCCESS, count } }
    function failure(error) { return { type: problemConstants.GET_PROBLEM_COUNT_FAILURE, error } }
}
