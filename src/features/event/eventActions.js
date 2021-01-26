import { toastr } from 'react-redux-toastr';
import * as actions from './eventConstants';
import { createNewEvent } from '../../app/common/utils/helpers';
import moment from 'moment';

export const createEvent = event => {
    return async (dispatch, getState, { getFirebase,getFirestore }) => {
        const firebase = getFirebase();
        const firestore = getFirestore();
        const user = firebase.auth().currentUser;
        const photoURL = getState().firebase.profile.photoURL;
        let newEvent = createNewEvent(user, photoURL, event);
        try {
            let createdEvent = await firestore.add(`events`, newEvent);
            console.log(createdEvent);
            await firestore.set(`event_attendee/${createdEvent.id}_${user.uid}`, {
                eventId: createdEvent.id,
                userId: user.uid,
                eventDate: event.date,
                host: true
            });
            toastr.success('Success!', "Event has been created")
        } catch (err) {
            console.log(err);
            toastr.error('Oops!', "Something went wrong")
        }
    }
}

export const updateEvent = event => {
    return async (dispatch, getState, { getFirestore }) => {
        const firestore = getFirestore();
        if(event.date !== getState().firestore.ordered.events[0].date) {
            event.date = moment(event.date).toDate();
        }
        try {
            await firestore.update(`events/${event.id}`, event);
            toastr.success('Success!', 'Event has been updated');
        } catch (err) {
            console.log(err);
            toastr.error('Oops!', "Something went wrong")
        }
    }
}

export const cancelToggle = (cancelled, eventId) => {
    return async (dispatch, getState, { getFirebase, getFirestore }) => {
        const firestore = getFirestore();
        const message = cancelled ? 'Are you sure want to cancel the event?' : 'This will reactivate the event - are you sure?';
        try {
            toastr.confirm(message, {
                onOk: async () => await firestore.update(`events/${eventId}`, {
                    cancelled: cancelled
                })
            })
            
        }catch (err) {
            console.log(err);
        }
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