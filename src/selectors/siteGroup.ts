import { RootState } from 'reducers';
import { initialState } from 'reducers/siteGroup';

export const selectSiteGroup = (state: RootState) =>
  state.siteGroup || initialState;

export const selectName = (state: RootState) => selectSiteGroup(state).name;
export const selectLogo = (state: RootState) => selectSiteGroup(state).logo;
