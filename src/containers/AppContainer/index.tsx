import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from 'containers/HeaderContainer';
import Dashboard from 'DashboardContainer';
import LogoutPage from 'components/Common/LogoutPage';

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
          <Route
            exact
            path={`${process.env.PUBLIC_URL}/:studioId/:siteGroup`}
            component={Dashboard}
          />
          <Route exact path={`/logout`} component={LogoutPage} />
          <Route path={`${process.env.PUBLIC_URL}/`} component={NotFound} />
        </Switch>
      </ThemeProvider>
    </Router>
  );
};

export default App;
