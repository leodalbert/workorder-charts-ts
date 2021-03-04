import produce from 'immer';
import {
  GetWorkordersAction,
  GET_WORKORDERS_BY_SITE,
  SetLoading,
  SetNotAuthorized,
  SET_LOADING,
  SET_NOT_AUTHORIZED,
  Workorder,
} from 'actions/types';

export const initialState = {
  workorders: [],
  loading: true,
  notAuthorized: false,
};
interface WorkorderState {
  workorders: Workorder[];
  loading: boolean;
  notAuthorized: boolean;
}

/* eslint-disable no-param-reassign */
const workorder = (
  state: WorkorderState = initialState,
  action: GetWorkordersAction | SetLoading | SetNotAuthorized
) =>
  produce(state, (draft) => {
    const { type } = action;
    switch (type) {
      case GET_WORKORDERS_BY_SITE:
        draft.workorders = action.payload;
        draft.loading = false;
        break;
      case SET_LOADING:
        draft.loading = true;
        break;
      case SET_NOT_AUTHORIZED:
        draft.notAuthorized = true;
        break;
      default:
        break;
    }
  });

export default workorder;
