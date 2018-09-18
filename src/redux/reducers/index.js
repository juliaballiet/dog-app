import { combineReducers } from 'redux';
import user from './userReducer';
import login from './loginReducer';
import dogs from './dogsReducer';
import dogProfile from './dogProfileReducer';

const store = combineReducers({
  user,
  login,
  dogs,
  dogProfile
});

export default store;
