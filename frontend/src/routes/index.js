import React, { Fragment } from 'react';

import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import SignIn from '../pages/signIn';
import SignUp from '../pages/signUp';
import Dashboard from '../pages/dashboard';
import Preferences from '../pages/preferences';
import history from './history';
import Header from '../components/Header';
import MeetupDetails from '../pages/meetupDetails';
import Search from '../pages/search';
import Profile from '../pages/profile';
import NewMeetup from '../pages/newMeetup';
import ErrorBox from '../components/ErrorBox';

// const ProtectedRoute = ({ isAllowed, ...props }) => (isAllowed ? <Route {...props} /> : <Redirect to="/signin" />);

const PrivateRoute = ({
  component: Component,
  beforeComponent: Before,
  afterComponent: After,
  isAllowed,
  ...rest
}) => (
  <Route
    {...rest}
    render={props => (isAllowed ? (
      <Fragment>
        <Header />
        <ErrorBox />
        {Before ? <Before /> : null}
        <Component {...props} />
        {After ? <After /> : null}
      </Fragment>
    ) : (
      <Redirect to={{ pathname: '/signin', from: props.location }} />
    ))
    }
  />
);

const Routes = ({ isAuthenticated }) => (
  <ConnectedRouter history={history}>
    <Switch>
      <Route path="/signin" component={SignIn} />
      <Route path="/signup" component={SignUp} />
      <PrivateRoute exact path="/" component={Dashboard} isAllowed={isAuthenticated} />
      <PrivateRoute path="/preferences" component={Preferences} isAllowed={isAuthenticated} />
      <PrivateRoute path="/profile" component={Profile} isAllowed={isAuthenticated} />
      <PrivateRoute path="/new" component={NewMeetup} isAllowed={isAuthenticated} />
      <PrivateRoute path="/meetups/:id" component={MeetupDetails} isAllowed={isAuthenticated} />
      <PrivateRoute
        exact
        path="/search"
        beforeComponent={Search}
        component={Dashboard}
        isAllowed={isAuthenticated}
      />
    </Switch>
  </ConnectedRouter>
);

const mapStateToProps = state => ({
  isAuthenticated: !!state.auth.token,
});

export default connect(mapStateToProps)(Routes);
