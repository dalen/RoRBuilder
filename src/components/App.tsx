// import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// Import components/containers
import Home from '../containers/Home';
import Career from '../containers/Career';
import Renown from './Renown';
import NotFound from './NotFound';

export default () => {
  return (
    <Router>
      <Switch>
        <Route path="/career/:slug/:careerSaved" component={Career} />
        <Route path="/career/:slug" exact component={Career} />
        <Route path="/renown/:slug" exact component={Renown} />
        <Route path="/renown" exact component={Renown} />
        <Route path="/" component={Home} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
};
