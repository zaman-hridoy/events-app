import React, { Component } from 'react';
import { Segment, Item, Icon, List, Button, Label } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';

import Attendee from './Attendee';

import { objectToArray } from '../../../app/common/utils/helpers';

class EventListItem extends Component {
    render() {
        const { event } = this.props;
        return (
            <Segment.Group>
                <Segment>
                <Item.Group>
                    <Item>
                    <Item.Image size="tiny" circular src={event?.hostPhotoURL} />
                    <Item.Content>
                        <Item.Header as={Link} to={`/event/${event.id}`}>{event?.title}</Item.Header>
                        <Item.Description>
                        Hosted by <Link to={`/profile/${event.hostUid}`}>{event?.hostedBy}</Link>
                        </Item.Description>
                        {event?.cancelled && <Label style={{top: '-40px'}} ribbon="right" color="red" content="This event has been cancelled" />}
                    </Item.Content>
                    </Item>
                </Item.Group>
                </Segment>
                <Segment>
                <span>
                    <Icon name="clock" /> {format(new Date(event.date.toDate()), 'PPPp')}
                    <Icon name="marker" /> {event?.venue}
                </span>
                </Segment>
                <Segment secondary>
                <List horizontal>
                    {event && event?.attendees && objectToArray(event?.attendees).map((attendee) => (
                        <Attendee key={attendee.id} attendee={attendee} />
                    ))}
                </List>
                </Segment>
                <Segment clearing>
                <span>{event?.description}</span>
                <Button as={Link} to={`/event/${event.id}`} color="teal" floated="right" content="View" />
                </Segment>
          </Segment.Group>
        )
    }
}

export default EventListItem;