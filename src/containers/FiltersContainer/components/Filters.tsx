import React, { useState, useEffect, Fragment } from 'react';
import dayjs from 'dayjs';
import { useParams, useHistory } from 'react-router-dom';
import {
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  IconButton,
  Menu,
} from '@material-ui/core';
import { SiteGroupBuildings, SiteGroupBuilding } from 'actions/types';
import CalendarIcon from 'assets/CalendarIcon';
import BuildingIcon from 'assets/BuildingIcon';

interface Props {
  buildings: SiteGroupBuildings;
  getWorkordersBySite: (
    year: string,
    studioId: number,
    siteGroup: number
  ) => void;
  getSiteGroupInfo: (studioId: number, siteGroup: number) => void;
  setBuildingFilter: (filter: string) => void;
}

const last12 = `${dayjs()
  .subtract(1, 'year')
  .format('YYYY-MM-DD')} ${dayjs().format('YYYY-MM-DD')}`;

const buildingString = (building: SiteGroupBuilding) =>
  `${building.number && building.number + ' '}${
    building.number && building.name && '- '
  }${building.name && building.name}`;

interface ParamTypes {
  studioId: string;
  siteGroup: string;
}

const Filters: React.FC<Props> = ({
  buildings,
  getWorkordersBySite,
  getSiteGroupInfo,
  setBuildingFilter,
}) => {
  const { studioId, siteGroup } = useParams<ParamTypes>();
  const history = useHistory();

  // local state
  const [year, setYear] = useState([last12, 'Past 12 months']);
  const [filter, setFilter] = useState(['none', 'All']);
  const [yearAnchor, setYearAnchor] = React.useState<null | HTMLElement>(null);
  const [filterAnchor, setFilterAnchor] = React.useState<null | HTMLElement>(
    null
  );

  const renderYears = () => {
    const years = [];
    for (let y = dayjs().year() - 1; y > 2014; y--) {
      years.push(y);
    }
    return years.map((year) => (
      <MenuItem
        key={year}
        onClick={() =>
          handleSelectRange([
            `${year}-01-01 ${year + 1}-01-01`,
            JSON.stringify(year),
          ])
        }>
        <Typography component='h6' variant='h6'>
          {year}
        </Typography>
      </MenuItem>
    ));
  };

  const renderBuildings = () => {
    return (
      buildings &&
      buildings.map((building) => {
        const buildingStr = buildingString(building);
        return (
          <MenuItem
            key={building.id}
            onClick={() =>
              handleSelectFilter([JSON.stringify(building.id), buildingStr])
            }>
            <Typography variant='subtitle1'>{buildingStr}</Typography>
          </MenuItem>
        );
      })
    );
  };

  // redirect on invalid url params
  useEffect(() => {
    if (!/^\d{1,3}$/.test(siteGroup) || !/^\d{1,3}$/.test(studioId)) {
      history.push(`${process.env.PUBLIC_URL}/404`);
    }
  }, [studioId, siteGroup]);

  // get site group info
  useEffect(() => {
    if (studioId && siteGroup) {
      getSiteGroupInfo(parseInt(studioId), parseInt(siteGroup));
    }
  }, [studioId, siteGroup]);

  // set building filter
  useEffect(() => {
    if (filter) setBuildingFilter(filter[0]);
  }, [filter]);

  const handleSelectRange = (dateRange: string[]) => {
    setYear(dateRange);
    setYearAnchor(null);
  };

  const handleSelectFilter = (filter: string[]) => {
    setFilter(filter);
    setFilterAnchor(null);
  };

  // get workorders by year
  useEffect(() => {
    if (studioId && siteGroup) {
      getWorkordersBySite(year[0], parseInt(studioId), parseInt(siteGroup));
    }
  }, [year]);

  const handleClickCalendar = (event: React.MouseEvent<HTMLButtonElement>) => {
    setYearAnchor(event.currentTarget);
  };
  const handleClickBuilding = (event: React.MouseEvent<HTMLButtonElement>) => {
    setFilterAnchor(event.currentTarget);
  };

  return (
    <Fragment>
      <Typography style={{ alignSelf: 'center' }} variant='subtitle1'>
        {year[1]}
      </Typography>
      <IconButton
        color='inherit'
        aria-controls='Year Menu'
        aria-haspopup='true'
        onClick={handleClickCalendar}>
        <CalendarIcon />
      </IconButton>
      <Menu
        id='year-select'
        anchorEl={yearAnchor}
        keepMounted
        open={Boolean(yearAnchor)}
        onClose={() => setYearAnchor(null)}>
        <MenuItem
          key={last12}
          onClick={() => handleSelectRange([last12, 'Past 12 months'])}>
          <Typography component='h6' variant='h6'>
            Past 12 months
          </Typography>
        </MenuItem>
        {renderYears()}
      </Menu>
      <IconButton
        color='inherit'
        aria-controls='Year Menu'
        aria-haspopup='true'
        onClick={handleClickBuilding}>
        <BuildingIcon />
      </IconButton>
      <Menu
        id='filter-select'
        anchorEl={filterAnchor}
        keepMounted
        open={Boolean(filterAnchor)}
        onClose={() => setFilterAnchor(null)}>
        <MenuItem
          key={last12}
          onClick={() => handleSelectFilter(['none', 'All'])}>
          <Typography component='h6' variant='h6'>
            All
          </Typography>
        </MenuItem>
        {renderBuildings()}
      </Menu>
      <Typography style={{ alignSelf: 'center' }} variant='subtitle1'>
        {filter[1]}
      </Typography>
    </Fragment>
  );
};

export default Filters;
