import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import ScrollToTop from './ScrollToTop';

import { BrowserRouter } from 'react-router-dom';

import registerServiceWorker from './registerServiceWorker';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
// Put any other imports below so that CSS from your
// components takes precedence over default styles.
import './index.css';

ReactDOM.render(<BrowserRouter><ScrollToTop><App /></ScrollToTop></BrowserRouter>, document.getElementById('root'));
registerServiceWorker();
