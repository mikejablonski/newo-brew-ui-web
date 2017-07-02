import React from 'react';
import { BrowserRouter as Router } from 'react-router';

import App from './App';

const Brew = () => (
  <div>
    <h2>Brew</h2>
  </div>
)

const History = () => (
  <div>
    <h2>History</h2>
  </div>
)

export default (
  <Router path="/" component={App}>
    <Route path="brew" component={Brew}/>
    <Route path="history" component={History}/>
  </Router>
);
