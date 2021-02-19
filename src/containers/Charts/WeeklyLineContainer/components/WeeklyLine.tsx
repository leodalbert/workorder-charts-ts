import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Container, Theme } from '@material-ui/core';
import StackedArea from './StackedArea';
import { colorSelector } from 'utils/HelperFunctions';
import { WeeklyData } from 'selectors/workorders';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(5),
    textAlign: 'center',
    color: theme.palette.text.primary,
  },
}));

interface Props {
  weeklyData: WeeklyData;
}

const WeeklyLine: React.FC<Props> = ({ weeklyData }) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Container className={classes.title}>
        <Typography variant='h5' component='h5'>
          Weekly work orders with share of PM jobs / Weekly work orders opened
          and closed
        </Typography>
      </Container>
      <Container>
        <StackedArea
          workordersData={weeklyData.allWeeklyWorkorders}
          workordersPmData={weeklyData.weeklyPmWorkorders}
          title1={'Active work orders per week'}
          title2={'Share of PM work orders per week'}
          borderBlack={true}
        />
        <StackedArea
          workordersData={weeklyData.weeklyOpenWorkorders}
          workordersPmData={weeklyData.weeklyCompletedWorkorders}
          title1={'Weekly work orders opened'}
          title2={'Weekly work orders closed'}
          // stacked
          fill={false}
          color1={colorSelector(2)}
          color2={colorSelector(0)}
        />
      </Container>
    </div>
  );
};

export default WeeklyLine;
