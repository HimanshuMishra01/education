import { authHeader } from '../_helpers';

export const userService = {
    login,
    logout,
    getCurrentUser,
    getAllUsers,
    updateUser,
    register
};

function getCurrentUser() {
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

  return fetch('/education/common/current_user?access_token=' + JSON.parse(tokenData).access_token, requestOptions)
    .then(handleResponse);
}

function getAllUsers() {
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

  return fetch('/education/api/admin/account/list?access_token=' + JSON.parse(tokenData).access_token, requestOptions)
    .then(handleResponse);
}

function register(user) {
  let tokenData = localStorage.getItem('token_data');
  console.log(" tokenData " + tokenData);
  const requestOptions = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin':'*'
      },
      body: JSON.stringify(user)
  };

    return fetch('/education/api/admin/account/add?access_token=' + JSON.parse(tokenData).access_token, requestOptions)
    .then(response => {
        console.log("response :: " + JSON.stringify(response) + " " + response.ok);
        if (!response.ok) {
            return Promise.reject(response.statusText);
        }
        return user;
    })
}

function updateUser(username, updatedUserObject) {
  let tokenData = localStorage.getItem('token_data');
  console.log(" tokenData " + tokenData + " updatedUserObject " + JSON.stringify(updatedUserObject));
  const requestOptions = {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin':'*'
      },
      body: JSON.stringify(updatedUserObject)
  };
  return fetch('/education/api/admin/account/'+ username +'?access_token=' + JSON.parse(tokenData).access_token, requestOptions)
    .then(handleResponse);
}

function login(username, password) {
    var obj = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Basic ' + btoa('yati-education-client:secret'),
        'Access-Control-Allow-Origin':'*'
      }
    };
    return fetch('/education/oauth/token?grant_type=password&username='+ username +'&password=' + password, obj)
        .then(response => {
            console.log("response :: " + JSON.stringify(response) + " " + response.ok);
            if (!response.ok) {
                return Promise.reject(response.statusText);
            }
            return response.json();
        })
        .then(token_data => {
          console.log("token_data :: " + JSON.stringify(token_data));
            // login successful if there's a jwt token in the response
            if (token_data && token_data.access_token) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('token_data', JSON.stringify(token_data));
            } else {
              console.log("inside else");
            }
            return token_data;
        });
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('token_data');
}

function handleResponse(response) {
    if (!response.ok) {
        return Promise.reject(response.statusText);
    }
    console.log(response);
    return response.json();
}
