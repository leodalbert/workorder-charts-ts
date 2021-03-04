import { initialState } from 'reducers/workorders';
import dayjs from 'dayjs';
import weekOfYear from 'dayjs/plugin/weekOfYear';

import { createSelector } from 'reselect';
import {
  selectDoughnut1Filter,
  selectDoughnut2Filter,
  buildingFilter,
} from './filter';
import { colorSelector } from 'utils/HelperFunctions';
import { RootState } from 'reducers';
dayjs.extend(weekOfYear);

interface TempData {
  [key: string]: number[];
}

interface RequestTypes {
  [key: string]: string;
}

export interface DataItem {
  label: string;
  data: number[];
  backgroundColor: string;
}
// TODO handle status === archived / the rest

export const selectState = (state: RootState) =>
  state.workorders || initialState;

export const selectWorkorders = (state: RootState) =>
  selectState(state).workorders;

export const makeFilteredWorkorders = createSelector(
  [selectWorkorders, buildingFilter],
  (workorders, filter) => {
    return !(filter === 'none')
      ? workorders.filter(
          (workorder) => workorder.building.id === parseInt(filter)
        )
      : workorders;
  }
);

// number of workorders by assigned_department by month
export const makeAssignedDepartmentData = createSelector(
  makeFilteredWorkorders,
  (workorders) => {
    const data: DataItem[] = [];
    const tempData: TempData = {};
    workorders.forEach((workorder) => {
      let assignedTrade = workorder.assigned_trade;
      if (!assignedTrade) assignedTrade = 'not specified';
      const month: number = parseInt(workorder.request_date.split('-')[1]) - 1;
      if (tempData[assignedTrade.toLowerCase()]) {
        tempData[assignedTrade.toLowerCase()][month]
          ? (tempData[assignedTrade.toLowerCase()][month] += 1)
          : (tempData[assignedTrade.toLowerCase()][month] = 1);
      } else {
        tempData[assignedTrade.toLowerCase()] = [];
        tempData[assignedTrade.toLowerCase()][month] = 1;
      }
    });
    let i = 0;
    for (let d in tempData) {
      if (tempData[d].reduce((acc, val) => acc + val) > 2) {
        data.push({
          label: d[0].toUpperCase() + d.slice(1),
          data: tempData[d],
          backgroundColor: colorSelector(i),
        });
      }
      i++;
    }
    return data;
  }
);

// number of workorders by trade_type by month
export const makeTradeTypeData = createSelector(
  makeFilteredWorkorders,
  (workorders) => {
    const data: DataItem[] = [];
    const tempData: TempData = {};
    workorders.forEach((workorder) => {
      let requestType = workorder.request_type;
      if (!requestType) requestType = 'not specified';
      const month = parseInt(workorder.request_date.split('-')[1]) - 1;
      if (tempData[requestType.toLowerCase()]) {
        tempData[requestType.toLowerCase()][month]
          ? (tempData[requestType.toLowerCase()][month] += 1)
          : (tempData[requestType.toLowerCase()][month] = 1);
      } else {
        tempData[requestType.toLowerCase()] = [];
        tempData[requestType.toLowerCase()][month] = 1;
      }
    });
    let i = 0;
    for (let d in tempData) {
      // only use data if there are more than 2 entries for dataset
      if (tempData[d].reduce((acc, val) => acc + val) > 2) {
        data.push({
          label: d[0].toUpperCase() + d.slice(1),
          data: tempData[d],
          backgroundColor: colorSelector(i),
        });
      }
      i++;
    }
    return data;
  }
);

export interface WeeklyData {
  allWeeklyWorkorders: number[];
  weeklyPmWorkorders: number[];
  weeklyOpenWorkorders: number[];
  weeklyCompletedWorkorders: number[];
}

