import React from 'react';
import { Form, Segment, Button, Label, Divider } from 'semantic-ui-react';
import { Field, reduxForm } from 'redux-form';
import TextInput from '../../app/common/form/TextInput';
import { connect } from 'react-redux';

import { login, socialLogin } from './authActions';
import SocialLogin from './SocialLogin';

const LoginForm = ({ handleSubmit, login, error, socialLogin }) => {
  return (
    <Form size="large" onSubmit={handleSubmit(login)}>
      <Segment>
        <Field
          name="email"
          component={TextInput}
          type="text"
          placeholder="Email Address"
        />
        <Field
          name="password"
          component={TextInput}
          type="password"
          placeholder="password"
        />
        {error && <Label basic color="red" style={{ marginBottom: 10 }}>{error}</Label>}
        <Button fluid size="large" color="teal">
          Login
        </Button>
        <Divider horizontal>
            Or
        </Divider>
        <SocialLogin socialLogin={socialLogin} />
      </Segment>
    </Form>
  );
};

const actions = {
   login,
   socialLogin
}

export default connect(null, actions)(reduxForm({ form: 'loginForm' })(LoginForm));
