import React, { Component } from 'react';
import { withRouter, Route, Switch } from 'react-router-dom';
import {
  connect
} from 'react-redux';
import Layout from '../layouts/Full';
import Home from './Home';
import Spaces from './Spaces';
import InfoTypes from './InfoTypes';

class Main extends Component {
  render() {
    return (
      <Layout>
        <Switch>
          <Route component={InfoTypes} path="/infotypes" />
          <Route component={Spaces} path="/spaces" />
          <Route component={Home} path="/" />
        </Switch>
      </Layout>
    );
  }
}

const mapStateToProps = () => ({
});

const mapDispatchToProps = dispatch => ({
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
