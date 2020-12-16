import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Grid } from 'semantic-ui-react';
import EventDetailedChat from './EventDetailedChat';
import EventDetailedHeader from './EventDetailedHeader';
import EventDetailedInfo from './EventDetailedInfo';
import EventDetailedSidebar from './EventDetailedSidebar';

const EventDetailedPage = ({ events, match }) => {
    const [event, setEvent] = useState(null);
    const paramsId = match.params.id;

    useEffect(() => {
        const event = events.filter(ele => ele.id === paramsId)[0];
        setEvent(event)
    }, [paramsId]);

    return (
        <Grid>
            <Grid.Column width={10}>
                <EventDetailedHeader event={event} />
                <EventDetailedInfo event={event} />
                <EventDetailedChat event={event} />
            </Grid.Column>
            <Grid.Column width={6}>
                <EventDetailedSidebar event={event} />
            </Grid.Column>
        </Grid>
    )
}

const mapStateToProps = state => ({
    events: state.events.events
});

export default connect(mapStateToProps)(EventDetailedPage);