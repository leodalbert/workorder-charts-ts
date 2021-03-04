import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from 'containers/HeaderContainer';
import Dashboard from 'DashboardContainer';
import LogoutPage from 'components/Common/LogoutPage';
import PrivateRoute from 'components/Common/PrivateRoute';

//  Material Ui
import { ThemeProvider } from '@material-ui/core/styles';
import theme from './meta/theme';
import './meta/App.css';
import NotFound from 'components/Common/NotFound';

const App: React.FC = () => {
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <Route
          path={`${process.env.PUBLIC_URL}/:studioId?/:siteGroup?`}
          component={Header}
        />
        <Switch>
          <PrivateRoute
            exact
            path={`${process.env.PUBLIC_URL}/:studioId/:siteGroup`}
            component={Dashboard}
          />

          <Route
            exact
            path={`${process.env.PUBLIC_URL}/logout`}
            component={LogoutPage}
          />
          <Route path={`${process.env.PUBLIC_URL}/`} component={NotFound} />
        </Switch>
      </ThemeProvider>
    </Router>
  );
};

export default App;
