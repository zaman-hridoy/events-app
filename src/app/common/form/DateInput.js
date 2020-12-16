import React, { useState } from 'react';
import DatePicker from "react-datepicker";
import { Form, Label } from 'semantic-ui-react';
import moment from 'moment';
 
import "react-datepicker/dist/react-datepicker.css";

function DateInput({ input: { onChange, value, ...restInput }, width, placeholder, meta: { touched, error }, ...rest }) {
    return (
        <Form.Field error={touched && !!error} width={width}>
            <DatePicker 
                {...rest}
                placeholderText={placeholder}
                selected={value ? moment(value).toDate() : null}
                onChange={onChange}
                {...restInput }
            />
            {touched && error && <Label color="red">{error}</Label>}
        </Form.Field>
    )
}

export default DateInput;
