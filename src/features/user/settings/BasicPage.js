import React, {Component} from 'react';
import {Segment, Form, Header, Divider, Button} from 'semantic-ui-react';
import {Field, reduxForm} from 'redux-form';
import DateInput from "../../../app/common/form/DateInput";
import TextInput from "../../../app/common/form/TextInput";
import RadioInput from "../../../app/common/form/RadioInput";
import moment from 'moment';

class BasicPage extends Component {

    render() {
        const { pristine, submitting, updateProfile, handleSubmit } = this.props;
        return (
            <Segment>
                <Header dividing size='large' content='Basics' />
                <Form onSubmit={handleSubmit(updateProfile)}>
                    <Field
                        width={8}
                        name='displayName'
                        type='text'
                        component={TextInput}
                        placeholder='Known As'
                    />
                    <Form.Group inline>
                      <Field 
                        name="gender"
                        type="radio"
                        value="male"
                        label="Male"
                        component={RadioInput}
                      />
                      <Field 
                        name="gender"
                        type="radio"
                        value="female"
                        label="Female"
                        component={RadioInput}
                      />
                    </Form.Group>
                    <Field
                        width={8}
                        name='dateOfBirth'
                        component={DateInput}
                        dateFormat='yyyy/MM/dd'
                        showYearDropdown={true}
                        showMonthDropdown={true}
                        dropdownMode="select"
                        placeholder='Date of Birth'
                        // maxDate={moment().subtract(18, 'years')}
                    />
                    <Field
                        name='city'
                        placeholder='Home Town'
                        type="text"
                        component={TextInput}
                        width={8}
                    />
                    <Divider/>
                    <Button disabled={pristine || submitting} size='large' positive content='Update Profile'/>
                </Form>
            </Segment>
        );
    }
}

export default reduxForm({form: 'userProfile', enableReinitialize: true, destroyOnUnmount: false})(BasicPage);