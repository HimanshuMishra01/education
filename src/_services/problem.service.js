export const problemService = {
    register,
    getProblemCount
};

function getProblemCount(challengeId) {
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

  return fetch('/education/api/admin/problem/count/'+ challengeId +'?access_token=' + JSON.parse(tokenData).access_token, requestOptions)
    .then(handleResponse);
}

function register(problem) {
  let tokenData = localStorage.getItem('token_data');
  console.log(" tokenData " + tokenData + " problem " + JSON.stringify(problem));
   const requestOptions = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin':'*'
      },
      body: JSON.stringify(problem)
  };

    return fetch('/education//api/admin/problem/add?access_token=' + JSON.parse(tokenData).access_token, requestOptions)
    .then(response => {
        console.log("response :: " + JSON.stringify(response) + " " + response.ok);
        if (!response.ok) {
            return Promise.reject(response.statusText);
        }
        return problem;
    })
}

function handleResponse(response) {
    if (!response.ok) {
        return Promise.reject(response.statusText);
    }
    console.log(response);
    return response.json();
}
