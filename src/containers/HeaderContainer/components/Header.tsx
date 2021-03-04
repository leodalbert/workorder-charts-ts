import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { Typography, Toolbar, AppBar } from '@material-ui/core';
import Filters from 'containers/FiltersContainer';
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
    // flex: 1,
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

const Header: React.FC<Props> = ({ name, logo }) => {
  const classes = useStyles();

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
          <Filters />
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
