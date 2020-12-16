import { toastr } from 'react-redux-toastr';
import * as actions from './eventConstants';

export const createEvent = event => {
    return dispatch => {
        dispatch({
            type: actions.CREATE_EVENT,
            payload: {
                event
            }
        });

        toastr.success('Event has been created');
    }
}

export const updateEvent = event => {
    return dispatch => {
        dispatch({
            type: actions.UPDATE_EVENT,
            payload: {
                event
            }
        })
    }
}

export const deleteEvent = eventId => {
    return dispatch => {
        dispatch({
            type: actions.DELETE_EVENT,
            payload: {
                eventId
            }
        })
    }
}