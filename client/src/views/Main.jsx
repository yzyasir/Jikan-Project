import React from 'react';

const Main = (props) => {
    
    const {logged} = props;
    
    return (
        <div>
            <h2>Welcome {logged.firstName} {logged.lastName}</h2>
        
        </div>
    )
}

export default Main;