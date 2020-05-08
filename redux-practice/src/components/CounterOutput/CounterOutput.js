import React from 'react';

import './CounterOutput.css';

const counterOutput = (props) => (
    <div className="CounterOutput">
        Current Counter: {props.value} (those actions will multiple by 2 in reducer)
    </div>
);

export default counterOutput;