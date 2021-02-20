import {
  DonughtFilterEnum,
  SetBuildingFilter,
  SetFilterEvent,
  SET_BUILDING_FILTER,
  SET_INNER_DOUGHNUT,
  SET_OUTER_DOUGHNUT,
} from 'actions/types';

export const setDoughnutFilter = (e: SetFilterEvent) => {
  if (e.name === DonughtFilterEnum.Outer)
    return { type: SET_OUTER_DOUGHNUT, payload: e.value };
  else return { type: SET_INNER_DOUGHNUT, payload: e.value };
};

export const setBuildingFilter = (filter: string): SetBuildingFilter => ({
  type: SET_BUILDING_FILTER,
  payload: filter,
});
