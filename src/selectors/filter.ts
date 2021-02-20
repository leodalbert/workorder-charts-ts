import { RootState } from 'reducers';
import { initialState } from 'reducers/filter';

export const selectState = (state: RootState) => state.filter || initialState;

export const selectDoughnut1Filter = (state: RootState) =>
  selectState(state).doughnut1Filter;
export const selectDoughnut2Filter = (state: RootState) =>
  selectState(state).doughnut2Filter;
export const buildingFilter = (state: RootState) =>
  selectState(state).buildingFilter;
