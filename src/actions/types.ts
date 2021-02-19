import { Action } from 'redux';

export const GET_WORKORDERS_BY_SITE = 'GET_WORKORDERS_BY_SITE';
export const GET_SITE_GROUP_INFO = 'GET_SITE_GROUP_INFO';
export const GET_SITE_GROUP_BUILDINGS = 'GET_SITE_GROUP_BUILDINGS';
export const SET_INNER_DOUGHNUT = 'SET_INNER_DOUGHNUT';
export const SET_OUTER_DOUGHNUT = 'SET_OUTER_DOUGHNUT';
export const SET_LOADING = 'SET_LOADING';

export enum DonughtFilterEnum {
  Outer = 'outer',
  Inner = 'inner',
}

export interface SetFilterEvent {
  value: string | unknown;
  name?: DonughtFilterEnum | string | undefined;
}

export interface Workorder {
  request_date: string;
  assigned_date: string;
  completed_date: string;
  request_type: string;
  assigned_trade: string;
  assigned_priority: number;
}

export interface SiteGroupInfo {
  name: string;
  logo: string;
}

export interface SiteGroupBuilding {
  id: number;
  number: string;
  name: string;
}

export interface SiteGroupBuildings extends Array<SiteGroupBuilding> {}

export interface GetWorkordersAction
  extends Action<typeof GET_WORKORDERS_BY_SITE> {
  payload: Workorder[];
}

export interface GetSiteGroupInfo extends Action<typeof GET_SITE_GROUP_INFO> {
  payload: SiteGroupInfo;
}

export interface GetSiteGroupBuildings
  extends Action<typeof GET_SITE_GROUP_BUILDINGS> {
  payload: SiteGroupBuildings;
}

export interface SetInnerDoughnut extends Action<typeof SET_INNER_DOUGHNUT> {
  payload: string;
}

export interface SetOuterDoughnut extends Action<typeof SET_OUTER_DOUGHNUT> {
  payload: string;
}

export interface SetLoading extends Action<typeof SET_LOADING> {
  payload?: any;
}
