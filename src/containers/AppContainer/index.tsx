import React, { Fragment } from 'react';
import Header from 'containers/HeaderContainer';

//  Material Ui
import { ThemeProvider } from '@material-ui/core/styles';
import theme from './meta/theme';
import './meta/App.css';

const App: React.FC = () => {
  return (
    <Fragment>
      <ThemeProvider theme={theme}>
        <Header />
      </ThemeProvider>
    </Fragment>
  );
};

export default App;
