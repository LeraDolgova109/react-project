import React from 'react';
import Form from 'react-bootstrap/Form';

const UserSelect = ({options, defaultValue, value, onChange}) => {
    return (
      <Form.Select
          value={value}
          onChange={event => onChange(event.target.value)}
      >
          <option disabled value=''>{defaultValue}</option>
          {options.map(option=>
            <option value={option.id} key={option.id}>
                {option.fullName}
            </option>
          )}
      </Form.Select>
    );
}

export default UserSelect;