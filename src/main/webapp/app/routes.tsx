import React from 'react';
import { Switch, useLocation } from 'react-router-dom';
import Loadable from 'react-loadable';

import Login from 'app/modules/login/login';
import Logout from 'app/modules/login/logout';
import Home from 'app/modules/home/home';
import Entities from 'app/entities';
import PrivateRoute from 'app/shared/auth/private-route';
import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';
import PageNotFound from 'app/shared/error/page-not-found';
import { AUTHORITIES } from 'app/config/constants';
import { sendActivity } from 'app/config/websocket-middleware';

const Admin = Loadable({
  loader: () => import(/* webpackChunkName: "administration" */ 'app/modules/administration'),
  loading: () => <div>loading ...</div>,
});

const Routes = () => {
  const location = useLocation();
  React.useEffect(() => {
    sendActivity(location.pathname);
  }, [location]);
  return (
    <div className="view-routes">
      <Switch>
        <ErrorBoundaryRoute path="/login" component={Login} />
        <ErrorBoundaryRoute path="/logout" component={Logout} />
        <PrivateRoute path="/admin" component={Admin} hasAnyAuthorities={[AUTHORITIES.ADMIN]} />
        <ErrorBoundaryRoute path="/" exact component={Home} />
        <PrivateRoute path="/" component={Entities} hasAnyAuthorities={[AUTHORITIES.USER]} />
        <ErrorBoundaryRoute component={PageNotFound} />
      </Switch>
    </div>
  );
};

export default Routes;
