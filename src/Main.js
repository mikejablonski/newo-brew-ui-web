import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Brew from './Brew';
import BrewHistory from './BrewHistory';

class Main extends Component {  
  render() {
    return (
        <div>
            <Switch>
                <Route exact path='/' component={Brew}/>
                <Route path='/brew' component={Brew}/>
                <Route path='/history' component={BrewHistory}/>
            </Switch>
        </div>
    );
  }
}
export default Main;
