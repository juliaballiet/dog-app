const dogs = (state = [], action) => {
  switch (action.type) {
    case 'DOGS_LIST':
      return action.payload
    default:
      return state;
  }
};

export default dogs;
