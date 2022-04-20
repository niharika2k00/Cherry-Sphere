

import React from 'react';
import { Spinner } from 'react-bootstrap';

const Load = () => {


    return (
        <div>
            <Spinner animation="grow" variant="danger" style={{ width: '70px', height: '70px', margin: '4rem auto', display: 'block' }}>
                <span className="sr-only" style={{ color: " black" }} >Loading...</span>
            </Spinner>
            <h4 style={{ justifyContent: "center", alignItems: "center", textAlign: "center" }} >Loading ....</h4>
        </div >
    )
}

export default Load;
