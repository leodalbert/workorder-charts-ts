import network from 'utils/network';
import {
  GetWorkordersAction,
  GET_WORKORDERS_BY_SITE,
  SetLoading,
  SET_LOADING,
  Workorder,
  SET_NOT_AUTHORIZED,
  SetNotAuthorized,
} from 'actions/types';
import { ThunkAction } from 'redux-thunk';
import { RootState } from 'reducers';
import { AxiosResponse } from 'axios';

// Get all wokrorders by site
export const getWorkordersBySite = (
  dateRange: string,
  studioId: number,
  siteGroup: number
): ThunkAction<
  Promise<void>,
  RootState,
  undefined,
  GetWorkordersAction | SetLoading | SetNotAuthorized
> => async (dispatch) => {
  const dates = dateRange.split(' ');
  dispatch({ type: SET_LOADING });
  try {
    const res: AxiosResponse<
      Workorder[]
    > = await network.getAllWorkordersBySite(
      dates[0],
      dates[1],
      studioId,
      siteGroup
    );

    dispatch({
      type: GET_WORKORDERS_BY_SITE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: SET_NOT_AUTHORIZED,
    });
  }
};
