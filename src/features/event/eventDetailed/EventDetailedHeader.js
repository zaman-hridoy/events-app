import React from 'react';
import { Link } from 'react-router-dom';
import { Segment, Image, Item, Header, Button } from 'semantic-ui-react';
import { format } from 'date-fns';


const eventImageStyle = {
    filter: 'brightness(30%)'
};

const eventImageTextStyle = {
    position: 'absolute',
    bottom: '5%',
    left: '5%',
    width: '100%',
    height: 'auto',
    color: 'white'
};

export default function EventDetailedHeader({ event, isHost, isGoing, goingToEvent, cancelGoingToEvent }) {
    return (
        <Segment.Group>
        <Segment basic attached="top" style={{ padding: '0' }}>
          <Image src={`/assets/category/${event?.category}.jpg`} fluid style={eventImageStyle} />
  
          <Segment basic style={eventImageTextStyle}>
            <Item.Group>
              <Item>
                <Item.Content>
                  <Header
                    size="huge"
                    content={event?.title}
                    style={{ color: 'white' }}
                  />
                  {event.date && <p>{format(new Date(event?.date), 'PPPp')}</p>}
                  <p>
                    Hosted by <strong>{event?.hostedBy}</strong>
                  </p>
                </Item.Content>
              </Item>
            </Item.Group>
          </Segment>
        </Segment>
  
        <Segment attached="bottom">
          {!isHost && !event.cancelled && (
            <div>
              {isGoing ? <Button onClick={() => cancelGoingToEvent(event)}>Cancel My Place</Button> : <Button onClick={() => goingToEvent(event)} color="teal">JOIN THIS EVENT</Button>}
            </div>
          )}
          
          {isHost && (
            <Button as={Link} to={`/manage/${event?.id}`} color="orange">
              Manage Event
            </Button>
          )}
          
        </Segment>
      </Segment.Group>
    )
}
