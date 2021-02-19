import network from 'utils/network';
import {
  GetSiteGroupInfo,
  GET_SITE_GROUP_INFO,
  GET_SITE_GROUP_BUILDINGS,
  SiteGroupInfo,
  GetSiteGroupBuildings,
  SiteGroupBuildings,
} from 'actions/types';
import { ThunkAction } from 'redux-thunk';
import { RootState } from 'reducers';
import { AxiosResponse } from 'axios';

// get buildings in site_group
export const getSiteGroupBuildings = (
  studioId: number,
  siteGroup: number
): ThunkAction<
  Promise<void>,
  RootState,
  undefined,
  GetSiteGroupBuildings
> => async (dispatch) => {
  try {
    const res: AxiosResponse<SiteGroupBuildings> = await network.getSiteGroupBuildings(
      studioId,
      siteGroup
    );
    dispatch({
      type: GET_SITE_GROUP_BUILDINGS,
      payload: res.data,
    });
  } catch (err) {
    console.error(err);
  }
};

// get name and logo of siteGroup
export const getSiteGroupInfo = (
  studioId: number,
  siteGroup: number
): ThunkAction<Promise<void>, RootState, undefined, GetSiteGroupInfo> => async (
  dispatch
) => {
  dispatch(getSiteGroupBuildings(studioId, siteGroup));
  try {
    const res: AxiosResponse<SiteGroupInfo[]> = await network.getSiteGroupInfo(
      studioId,
      siteGroup
    );
    dispatch({
      type: GET_SITE_GROUP_INFO,
      payload: res.data[0],
    });
  } catch (err) {
    console.error(err);
  }
};
