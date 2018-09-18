const feedingLog = (state = [], action) => {
  switch (action.type) {
    case 'FEEDING_LOG':
      return action.payload
    default:
      return state;
  }
};

export default feedingLog;