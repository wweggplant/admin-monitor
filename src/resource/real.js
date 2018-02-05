import {base} from './base';

export default {
  /**
   * 登录
   */
  list (params = {}) {
    return base.get('/datamonitor/realtime/getRealtimeDataByType', {
      params
    });
  },
  listAllType () {
    return base.get('/datamonitor/realtime/getAllRealtimeData')
  }
};
