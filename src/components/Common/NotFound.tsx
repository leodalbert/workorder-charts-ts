import React, { Fragment } from 'react';
import { Container, Typography } from '@material-ui/core';

const NotFound: React.FC = () => {
  return (
    <Fragment>
      <Container style={{ marginTop: 200, textAlign: 'center' }}>
        <Typography display='inline' variant='h2'>
          404
          {'      '}
        </Typography>
        <Typography display='inline' variant='h5'>
          This page could not be found.
        </Typography>
      </Container>
    </Fragment>
  );
};

export default NotFound;
