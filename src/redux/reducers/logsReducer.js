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
    case 'NEW_FEEDING_AMOUNT':
      return {...state, amount: action.payload};
    default:
      return state;
  }
};

const newExercise = (state = {}, action) => {
  switch (action.type) {
    case 'NEW_EXERCISE_DOG':
      return { ...state, dog_id: action.payload };
    case 'NEW_EXERCISE_ACTIVITY':
      return { ...state, activity_id: action.payload };
    case 'NEW_EXERCISE_DATE':
      return { ...state, date: action.payload };
    case 'NEW_EXERCISE_DURATION':
      return { ...state, duration: action.payload };
    case 'NEW_EXERCISE_NOTES':
      return { ...state, notes: action.payload };
    default:
      return state;
  }
};

const newTraining = (state = {}, action) => {
  switch (action.type) {
    case 'NEW_TRAINING_DOG':
      return { ...state, dog_id: action.payload };
    case 'NEW_TRAINING_SKILL':
      return { ...state, skill_id: action.payload };
    case 'NEW_TRAINING_DATE':
      return { ...state, date: action.payload };
    case 'NEW_TRAINING_DURATION':
      return { ...state, duration: action.payload };
    case 'NEW_TRAINING_NOTES':
      return { ...state, notes: action.payload };
    default:
      return state;
  }
};

export default combineReducers({
  newFeeding,
  newExercise,
  newTraining
});