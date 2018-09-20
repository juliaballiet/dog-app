import { combineReducers } from 'redux';


const newFeeding = (state = {}, action) => {
  switch (action.type) {
    case 'NEW_FEEDING_DOG':
      return { ...state, dog_id: action.payload };
    case 'NEW_FEEDING_FOOD':
      return { ...state, food_id: action.payload };
    case 'NEW_FEEDING_DATE':
      return { ...state, date: action.payload };
    case 'NEW_FEEDING_TIME':
      return { ...state, time: action.payload };
    default:
      return state;
  }
};

// const activities = (state = [], action) => {
//   switch (action.type) {
//     case 'ACTIVITIES_LIST':
//       return action.payload;
//     default:
//       return state;
//   }
// };

// const skills = (state = [], action) => {
//   switch (action.type) {
//     case 'SKILLS_LIST':
//       return action.payload;
//     default:
//       return state;
//   }
// };

export default combineReducers({
  newFeeding,
  //   activities,
  //   skills
});