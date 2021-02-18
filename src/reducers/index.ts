import { combineReducers } from 'redux';

export const rootReducer = combineReducers({
  //   userEvents: userEventsReducer,
  //   recorder: recorderReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
