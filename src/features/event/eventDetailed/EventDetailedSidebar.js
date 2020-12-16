import React from 'react';
import { Segment, List, Item, Label, Image } from 'semantic-ui-react';

export default function EventDetailedSidebar({ event }) {
    return (
        <div>
        <Segment
          textAlign="center"
          style={{ border: 'none' }}
          attached="top"
          secondary
          inverted
          color="teal"
        >
          {event?.attendees?.length} {event?.attendees?.length > 1 ? "Peoples" : "People"} Going
        </Segment>
        <Segment attached>
            <List selection verticalAlign='middle'>
                {event?.attendees?.map(item => (
                    <List.Item style={{ position: 'relative' }} key={item?.id}>
                        <Label
                            style={{ position: 'absolute' }}
                            color="orange"
                            ribbon="right"
                        >
                            Host
                        </Label>
                        <Image avatar src={item?.photoURL} />
                        <List.Content>
                            <List.Header>{item?.name}</List.Header>
                        </List.Content>
                    </List.Item>
                ))}
            </List>
          {/* <List relaxed divided>
            <Item style={{ position: 'relative' }}>
              <Label
                style={{ position: 'absolute' }}
                color="orange"
                ribbon="right"
              >
                Host
              </Label>
                <Item.Image size="tiny" src="/assets/img/user.png" />
                <Item.Content verticalAlign="middle">
                    <Item.Header as="h3">
                    <a>Attendee Name</a>
                    </Item.Header>
                </Item.Content>
            </Item>
          </List> */}
        </Segment>
      </div>
    )
}
