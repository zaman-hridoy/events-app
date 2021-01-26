import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { withFirestore } from 'react-redux-firebase';
import cuid from 'cuid';
import moment from 'moment';
import { Segment, Form, Button, Grid, Header } from 'semantic-ui-react';
import { composeValidators, combineValidators, isRequired, hasLengthGreaterThan } from 'revalidate';
import { cancelToggle, createEvent, updateEvent } from '../eventActions';

import TextInput from '../../../app/common/form/TextInput';
import TextArea from '../../../app/common/form/TextArea';
import SelectInput from '../../../app/common/form/SelectInput';
import DateInput from '../../../app/common/form/DateInput';


const category = [
  {key: 'drinks', text: 'Drinks', value: 'drinks'},
  {key: 'culture', text: 'Culture', value: 'culture'},
  {key: 'film', text: 'Film', value: 'film'},
  {key: 'food', text: 'Food', value: 'food'},
  {key: 'music', text: 'Music', value: 'music'},
  {key: 'travel', text: 'Travel', value: 'travel'},
];


const validate = combineValidators({
  title: isRequired({message: "The event title is required"}),
  category: isRequired({ message: 'Please provide a category' }),
  description: composeValidators(
    isRequired({message: 'Please enter a description'}),
    hasLengthGreaterThan(4)({message: 'Description needs to be at least 5 characters'})
  )(),
  city: isRequired('city'),
  venue: isRequired('venue'),
  date: isRequired('date')
})

class EventForm extends Component {

    async componentDidMount() {
        const { firestore, match } = this.props;
        await firestore.setListener(`events/${match.params.id}`);
    }

    async componentWillUnmount() {
      const { firestore, match } = this.props;
      await firestore.unsetListener(`events/${match.params.id}`);
  }

    onSubmitHandler = values => {
        const newData = {
          ...values,
          date: moment(values.date).format()
        }
      if(this.props.initialValues.id) {
        this.props.updateEvent(newData);
        this.props.history.goBack();
      } else {
        this.props.createEvent(values);
        this.props.history.push('/events');
      }
    }

    render() {
        const { invalid, submitting, pristine, event, cancelToggle } = this.props;
        return (
            <Grid>
                <Grid.Column width={10}>
                  <Segment>
                    <Header sub color="teal" content="Event Details" />

                    <Form onSubmit={this.props.handleSubmit(this.onSubmitHandler)}>
                      <Field 
                          name="title"
                          type="text"
                          component={TextInput}
                          placeholder="Give your event a name"
                      />

                      <Field 
                          name="category"
                          component={SelectInput}
                          options={category}
                          multiple={false}
                          placeholder="What is your event about?"
                      />

                      <Field 
                          name="description"
                          component={TextArea}
                          rows={3}
                          placeholder="Tell as about your event"
                      />

                      <Header sub color="teal" content="Event Location" />
                      <Field 
                          name="city"
                          type="text"
                          component={TextInput}
                          placeholder="Event City"
                      />

                      <Field 
                          name="venue"
                          type="text"
                          component={TextInput}
                          placeholder="Event Venue"
                      />
                      <Field 
                          name="date"
                          component={DateInput}
                          dateFormat='yyyy/MM/dd HH:mm'
                          showTimeSelect
                          placeholder="Date and Time of event"
                          width="10"
                      />

                      <Button disabled={invalid || submitting || pristine} positive type="submit">Submit</Button>
                      <Button onClick={this.props.history.goBack} type="button">Cancel</Button>
                      <Button 
                        onClick={() => cancelToggle(!event?.cancelled, event.id)}
                        type="button"
                        color={event?.cancelled ? 'green' : 'red'}
                        floated="right"
                        content={event?.cancelled ? 'Reactivate Event' : 'Cancel Event'}
                      />
                    </Form>
                  </Segment>
                </Grid.Column>
            </Grid>
        )
    }
}

const mapSateToProps = (state) => {
  let event = {};
  if(state.firestore.ordered.events && state.firestore.ordered.events[0]) {
    event = {
      ...state.firestore.ordered.events[0],
      date: state.firestore.ordered.events[0].date.toDate()
    };
  }
  return {
    initialValues: event,
    event
  }
};

const actions = {
  createEvent,
  updateEvent,
  cancelToggle
}

export default withFirestore(connect(mapSateToProps, actions)(reduxForm({
  form: 'eventForm', 
  enableReinitialize: true,
  validate
})(EventForm)));