import * as actions from './asyncConstants';

export const asyncActionStart = () => {
    return {
        type: actions.ASYNC_ACTION_START
    }
}

export const asyncActionFinish = () => {
    return {
        type: actions.ASYNC_ACTION_FINISH
    }
}

export const asyncActionError = () => {
    return {
        type: actions.ASYNC_ACTION_ERROR
    }
}