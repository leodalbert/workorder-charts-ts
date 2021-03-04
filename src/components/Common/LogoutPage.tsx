import React, { Fragment } from 'react';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import { Container, Typography } from '@material-ui/core';

const LogoutPage: React.FC = () => {
  return (
    <Fragment>
      <Container style={{ marginTop: 200, textAlign: 'center' }}>
        <Typography variant='subtitle1'>
          <ErrorOutlineIcon /> You don't have access to the charts of this
          site/campus. Please use the chart button in your site/campus to access
          the charts or contact Onuma to request access.
        </Typography>
      </Container>
    </Fragment>
  );
};

export default LogoutPage;
