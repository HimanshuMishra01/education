import { authHeader } from '../_helpers';

export const studentService = {
    getProblemList,
    registerSolution,
    getSolution
};

function getSolution(problemId) {
  console.log("get Solution &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&& ")
  let tokenData = localStorage.getItem('token_data');
  console.log(" tokenData " + tokenData);
   const requestOptions = {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin':'*'
      }
  };

    return fetch('/education/api/user/student/solution/solution?access_token=' + JSON.parse(tokenData).access_token
        + "&problemId=" + problemId, requestOptions)
    .then(handleResponse);
}

function registerSolution(solution) {
  let tokenData = localStorage.getItem('token_data');
  console.log(" tokenData " + tokenData + " solution " + JSON.stringify(solution));
   const requestOptions = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin':'*'
      },
      body: JSON.stringify(solution)
  };

    return fetch('/education/api/user/student/solution/add?access_token=' + JSON.parse(tokenData).access_token, requestOptions)
    .then(response => {
        console.log("response :: " + JSON.stringify(response) + " " + response.ok);
        if (!response.ok) {
            return Promise.reject(response.statusText);
        }
        return solution;
    })
}

function getProblemList() {
  let tokenData = localStorage.getItem('token_data');
  let challengeId = localStorage.getItem('challenge_id');
  console.log(" tokenData " + tokenData + " challengeId " + challengeId);
  const requestOptions = {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin':'*'
      },
  };

  return fetch('/education/api/user/student/problem/list?access_token=' + JSON.parse(tokenData).access_token
    + "&challengeId=" + challengeId, requestOptions)
    .then(handleResponse);
}

function handleResponse(response) {
  console.log("response " + JSON.stringify(response));
    if (!response.ok) {
        return Promise.reject(response.statusText);
    }
    console.log(response);
    return response.json();
}
