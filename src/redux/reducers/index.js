import { combineReducers } from 'redux';
import user from './userReducer';
import login from './loginReducer';
import dogs from './dogsReducer';
import dogProfile from './dogProfileReducer';
import feedingLog from './feedingLogReducer';
import exerciseLog from './exerciseLogReducer';
import trainingLog from './trainingLogReducer';
import listsReducer from './listsReducer';

const store = combineReducers({
  user,
  login,
  dogs,
  dogProfile,
  feedingLog,
  exerciseLog,
  trainingLog,
  listsReducer
});

export default store;