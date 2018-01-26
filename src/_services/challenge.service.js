export const challengeService = {
    register,
    getAllChallenges,
    getAllUserChallenges,
    getChallengeStudentTimer
};

function getChallengeStudentTimer() {
  let challengeId = localStorage.getItem('challenge_id');
  let tokenData = localStorage.getItem('token_data');
  console.log("challenge id ::::: " + challengeId + " tokenData ::: " + tokenData);
  const requestOptions = {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin':'*'
      },
  };

  return fetch('/education/api/user/student/problem/start_time/' + challengeId + '?access_token=' + JSON.parse(tokenData).access_token, requestOptions)
    .then(handleResponse);
}

function getAllUserChallenges(currentUser) {
  let tokenData = localStorage.getItem('token_data');
  console.log(" tokenData " + tokenData);
  const requestOptions = {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin':'*'
      },

  };

  return fetch('/education/api/user/student/challenge/list?access_token=' + JSON.parse(tokenData).access_token, requestOptions)
    .then(handleResponse);
}

function getAllChallenges() {
  let tokenData = localStorage.getItem('token_data');
  console.log(" tokenData " + tokenData);
  const requestOptions = {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin':'*'
      },
  };

  return fetch('/education/api/admin/challenge/list?access_token=' + JSON.parse(tokenData).access_token, requestOptions)
    .then(handleResponse);
}

function register(challenge) {
  let tokenData = localStorage.getItem('token_data');
  console.log(" tokenData " + tokenData);
  const requestOptions = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin':'*'
      },
      body: JSON.stringify(challenge)
  };

    return fetch('/education//api/admin/challenge/add?access_token=' + JSON.parse(tokenData).access_token, requestOptions)
    .then(response => {
        console.log("response :: " + JSON.stringify(response) + " " + response.ok);
        if (!response.ok) {
            return Promise.reject(response.statusText);
        }
        return challenge;
    })
}

function handleResponse(response) {
    if (!response.ok) {
        return Promise.reject(response.statusText);
    }
    console.log(response);
    return response.json();
}
