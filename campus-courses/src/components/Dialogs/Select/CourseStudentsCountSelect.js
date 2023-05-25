import React from 'react';
import Form from 'react-bootstrap/Form';

const CourseStudentsCountSelect = ({options, defaultValue, value, onChange}) => {
    return (
        <Form.Select
            value={value}
            onChange={event => onChange(event.target.value)}
        >
            <option disabled value=''>{defaultValue}</option>
            {options.map((option)=>
                <option value={option} key={option}>
                    {option}
                </option>
            )}
        </Form.Select>
    );
}

export default CourseStudentsCountSelect;

