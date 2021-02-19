import React, { Fragment } from 'react';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import { Container, Typography } from '@material-ui/core';

const LogoutPage: React.FC = () => {
  return (
    <Fragment>
      <Container style={{ marginTop: 200, textAlign: 'center' }}>
        <Typography variant='subtitle1'>
          <ErrorOutlineIcon /> Oops - something didn't work correctly! You were
          logged out.
        </Typography>
        <Typography variant='body2'>
          If this problem persists, plese contact us!
        </Typography>
      </Container>
    </Fragment>
  );
};

export default LogoutPage;
