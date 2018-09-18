const dogProfile = (state = {}, action) => {
    switch (action.type) {
        case 'SET_DOG_PROFILE':
            return action.payload
        case 'CHANGE_NAME':
            return {...state, name: action.payload}
        case 'CHANGE_BREED':
            return {...state, breed: action.payload}
        case 'CHANGE_WEIGHT':
            return {...state, weight: action.payload}
        case 'CHANGE_BIRTHDAY':
            return {...state, birthday: action.payload}
        default:
            return state;
    }
};

export default dogProfile;