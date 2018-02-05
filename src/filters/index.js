import * as date from './date';
import * as common from './common';
import commonLogic from '@/common/index';
import number from './number';
import CONT from '@/const/device';

export default Object.assign({
  plainObject (obj) {
    return JSON.parse(JSON.stringify(obj));
  },
  getDevTypeById: commonLogic.getDevTypeById,
  getDevTypeNameById (id) {
    return CONT.type[commonLogic.getDevTypeById(id)].name;
  },
  getDevNameById (id) {
    return commonLogic.getDevById(id).deviceName;
  }
}, date, number, common);
