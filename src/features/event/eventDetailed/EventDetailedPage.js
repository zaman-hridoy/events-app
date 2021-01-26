import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Grid } from 'semantic-ui-react';
import { withFirestore } from 'react-redux-firebase';
import EventDetailedChat from './EventDetailedChat';
import EventDetailedHeader from './EventDetailedHeader';
import EventDetailedInfo from './EventDetailedInfo';
import EventDetailedSidebar from './EventDetailedSidebar';
import { goingToEvent, cancelGoingToEvent } from '../../user/userActions';
import { objectToArray } from '../../../app/common/utils/helpers';


const EventDetailedPage = ({ event, match, firestore, auth, goingToEvent, cancelGoingToEvent }) => {
    const eventId = match.params.id;
    const isHost = event?.hostUid === auth.uid;
    const attendees = event && event.attendees && objectToArray(event.attendees);
    const isGoing = attendees && attendees.some(ele => ele.id === auth.uid);
    useEffect( async () => {
            await firestore.setListener(`events/${eventId}`);
    }, [eventId]);

    useEffect(() => {
        return async () => {
            await firestore.unsetListener(`events/${eventId}`);
        }
    }, [eventId])

    return (
            <Grid>
                <Grid.Column width={10}>
                    <EventDetailedHeader 
                        event={event} 
                        isHost={isHost} 
                        isGoing={isGoing} 
                        goingToEvent={goingToEvent}
                        cancelGoingToEvent={cancelGoingToEvent}
                    />
                    <EventDetailedInfo event={event} />
                    <EventDetailedChat event={event} />
                </Grid.Column>
                <Grid.Column width={6}>
                    <EventDetailedSidebar event={event} />
                </Grid.Column>
            </Grid>
    )
}

const mapStateToProps = state => {
    let event = {};
    if(state.firestore.ordered.events && state.firestore.ordered.events[0]) {
        event = {
            ...state.firestore.ordered.events[0],
            date: state.firestore.ordered.events[0].date.toDate()
        }
    }
    return {
        event,
        auth: state.firebase.auth
    }
};

const actions = {
    goingToEvent,
    cancelGoingToEvent
}

export default withFirestore(connect(mapStateToProps, actions)(EventDetailedPage));