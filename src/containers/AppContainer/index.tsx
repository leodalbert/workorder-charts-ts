import React, { Fragment, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getSiteGroupInfo } from 'actions/siteGroup';
import Header from 'containers/HeaderContainer';
import Dashboard from 'DashboardContainer';

//  Material Ui
import { ThemeProvider } from '@material-ui/core/styles';
import theme from './meta/theme';
import './meta/App.css';

const App: React.FC = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getSiteGroupInfo());
  }, []);
  return (
    <Fragment>
      <ThemeProvider theme={theme}>
        <Header />
        <Dashboard />
      </ThemeProvider>
    </Fragment>
  );
};

export default App;
