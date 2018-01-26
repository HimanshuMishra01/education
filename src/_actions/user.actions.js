import { userConstants } from '../_constants';
import { userService } from '../_services';
import { alertActions } from './';
import { history } from '../_helpers';

export const userActions = {
    login,
    logout,
    getCurrentUser,
    getAllUsers,
    updateUser,
    register
};

function getCurrentUser() {
  return dispatch => {
      dispatch(request());
      
      userService.getCurrentUser()
          .then(
              user => {
                  dispatch(success(user));
                  //console.log("current user " + JSON.stringify(user));
                  for(var i =0; i < user.roles.length; i++) {
                    if(user.roles[i] === 'ROLE_ADMIN') {
                      history.push('/');
                    } else if(user.roles[i] === 'ROLE_USER') {
                      history.push('/student');
                    }
                  }
              },
              error => {
                  dispatch(failure(error));
                  dispatch(alertActions.error(error));
                  history.push('/login');
              }
          );
  };

  function request() { return { type: userConstants.USER_REQUEST } }
  function success(user) { return { type: userConstants.USER_SUCCESS, user } }
  function failure(error) { return { type: userConstants.USER_FAILURE, error } }
}

function getAllUsers() {

    return dispatch => {
        dispatch(request());

        userService.getAllUsers()
            .then(
                list_users => {
                    dispatch(success(list_users));
                    console.log("all users " + JSON.stringify(list_users));
                    history.push('/user_account');
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };

    function request() { return { type: userConstants.GET_ALL_USER_REQUEST } }
    function success(user) { return { type: userConstants.GET_ALL_USER_USER_SUCCESS, user } }
    function failure(error) { return { type: userConstants.GET_ALL_USER_FAILURE, error } }
}

function updateUser(username, updatedUserObject) {
    console.log("username " + username + " updatedUserObject " + updatedUserObject );
    return dispatch => {
        dispatch(request());

        userService.updateUser(username, updatedUserObject)
            .then(
                updateduser => {
                    dispatch(success(updateduser));
                    console.log("all users " + JSON.stringify(updateduser));
                    dispatch(alertActions.success("User updated successfully"));
                    //history.push('/user_account');
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };

    function request() { return { type: userConstants.UPDATE_USER_REQUEST } }
    function success(updateduser) { return { type: userConstants.UPDATE_USER_SUCCESS, updateduser } }
    function failure(error) { return { type: userConstants.UPDATE_USER_FAILURE, error } }
}

function login(username, password) {
    return dispatch => {
        dispatch(request({ username }));

        userService.login(username, password)
            .then(
                user => {
                    dispatch(success(user));
                    history.push('/');
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };

    function request(user) { return { type: userConstants.LOGIN_REQUEST, user } }
    function success(user) { return { type: userConstants.LOGIN_SUCCESS, user } }
    function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
}

function logout() {
    userService.logout();
    return { type: userConstants.LOGOUT };
}

function register(user) {
  //console.log("create user " + JSON.stringify(user));
    return dispatch => {
        dispatch(request(user));

        userService.register(user)
            .then(
                user => {
                    dispatch(success());
                    dispatch(alertActions.success('Registration successful'));
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };

    function request(user) { return { type: userConstants.REGISTER_REQUEST, user } }
    function success(user) { return { type: userConstants.REGISTER_SUCCESS, user } }
    function failure(error) { return { type: userConstants.REGISTER_FAILURE, error } }
}
