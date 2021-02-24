import React from 'react';
import { Bar } from 'react-chartjs-2';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Container, Theme } from '@material-ui/core';
import { DataItem } from 'selectors/workorders';

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

const genData = (data: DataItem[]) => {
  return {
    labels: [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ],
    datasets: data,
  };
};

const options = {
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
        },
        // type: 'logarithmic',
      },
    ],
  },
};

interface Props {
  assignedDepartmentData: DataItem[];
}

const AssgDept: React.FC<Props> = ({ assignedDepartmentData }) => {
  console.log(assignedDepartmentData);
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Container className={classes.title}>
        <Typography variant='h5' component='h5'>
          Monthly work orders by assigned trade
        </Typography>
      </Container>
      <Container>
        <Bar data={genData(assignedDepartmentData)} options={options} />
      </Container>
    </div>
  );
};

export default AssgDept;
