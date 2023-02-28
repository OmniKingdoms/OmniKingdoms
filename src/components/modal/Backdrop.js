import React from 'react';
import ReactDOM from 'react-dom';

import './Backdrop.css';

const Backdrop = props => {


  return ReactDOM.createPortal(
    <div className={props.show ? 'backdrop' : 'backdrop-close'} onClick={props.onClick} ></div>,
    document.getElementById('backdrop-hook')
  );
};

export default Backdrop;