// number of workorders per week
export const makeWorkordersWeeklyData = createSelector(
  makeFilteredWorkorders,
  (workorders) => {
    const data: WeeklyData = {
      allWeeklyWorkorders: [...Array(52).fill(0)],
      weeklyPmWorkorders: [...Array(52).fill(0)],
      weeklyOpenWorkorders: [...Array(52).fill(0)],
      weeklyCompletedWorkorders: [...Array(52).fill(0)],
    };
    workorders.forEach((workorder) => {
      data.allWeeklyWorkorders[dayjs(workorder.request_date).week() - 1]++;
      workorder.request_type === 'Preventive Maintenance' &&
        data.weeklyPmWorkorders[dayjs(workorder.request_date).week() - 1]++;
      workorder.completed_date &&
        data.weeklyOpenWorkorders[dayjs(workorder.request_date).week() - 1]++;
      //   TODO is this the correct data?
      workorder.completed_date &&
        data.weeklyCompletedWorkorders[
          dayjs(workorder.completed_date).week() - 1
        ]++;
    });
    return data;
  }
);

// Weekly workorder data
export const makeWorkordersWeeklyPmData = createSelector(
  makeFilteredWorkorders,
  (workorders) => {
    const data: number[] = [...Array(52).fill(0)];
    workorders.forEach((workorder) => {
      workorder.request_type === 'Preventive Maintenance' &&
        data[dayjs(workorder.request_date).week() - 1]++;
    });
    return data;
  }
);

// all request_types in list of workorders
export const makeSelectAllRequestTypes = createSelector(
  makeFilteredWorkorders,
  (workorders) => {
    const data: RequestTypes = {};
    workorders.forEach((workorder) => {
      if (!data[workorder.request_type]) {
        data[workorder.request_type] = '';
      }
    });
    return Object.keys(data);
  }
);

// workorders by how long they take to complete for doughnut 1
export const makeWorkorderCompletionTimeData1 = createSelector(
  [makeFilteredWorkorders, selectDoughnut1Filter],
  (workorders, filter) => {
    const data = [0, 0, 0];
    workorders
      .filter((workorder) => {
        //   if workorder is completed
        if (workorder.completed_date) {
          // return true if filter is set to all
          if (filter === 'all') {
            return true;
            //   else if filter is set to urgert, only return if priority is set to 1
          } else if (filter === 'urgent') {
            if (workorder.assigned_priority === 1) return true;
            else return false;
            // else filter by request type
          } else {
            if (workorder.request_type === filter) return true;
            else return false;
          }
        }
        // filter if not completed
        return false;
      })
      .forEach((workorder) => {
        if (
          dayjs(workorder.completed_date).diff(
            workorder.assigned_date,
            'day'
          ) <= 6
        ) {
          data[0]++;
        } else if (
          dayjs(workorder.completed_date).diff(
            workorder.assigned_date,
            'day'
          ) <= 30
        ) {
          data[1]++;
        } else {
          data[2]++;
        }
      });
    return data;
  }
);
// workorders by how long they take to complete for doughnut 1
export const makeWorkorderCompletionTimeData2 = createSelector(
  [makeFilteredWorkorders, selectDoughnut2Filter],
  (workorders, filter) => {
    const data = [0, 0, 0];
    workorders
      .filter((workorder) => {
        //   if workorder is completed
        if (workorder.completed_date) {
          // return true if filter is set to all
          if (filter === 'all') {
            return true;
            //   else if filter is set to urgert, only return if priority is set to 1
          } else if (filter === 'urgent') {
            if (workorder.assigned_priority === 1) return true;
            else return false;
            // else filter by request type
          } else {
            if (workorder.request_type === filter) return true;
            else return false;
          }
        }
        // filter if not completed
        return false;
      })
      .forEach((workorder) => {
        if (
          dayjs(workorder.completed_date).diff(
            workorder.assigned_date,
            'day'
          ) <= 6
        ) {
          data[0]++;
        } else if (
          dayjs(workorder.completed_date).diff(
            workorder.assigned_date,
            'day'
          ) <= 30
        ) {
          data[1]++;
        } else {
          data[2]++;
        }
      });
    return data;
  }
);
