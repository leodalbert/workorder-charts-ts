import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import { Container, Typography } from '@material-ui/core';
import { Route, RouteProps } from 'react-router';
import { RootState } from 'reducers';

const PrivateRoute: React.FC<RouteProps> = (props) => {
  const notAuthorized = useSelector(
    (state: RootState) => state.workorders.notAuthorized
  );
  return !notAuthorized ? (
    <Route {...props} component={props.component} />
  ) : (
    <Fragment>
      <Container style={{ marginTop: 200, textAlign: 'center' }}>
        <Typography variant='subtitle1'>
          <ErrorOutlineIcon /> You don't have access to the charts of this
          site/campus.
        </Typography>
        <Typography variant='subtitle2'>
          Please use the chart button in your site/campus to access the charts
          or contact Onuma to request access.
        </Typography>
      </Container>
    </Fragment>
  );
};

export default PrivateRoute;
