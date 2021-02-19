import network from 'utils/network';
import {
  GetSiteGroupInfo,
  GET_SITE_GROUP_INFO,
  SiteGroupInfo,
} from 'actions/types';
import { ThunkAction } from 'redux-thunk';
import { RootState } from 'reducers';
import { AxiosResponse } from 'axios';

// get name and logo of siteGroup
export const getSiteGroupInfo = (): ThunkAction<
  Promise<void>,
  RootState,
  undefined,
  GetSiteGroupInfo
> => async (dispatch) => {
  try {
    const res: AxiosResponse<SiteGroupInfo[]> = await network.getSiteGroupInfo(
      137,
      10
    );
    dispatch({
      type: GET_SITE_GROUP_INFO,
      payload: res.data[0],
    });
  } catch (err) {
    console.error(err);
  }
};
