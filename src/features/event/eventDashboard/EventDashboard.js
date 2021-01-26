import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';
import { firestoreConnect, isLoaded, isEmpty } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { compose } from 'redux';
import EventActivity from '../eventActivity/EventActivity';
import LoadingComponent from '../../../app/common/LoadingComponent';

import { 
  deleteEvent
} from '../eventActions';

import EventList from '../eventList/EventList';

// const eventsData = [
//     {
//       id: '1',
//       title: 'Trip to Tower of London',
//       date: '2018-03-27',
//       category: 'culture',
//       description:
//         'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sollicitudin ligula eu leo tincidunt, quis scelerisque magna dapibus. Sed eget ipsum vel arcu vehicula ullamcorper.',
//       city: 'London, UK',
//       venue: "Tower of London, St Katharine's & Wapping, London",
//       hostedBy: 'Bob',
//       hostPhotoURL: 'https://randomuser.me/api/portraits/men/20.jpg',
//       attendees: [
//         {
//           id: 'a',
//           name: 'Bob',
//           photoURL: 'https://randomuser.me/api/portraits/men/20.jpg'
//         },
//         {
//           id: 'b',
//           name: 'Tom',
//           photoURL: 'https://randomuser.me/api/portraits/men/22.jpg'
//         }
//       ]
//     },
//     {
//       id: '2',
//       title: 'Trip to Punch and Judy Pub',
//       date: '2018-03-28',
//       category: 'drinks',
//       description:
//         'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sollicitudin ligula eu leo tincidunt, quis scelerisque magna dapibus. Sed eget ipsum vel arcu vehicula ullamcorper.',
//       city: 'London, UK',
//       venue: 'Punch & Judy, Henrietta Street, London, UK',
//       hostedBy: 'Tom',
//       hostPhotoURL: 'https://randomuser.me/api/portraits/men/22.jpg',
//       attendees: [
//         {
//           id: 'b',
//           name: 'Tom',
//           photoURL: 'https://randomuser.me/api/portraits/men/22.jpg'
//         },
//         {
//           id: 'a',
//           name: 'Bob',
//           photoURL: 'https://randomuser.me/api/portraits/men/20.jpg'
//         }
//       ]
//     }
//   ]

class EventDashboard extends Component {

    handleDeleteEvent = eventId => {
      this.props.deleteEvent(eventId);
    }

    render() {
        const { events } = this.props;
        if(!isLoaded(events) || isEmpty(events)) return <LoadingComponent />
        return (
            <Grid>
                <Grid.Column width={10}>
                    <EventList 
                      events={events}
                      handleDeleteEvent={this.handleDeleteEvent}
                    />
                </Grid.Column>
                
                <Grid.Column width={6}>
                    <EventActivity />
                </Grid.Column>
            </Grid>
        )
    }
}

const mapStateToProps = state => ({
  events: state.firestore.ordered.events
});

const actions = {
  deleteEvent
}

const enhance = compose(
  firestoreConnect([{collection: 'events'}]),
  connect(mapStateToProps, actions)
)

export default enhance(EventDashboard);