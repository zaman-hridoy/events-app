import * as actions from './authConstants';

const initialState = {
    currentUser: null,
    authenticated: false
}


const authReducer = (state=initialState, action) => {
    switch (action.type) {
        case actions.LOGIN_USER:
            return {
                ...state,
                currentUser: action.payload.creds,
                authenticated: true
            }
        case actions.SIGN_OUT_USER:
            return {
                ...state,
                currentUser: null,
                authenticated: false
            }
        default:
            return state;
    }
}

export default authReducer;