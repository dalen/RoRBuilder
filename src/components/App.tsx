// import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// Import components/containers
import Home from '../containers/Home';
import Career from '../containers/Career';
import Renown from './Renown';
import NotFound from './NotFound';
import UnifiedPlanner from './UnifiedPlanner';
import RoRHeader from './RoRHeader';

export default () => {
  return (
    <Router>
      <RoRHeader />
      <Switch>
        <Route path="/career/:slug/:careerSaved" component={Career} />
        <Route path="/career/:slug" exact component={Career} />
        <Route path="/renown/:slug" exact component={Renown} />
        <Route path="/renown" exact component={Renown} />
        <Route path="/legacy" exact component={Home} />
        <Route
          path="/mastery"
          exact
          render={() => <UnifiedPlanner mastery />}
        />
        <Route path="/" exact component={UnifiedPlanner} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
};
