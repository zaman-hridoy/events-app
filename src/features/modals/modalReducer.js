import { MODAL_CLOSE, MODAL_OPEN } from './modalConstants';

const initialState = {
    modalType: null,
    modalProps: null
};

export const modalReducer = (state=initialState, action) => {
    switch(action.type) {
        case MODAL_OPEN:
            return {
                ...state,
                modalType: action.payload.modalType,
                modalProps: action.payload.modalProps
            }
        case MODAL_CLOSE:
            return {
                ...state,
                modalType: null,
                modalProps: null
            }
        default: 
            return state;
    }
}

export default modalReducer;