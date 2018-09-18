const activityLog = (state = [], action) => {
    switch (action.type) {
      case 'ACTIVITY_LOG':
        return action.payload
      default:
        return state;
    }
  };
  
  export default activityLog;