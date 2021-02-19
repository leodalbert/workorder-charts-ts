import React, { useState } from 'react';
import dayjs from 'dayjs';
import { makeStyles, Theme } from '@material-ui/core/styles';
import {
  Typography,
  Toolbar,
  AppBar,
  Select,
  MenuItem,
} from '@material-ui/core';
import bimGenieLogo from 'assets/BIM_GENIE_GREEN_100p.jpg';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
  },
  bimLogo: {
    flex: 1,
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  selectCtnr: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    maxWidth: 330,
  },

  navbarContainer: {
    backgroundColor: theme.palette.common.white,
    display: 'flex',
  },
  navbarLogo: {
    height: 65,
    widht: 65,
  },
  navbarTitleContainer: {
    flex: 1,
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    minWidth: 290,
  },
  navbarTitle: {
    textAlign: 'left',
    paddingLeft: theme.spacing(3),
  },
}));

interface Props {
  name: string;
  logo: string;
}

const renderYears = () => {
  const years = [];
  for (let y = dayjs().year() - 1; y > 2014; y--) {
    years.push(y);
  }
  return years.map((year) => (
    <MenuItem key={year} value={`${year}-01-01 ${year + 1}-01-01`}>
      <Typography component='h6' variant='h6'>
        {`Display data from: ${year}`}
      </Typography>
    </MenuItem>
  ));
};

const last12 = `${dayjs()
  .subtract(1, 'year')
  .format('YYYY-MM-DD')} ${dayjs().format('YYYY-MM-DD')}`;

const Header: React.FC<Props> = ({ name, logo }) => {
  const classes = useStyles();
  const [year, setYear] = useState(last12);

  const handleSelectRange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setYear(event.target.value as string);
  };

  return (
    <AppBar position='fixed'>
      <Toolbar classes={{ root: classes.navbarContainer }}>
        <div className={classes.navbarTitleContainer}>
          {logo && (
            <img
              src={logo}
              alt='site-group-logo'
              className={classes.navbarLogo}
            />
          )}
          {name && (
            <Typography
              style={{ textDecoration: 'inherit' }}
              component='h6'
              variant='h6'
              className={classes.navbarTitle}>
              {name}
            </Typography>
          )}
        </div>
        <div className={classes.selectCtnr}>
          <Select
            color='primary'
            variant='outlined'
            labelId='year-select-label'
            id='year-select'
            value={year}
            onChange={handleSelectRange}>
            <MenuItem value={last12}>
              <Typography component='h6' variant='h6'>
                Display data from: Past 12 months
              </Typography>
            </MenuItem>
            {renderYears()}
          </Select>
        </div>
        <div className={classes.bimLogo}>
          <img
            src={bimGenieLogo}
            alt='bim-genie-logo'
            className={classes.navbarLogo}
          />
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
