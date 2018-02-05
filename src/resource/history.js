import {base} from './base';

export default {
  /**
   * 登录
   */
  list (params = {}) {
    return base.get('/datamonitor/history/getHistoryById', {
      params
    })
  },
  getHistoryByIds (data) {
    return base.post('/datamonitor/history/getHistoryByIds', data)
  },
  getHistoryByCondition (typeToIds, startTime, endTime) {
    return base.post('/datamonitor/history/getHistoryByCondition', {typeToIds: JSON.stringify(typeToIds), startTime, endTime})
  }
};
