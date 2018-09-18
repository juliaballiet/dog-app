import { combineReducers } from 'redux';
import user from './userReducer';
import login from './loginReducer';
import dogs from './dogsReducer';

const store = combineReducers({
  user,
  login,
  dogs
});

export default store;
