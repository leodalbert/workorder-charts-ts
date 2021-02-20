import produce from 'immer';
import {
  SetOuterDoughnut,
  SetInnerDoughnut,
  SetBuildingFilter,
  SET_INNER_DOUGHNUT,
  SET_OUTER_DOUGHNUT,
  SET_BUILDING_FILTER,
} from 'actions/types';

export const initialState = {
  doughnut1Filter: 'all',
  doughnut2Filter: 'Preventive Maintenance',
  buildingFilter: 'none',
};

interface FilterState {
  doughnut1Filter: string;
  doughnut2Filter: string;
  buildingFilter: string;
}

const filter = (
  state: FilterState = initialState,
  action: SetInnerDoughnut | SetOuterDoughnut | SetBuildingFilter
) =>
  produce(state, (draft) => {
    switch (action.type) {
      case SET_OUTER_DOUGHNUT:
        draft.doughnut1Filter = action.payload;
        break;
      case SET_INNER_DOUGHNUT:
        draft.doughnut2Filter = action.payload;
        break;
      case SET_BUILDING_FILTER:
        draft.buildingFilter = action.payload;
        break;
      default:
        break;
    }
  });

export default filter;
