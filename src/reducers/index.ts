import workorder from 'reducers/workorders';
import filter from 'reducers/filter';
import siteGroup from 'reducers/siteGroup';
import { combineReducers } from 'redux';

export const rootReducer = combineReducers({
  workorders: workorder,
  filter: filter,
  siteGroup: siteGroup,
});

export type RootState = ReturnType<typeof rootReducer>;
