import {base} from './base';
export default {
  getAlertByCondition (params = {}, page = 1, rows = 20) {
    params = Object.assign(params, {page, rows});
    return base.get(`/alert/getAlertByCondition`, {params});
  },
  handleAlert (alertId, alertStatus) {
    return base.post(`/alert/handleAlert`, {alertId, alertStatus});
  },
  handleAllAlert (alertStatus) {
    return base.get(`/alert/handleAllAlert`, {params: {alertStatus}});
  }
};
