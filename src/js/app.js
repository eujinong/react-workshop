import React, { Component } from 'react';
import {
  connect
} from 'react-redux';
import {
  bindActionCreators
} from 'redux';
import {
  Router, Route, Switch
} from 'react-router-dom';
import { hot } from 'react-hot-loader';

import history from './history';
import Main from './scenes/Main';

class App extends Component {
  render() {
    return (
      <Router history={history} onUpdate={() => { window.scrollTo(0, 0); }}>
        <Switch>
          <Route path="/" name="Main" component={Main} />
        </Switch>
      </Router>
    );
  }
}

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch => ({
});

export default hot(module)(connect(mapStateToProps, mapDispatchToProps)(App));
