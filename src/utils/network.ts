import axios, { AxiosResponse } from 'axios';
import { BASE_URL } from './environment';
import { inDev } from './HelperFunctions';

axios.interceptors.response.use((response) => response.data);
if (inDev()) {
  axios.defaults.headers.common = {
    Authorization: 'Bearer ' + 'abcd1234',
  };
}

const network = () => {
  const baseUrl = BASE_URL;

  // get all workorders by site
  const getAllWorkordersBySite = (
    startDate: string,
    endDate: string,
    studioId: number,
    siteGroup: number
  ) => {
    // const config = { headers };
    return axios.get(
      `https://system.onuma.com/${studioId}/api/items/workorder?limit=5000&sort=request_date&fields=request_date,assigned_date,completed_date,request_type,assigned_trade,assigned_priority,building.id&filter[building.site.site_group][eq]=${siteGroup}&filter[request_date][between]=${startDate},${endDate}`
    );
  };
  // get site_group info
  const getSiteGroupInfo = (studioId: number, siteGroup: number) => {
    // const config = { headers };
    return axios.get(
      `${baseUrl}/${studioId}/api/items/site_group?fields=name,logo&filter[id]=${siteGroup}`
    );
  };
  // get buildings in site_group
  const getSiteGroupBuildings = (studioId: number, siteGroup: number) => {
    // const config = { headers };
    return axios.get(
      `https://system.onuma.com/${studioId}/api/items/building?filter[site.site_group]=${siteGroup}&fields=id,name,number&filter[lazy_attribute.enable_workorders][>]=0`
    );
  };
  return {
    getSiteGroupBuildings,
    getAllWorkordersBySite,
    getSiteGroupInfo,
  };
};

const networkServicee = network();
export default networkServicee;
