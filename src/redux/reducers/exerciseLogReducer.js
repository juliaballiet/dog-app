const exerciseLog = (state = [], action) => {
    switch (action.type) {
      case 'EXERCISE_LOG':
        return action.payload
      default:
        return state;
    }
  };
  
  export default exerciseLog;