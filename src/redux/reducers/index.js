import { combineReducers } from 'redux';
import user from './userReducer';
import login from './loginReducer';
import dogs from './dogsReducer';
import dogProfile from './dogProfileReducer';
import feedingLog from './feedingLogReducer';
import exerciseLog from './exerciseLogReducer';
import trainingLog from './trainingLogReducer';
import lists from './listsReducer';
import logs from './logsReducer';

const store = combineReducers({
  user,
  login,
  dogs,
  dogProfile,
  feedingLog,
  exerciseLog,
  trainingLog,
  lists,
  logs
});

export default store;