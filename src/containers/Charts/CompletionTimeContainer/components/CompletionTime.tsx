import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  Container,
  Theme,
} from '@material-ui/core';
import { Doughnut } from 'react-chartjs-2';
import { colorSelector } from 'utils/HelperFunctions';
import { SetFilterEvent } from 'actions/types';

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
  selectorCtnr: {
    marginTop: '5vh',
  },
  formControl: {
    margin: theme.spacing(3),
    paddingRight: theme.spacing(5),
  },
  doughnutCtrn: {
    display: 'flex',
    justifyContent: 'spaceAround',
  },
}));

const genData = (outerData: number[], innerData: number[]) => {
  return {
    labels: [
      'Less than one week',
      'Less than one month',
      'More than one month',
    ],
    datasets: [
      {
        label: 'Outer',
        data: outerData,
        backgroundColor: [colorSelector(1), colorSelector(9), colorSelector(2)],
        borderColor: 'white',
        borderWidth: 1,
      },
      {
        label: 'Inner',
        data: innerData,
        backgroundColor: [colorSelector(1), colorSelector(9), colorSelector(2)],
        borderColor: 'white',
        borderWidth: 1,
      },
    ],
  };
};

const renderRequestTypes = (requestTypes: string[]) => {
  return requestTypes.map((requestType) => (
    <MenuItem key={requestType} value={requestType}>
      Request Type: {requestType === '' ? 'Not Specified' : requestType}
    </MenuItem>
  ));
};

interface Props {
  outerData: number[];
  innerData: number[];
  requestTypes: string[];
  outerFilter: string;
  innerFilter: string;
  setDoughnutFilter: (e: SetFilterEvent) => void;
}

const CompletionTime: React.FC<Props> = ({
  outerData,
  innerData,
  requestTypes,
  outerFilter,
  innerFilter,
  setDoughnutFilter,
}) => {
  const classes = useStyles();

  const handleChange = (event: React.ChangeEvent<SetFilterEvent>) => {
    setDoughnutFilter(event.target);
  };

  return (
    <div className={classes.root}>
      <Container className={classes.title}>
        <Typography variant='h5' component='h5'>
          Completion time for work orders by request type
        </Typography>
      </Container>
      <Grid container spacing={3}>
        <Grid
          item
          xs={12}
          md={8}
          style={{ display: 'flex', justifyContent: 'center' }}>
          <div style={{ width: '60%' }}>
            <Doughnut
              data={genData(outerData, innerData)}
              options={{
                cutoutPercentage: 60,
                rotation: 1 * Math.PI,
                circumference: 1 * Math.PI,
              }}
            />
          </div>
        </Grid>
        <Grid item xs={12} md={4} className={classes.selectorCtnr}>
          <FormControl fullWidth className={classes.formControl}>
            <InputLabel id='outer-data-select-label'>Outer Data</InputLabel>
            <Select
              labelId='outer-data-select-label'
              id='outer-data-select'
              name={'outer'}
              value={outerFilter}
              onChange={handleChange}>
              <MenuItem value={'all'}>All Workorders</MenuItem>
              {renderRequestTypes(requestTypes)}
            </Select>
            <Typography style={{ marginTop: 20 }}>
              Total: {outerData[0] + outerData[1] + outerData[2]}
            </Typography>
          </FormControl>
          <FormControl fullWidth className={classes.formControl}>
            <InputLabel id='inner-data-select-label'>Inner Data</InputLabel>
            <Select
              labelId='inner-data-select-label'
              id='inner-data-select'
              value={innerFilter}
              name={'inner'}
              onChange={handleChange}>
              <MenuItem value={'urgent'}>Urgent Priority Workorders</MenuItem>
              {renderRequestTypes(requestTypes)}
            </Select>
            <Typography style={{ marginTop: 20 }}>
              Total: {innerData[0] + innerData[1] + innerData[2]}
            </Typography>
          </FormControl>
        </Grid>
      </Grid>
    </div>
  );
};

export default CompletionTime;
