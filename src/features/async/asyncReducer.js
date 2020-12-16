import * as actions from './asyncConstants';

const initialState = {
    loading: false,
    error: null
}

export const asyncReducer = (state=initialState, action) => {
    switch (action.type) {
        case actions.ASYNC_ACTION_START:
            return {
                ...state,
                loading: true,
                error: null
            }
        case actions.ASYNC_ACTION_FINISH:
            return {
                ...state,
                loading: false,
                error: null
            }
        
        case actions.ASYNC_ACTION_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        default:
            return state;
    }
}

export default asyncReducer;