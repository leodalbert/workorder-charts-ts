import { RootState } from 'reducers';
import { initialState } from 'reducers/siteGroup';
import { createSelector } from 'reselect';

export const selectSiteGroup = (state: RootState) =>
  state.siteGroup || initialState;

export const selectName = (state: RootState) => selectSiteGroup(state).name;
export const selectLogo = (state: RootState) => selectSiteGroup(state).logo;
export const selectBuildings = (state: RootState) =>
  selectSiteGroup(state).buildings;

export const makeSortedSelectBuildings = createSelector(
  selectBuildings,
  (buildings) =>
    buildings &&
    buildings.sort((a, b) => parseInt(a.number) - parseInt(b.number))
);
