const trainingLog = (state = [], action) => {
    switch (action.type) {
      case 'TRAINING_LOG':
        return action.payload
      default:
        return state;
    }
  };
  
  export default trainingLog;