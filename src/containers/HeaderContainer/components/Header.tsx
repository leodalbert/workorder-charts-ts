import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import { useParams, useHistory } from 'react-router-dom';
import { makeStyles, Theme } from '@material-ui/core/styles';
import {
  Typography,
  Toolbar,
  AppBar,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@material-ui/core';
import bimGenieLogo from 'assets/BIM_GENIE_GREEN_100p.jpg';
import { SiteGroupBuildings } from 'actions/types';

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
  buildings: SiteGroupBuildings;
  getWorkordersBySite: (
    year: string,
    studioId: number,
    siteGroup: number
  ) => void;
  getSiteGroupInfo: (studioId: number, siteGroup: number) => void;
  setBuildingFilter: (filter: string) => void;
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
const renderBuildings = (buildings: SiteGroupBuildings) => {
  return buildings.map((building) => (
    <MenuItem key={building.id} value={JSON.stringify(building.id)}>
      <Typography variant='subtitle1'>
        {`${building.number && building.number + ' '}${
          building.number && building.name && '- '
        }${building.name && building.name}`}
      </Typography>
    </MenuItem>
  ));
};

const last12 = `${dayjs()
  .subtract(1, 'year')
  .format('YYYY-MM-DD')} ${dayjs().format('YYYY-MM-DD')}`;

interface ParamTypes {
  studioId: string;
  siteGroup: string;
}

const Header: React.FC<Props> = ({
  name,
  logo,
  buildings,
  getWorkordersBySite,
  getSiteGroupInfo,
  setBuildingFilter,
}) => {
  const classes = useStyles();
  const { studioId, siteGroup } = useParams<ParamTypes>();
  const history = useHistory();

  // local state
  const [year, setYear] = useState(last12);
  const [filter, setFilter] = useState('');

  // redirect on invalid url params
  useEffect(() => {
    if (!/^\d{1,3}$/.test(siteGroup) || !/^\d{1,3}$/.test(studioId)) {
      history.push(`${process.env.PUBLIC_URL}/404`);
    }
  }, [studioId, siteGroup]);

  // get workorders by year
  useEffect(() => {
    getSiteGroupInfo(parseInt(studioId), parseInt(siteGroup));
  }, [studioId, siteGroup]);

  // set building filter
  useEffect(() => {
    if (filter) setBuildingFilter(filter);
  }, [filter]);

  const handleSelectRange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setYear(event.target.value as string);
  };

  const handleSelectFilter = (event: React.ChangeEvent<{ value: unknown }>) => {
    setFilter(event.target.value as string);
  };

  useEffect(() => {
    if (studioId && siteGroup) {
      getWorkordersBySite(year, parseInt(studioId), parseInt(siteGroup));
    }
  }, [year]);
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
          <FormControl style={{ minWidth: 300 }}>
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
          </FormControl>
          <FormControl style={{ minWidth: 300, marginLeft: 20 }}>
            <InputLabel
              id='building-filter-select-label'
              style={{ color: 'black' }}>
              Filter by building
            </InputLabel>
            <Select
              color='primary'
              variant='standard'
              labelId='year-select-label'
              label='Filter by building'
              id='year-select'
              value={filter}
              onChange={handleSelectFilter}>
              <MenuItem value={'none'}>
                <Typography component='h6' variant='h6'>
                  All
                </Typography>
              </MenuItem>
              {renderBuildings(buildings)}
            </Select>
          </FormControl>
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
