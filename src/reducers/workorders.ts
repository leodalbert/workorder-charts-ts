import produce from 'immer';
import {
  GetWorkordersAction,
  GET_WORKORDERS_BY_SITE,
  SetLoading,
  SET_LOADING,
  Workorder,
} from 'actions/types';

export const initialState = {
  workorders: [],
  loading: true,
};
interface WorkorderState {
  workorders: Workorder[];
  loading: boolean;
}

/* eslint-disable no-param-reassign */
const workorder = (
  state: WorkorderState = initialState,
  action: GetWorkordersAction | SetLoading
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
      default:
        break;
    }
  });

export default workorder;
