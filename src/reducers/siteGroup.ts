import {
  GetSiteGroupInfo,
  GET_SITE_GROUP_INFO,
  GET_SITE_GROUP_BUILDINGS,
  GetSiteGroupBuildings,
  SiteGroupBuildings,
} from 'actions/types';
import { Reducer } from 'redux';

export const initialState: SiteGroupState = {
  name: '',
  logo: '',
  buildings: [],
};
export interface SiteGroupState {
  name: string;
  logo: string;
  buildings: SiteGroupBuildings;
}

const workorder: Reducer<
  SiteGroupState,
  GetSiteGroupInfo | GetSiteGroupBuildings
> = (
  state: SiteGroupState = initialState,
  action: GetSiteGroupInfo | GetSiteGroupBuildings
) => {
  switch (action.type) {
    case GET_SITE_GROUP_INFO:
      const { name, logo } = action.payload;
      return { ...state, name: name, logo: logo };
    case GET_SITE_GROUP_BUILDINGS:
      return { ...state, buildings: action.payload };
    default:
      return state;
  }
};

export default workorder;
