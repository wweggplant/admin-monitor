import {base} from './base';
import session from '@/utils/session';

export default {
  getReportConfig (configType = 'day_time') {
    let config = session.get('reportConfig');
    return config ? Promise.resolve({data: config}) : base.get('/system/getReportConfig', {
      params: {configType}
    }).then(response => {
      session.set('reportConfig', response.data);
      return response;
    });
  }
};
