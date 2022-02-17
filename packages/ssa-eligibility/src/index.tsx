/* eslint-disable import/no-extraneous-dependencies */
import '@fortawesome/fontawesome-free/css/all.min.css';
import '@trussworks/react-uswds/lib/index.css';
import '@trussworks/react-uswds/lib/uswds.css';
import './index.css';
import React    from 'react';
import ReactDOM from 'react-dom';
import { App }  from './App';

ReactDOM.render(
  <React.StrictMode>
    <App url={'/jsonapi/question/eligibility'} />
  </React.StrictMode>,
  document.getElementById('root'),
);
