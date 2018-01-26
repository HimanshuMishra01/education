import {studentConstants, problemConstants, solutionConstants} from '../_constants';
import {studentService} from '../_services';
import { alertActions } from './';
export const studentActions = {
    getProblemList,
    getCurrentProblem,
    registerSolution,
    getSolution,
    getUserSolution
};

function getCurrentProblem(problemId) {
  return { type: problemConstants.SHOW_PROBLEM, problemId };
}

function createSingleMoreSolutionObject(problemData, problem) {
  const singleMoreSolutionData = [];
  problemData.solution.map((sol, index) => (
    singleMoreSolutionData[index] = {'label': sol.split('$$')[0], 'value' : sol.split('$$')[1]}
  ));
  return {
    problemId: problem.problemId,
    challengeId: localStorage.getItem('challenge_id'),
    singleMoreSolution: singleMoreSolutionData
  };
}

function createIntegerSolutionObject(problemData, problem) {
  console.log("!!!!!!!! createIntegerSolutionObject problemData::" + JSON.stringify(problemData)
    + " problem::" + JSON.stringify(problem));
  return {
    problemId: problem.problemId,
    challengeId: localStorage.getItem('challenge_id'),
    integerSolution: problemData.solution.split(',')
  };
}

function createMatrixProblemSolution(problemData) {
  let matrixSol = [];
    problemData.map((prob, index) =>
    {
      let rightCol = [];
      prob.solution.map((solutionMap) => {
        let rightColOption = solutionMap.split('$$')[0];
        let rightColOn = solutionMap.split('$$')[1];

        if(rightColOn === "on") {
          rightCol.push(rightColOption);
        }
        })

    return (
      matrixSol[index] = {
        leftColumn: prob.option,
        rightColumn: rightCol
      }
      )
    }
);
  return matrixSol;
}

function createMatrixMatchSolutionObject(problemData, problem) {
  console.log("################## createMatrixMatchSolutionObject problemData::" + JSON.stringify(problemData)
    + " problem::" + JSON.stringify(problem));
    let sol = createMatrixProblemSolution(problemData);
    console.log("##################" + JSON.stringify(sol));

  return {
    problemId: problem.problemId,
    challengeId: localStorage.getItem('challenge_id'),
    matrixSolution: sol
  };
}

function createSolutionObject(problemData, problem) {
  console.log(" problemData.problemType " + problem.problemType);
  console.log("################## createSolutionObject problemData::"
  + JSON.stringify(problemData) + " problem::" + JSON.stringify(problem));
  switch (problem.problemType) {
    case "INTEGER_TYPE":
      return createIntegerSolutionObject(problemData, problem);
    case "SINGLE_MORE_TYPE":
      return createSingleMoreSolutionObject(problemData, problem);
    case "MATRIX_MATCH_TYPE":
      return createMatrixMatchSolutionObject(problemData, problem);
  }
}

function registerSolution(problemData, problem) {
  console.log("################## register solution problemData::"
  + JSON.stringify(problemData) + " problem::" + JSON.stringify(problem));

  const solutionObject = createSolutionObject(problemData, problem);
console.log("################## solutionObject " + JSON.stringify(solutionObject))
    return dispatch => {
        //dispatch(request(problemData, problem));
        dispatch(alertActions.clear());

        studentService.registerSolution(solutionObject)
            .then(
                solution => {
                    //dispatch(success());
                    dispatch(alertActions.success('Solution submitted successfully'));
                },
                error => {
                    //dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };

    //function request(problemData, problem) { return { type: challengeConstants.SOLUTION_REGISTER_REQUEST, problemData, problem } }
    //function success() { return { type: challengeConstants.SOLUTION_REGISTER_SUCCESS, challenge } }
    //function failure(error) { return { type: challengeConstants.SOLUTION_REGISTER_FAILURE, error } }
}

function getUserSolution(problemId, userId) {

}

function getSolution(problemId) {
  console.log("getSolution %%%%%%%%%%%%%%%%%%");
  return dispatch => {
    studentService.getSolution(problemId)
      .then(solution => {
        console.log("success " + JSON.stringify(solution));
        dispatch(success(solution));
      },
      error => {
        console.log("error " + JSON.stringify(error));
        dispatch(failure(error));
        dispatch(alertActions.error(error));

      });
      function success(solution) { return { type: solutionConstants.SOLUTION_SUCCESS, solution } }
      function failure(error) { return { type: solutionConstants.SOLUTION_ERROR, error } }
  }
}

function getProblemList(fetchSolution, isStudent, userId) {
  console.log("getProblemList %%%%%%%%%%%%%%%%%%%%%%%%%")
  return dispatch => {
      dispatch(request());

      studentService.getProblemList()
          .then(
              problemList => {
                  dispatch(success(problemList));
                  dispatch(getCurrentProblem(problemList[0].id));
                  console.log("fetchSolution " + fetchSolution + " isStudent " + isStudent);
                  if(fetchSolution) {
                    if(isStudent) {
                      dispatch(getSolution(problemList[0].id));
                    } else {
                      dispatch(getUserSolution(problemList[0].id, userId));
                    }
                  }
                  //console.log("problemList " + JSON.stringify(problemList));
              },
              error => {
                  console.log("error " + JSON.stringify(error));
                  dispatch(failure(error));
                  dispatch(alertActions.error(error));
              }
          );
  };

  function request() { return { type: studentConstants.PROBLEM_LIST_REQUEST } }
  function success(problemList) { return { type: studentConstants.PROBLEM_LIST_SUCCESS, problemList } }
  function failure(error) { return { type: studentConstants.PROBLEM_LIST_ERROR, error } }
}
