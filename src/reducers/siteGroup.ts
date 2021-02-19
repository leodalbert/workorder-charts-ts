import produce from 'immer';
import { GetSiteGroupInfo, GET_SITE_GROUP_INFO } from 'actions/types';

export const initialState = {
  name: '',
  logo: '',
};
interface SiteGroupState {
  name: string;
  logo: string;
}

/* eslint-disable no-param-reassign */
const workorder = (
  state: SiteGroupState = initialState,
  action: GetSiteGroupInfo
) =>
  produce(state, (draft) => {
    const { payload, type } = action;
    switch (type) {
      case GET_SITE_GROUP_INFO:
        draft.logo = payload.logo;
        draft.name = payload.name;
        break;
      default:
        break;
    }
  });

export default workorder;
