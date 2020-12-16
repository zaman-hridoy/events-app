import React from 'react';
import { Form, Label } from 'semantic-ui-react';

function TextInput({input, type, placeholder, meta: { touched, error }}) {
    return (
        <Form.Field error={touched && !!error}>
            <input 
                {...input} 
                type={type} 
                placeholder={placeholder}
            />
            {touched && error && <Label color="red">{error}</Label>}
        </Form.Field>
    )
}

export default TextInput;

