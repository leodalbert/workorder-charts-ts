import {
  DonughtFilterEnum,
  SetFilterEvent,
  SET_INNER_DOUGHNUT,
  SET_OUTER_DOUGHNUT,
} from 'actions/types';

export const setDoughnutFilter = (e: SetFilterEvent) => {
  // console.log(e);
  if (e.name === DonughtFilterEnum.Outer)
    return { type: SET_OUTER_DOUGHNUT, payload: e.value };
  else return { type: SET_INNER_DOUGHNUT, payload: e.value };
};
