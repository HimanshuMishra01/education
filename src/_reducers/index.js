import { combineReducers } from 'redux';

import { authentication } from './authentication.reducer';
import { registration } from './registration.reducer';
import { users } from './users.reducer';
import { alert } from './alert.reducer';
import { userList } from './userList.reducer';
import { challenge } from './challenge.reducer';
import { problem } from './problem.reducer';
import { student } from './student.reducer';
import { solution } from './solution.reducer';

const rootReducer = combineReducers({
  authentication,
  registration,
  users,
  alert,
  userList,
  challenge,
  problem,
  student,
  solution
});

export default rootReducer;
