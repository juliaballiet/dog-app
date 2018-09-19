import { combineReducers } from 'redux';

const food = (state = [], action) => {
  switch (action.type) {
    case 'FOOD_LIST':
      return action.payload;
    default:
      return state;
  }
};

const activities = (state = [], action) => {
  switch (action.type) {
    case 'ACTIVITIES_LIST':
      return action.payload;
    default:
      return state;
  }
};

export default combineReducers({
  food,
  activities
});