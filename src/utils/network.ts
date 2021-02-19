import axios, { AxiosResponse } from 'axios';
import { BASE_URL } from './environment';
import { inDev } from './HelperFunctions';

axios.interceptors.response.use((response) => response.data);
if (true) {
  axios.defaults.headers.common = {
    Authorization: 'Bearer ' + 'abcd1234',
  };
}

const network = () => {
  const baseUrl = BASE_URL;

  // get all workorders by site
  const getAllWorkordersBySite = (startDate: string, endDate: string) => {
    // const config = { headers };
    return axios.get(
      `https://api.onuma.com/137/items/workorder?limit=5000&sort=request_date&fields=request_date,assigned_date,completed_date,request_type,assigned_trade,assigned_priority&filter[building.site.site_group][eq]=10&filter[request_date][between]=${startDate},${endDate}`
    );
  };
  // get site_group info
  const getSiteGroupInfo = (site_group: number, studioId: number) => {
    // const config = { headers };
    return axios.get(
      `${baseUrl}/137/api/items/site_group?fields=name,logo&filter[id]=10`
    );
  };
  return {
    getAllWorkordersBySite,
    getSiteGroupInfo,
  };
};

const networkServicee = network();
export default networkServicee;
