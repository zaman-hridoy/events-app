import React from 'react';
import { Form, Label, Select } from 'semantic-ui-react';

function SelectInput({ input, placeholder, multiple, options, meta: { touched, error } }) {

    // const isMultiple = () => {
    //     const data = [];
    //     if(multiple && !!input.value) {
    //         return data.concat(input.value)
    //     }
    //     return data;
    // }

    return (
        <Form.Field error={touched && !!error}>
            <Select 
                value={input.value || null}
                options={options}
                placeholder={placeholder}
                onChange={(e, data) => input.onChange(data.value)}
                multiple={multiple}
            />
            {touched && error && <Label color="red">{error}</Label>}
        </Form.Field>
    )
}

export default SelectInput
