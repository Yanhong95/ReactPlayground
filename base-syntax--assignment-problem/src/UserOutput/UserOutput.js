import React from 'react';
import './UserOutput.css'
const userOutput = (props) => {
    return(
        <div className ='UserOutput'>
        <p>User name : {props.userName}</p>
        <p>some test2</p>
    </div>
    );
};

export default userOutput;