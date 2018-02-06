import {base} from './base';
import session from '@/utils/session';
import commonLogic from '@/common/index';

export default {
  getDeviceByType: function (params = {}) {
    return base.get('/device/getDeviceByType', {
      params
    })
  },
  all (deviceType = '') {
    let device = session.get('device');
    return device ? Promise.resolve({data: device}) : base.get('/device/getAll', {
      params: {deviceType}
    }).then((config) => {
      session.set('device', config.data);
      return config;
    });
  },
  getDeviceFlowConfig (deviceCompany = '', deviceModel = '', deviceSize = '') {
    return base.get('/device/getDeviceFlowConfig', {
      params: {deviceCompany, deviceModel, deviceSize}
    })
  },
  getDeviceByPage (data, page) {
    return base.post('/device/getDeviceByPage', commonLogic.mixinPageParam(data, page))
  },
  deleteDevice (deviceType, deviceIds) {
    return base.post('/device/deleteDevice', {deviceType, deviceIds})
  },
  updatePreDevice (data) {
    return base.post('/device/updatePreDevice', data);
  },
  updateFlowDevice (data) {
    return base.post('/device/updateFlowDevice', data);
  },
};
