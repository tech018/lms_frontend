import React from 'react';
import { Spinner } from 'react-bootstrap';

const Loader = ({isLoading}) => {
  if(!isLoading) return null;
  return (
    <div id="loader" className="d-flex justify-content-center align-items-center flex-column">
     <Spinner animation="grow" />
    </div>
  )
}

export default Loader
