import React, { Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Tabs, Tab, Box, Theme } from '@material-ui/core';
// import AssgDept from 'containers/Charts/AssgDeptContainer';
// import CompletionTime from 'containers/Charts/CompletionTimeContainer';
// import TradeType from 'containers/Charts/TradeTypeContainer';
// import WeeklyLine from 'containers/Charts/WeeklyLineContainer';
import Spinner from 'components/Common/Spinner';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    marginTop: '65px',
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.black,
  },
}));

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}
interface Props {
  loading: boolean;
}

const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`chart-tabpanel-${index}`}
      aria-labelledby={`chart-tab-${index}`}
      {...other}>
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
};

function a11yProps(index: number) {
  return {
    id: `chart-tab-${index}`,
    'aria-controls': `chart-tabpanel-${index}`,
  };
}

const Dashboard: React.FC<Props> = ({ loading }) => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <Paper className={classes.root} elevation={2}>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor='primary'
          textColor='inherit'
          centered
          variant='fullWidth'>
          <Tab label='work orders by trade' {...a11yProps(0)} />
          <Tab label='Work orders by request type' {...a11yProps(1)} />
          <Tab label='Completion Time' {...a11yProps(2)} />
          <Tab
            label='Work orders with PM jobs / Open Vs Completed'
            {...a11yProps(3)}
          />
        </Tabs>
      </Paper>
      <TabPanel value={value} index={0}>
        {
          // <AssgDept />
        }
      </TabPanel>
      <TabPanel value={value} index={1}>
        {
          // <TradeType />
        }
      </TabPanel>
      <TabPanel value={value} index={2}>
        {
          // <CompletionTime />
        }
      </TabPanel>
      <TabPanel value={value} index={3}>
        {
          // <WeeklyLine />
        }
      </TabPanel>
    </Fragment>
  );
};

export default Dashboard;
