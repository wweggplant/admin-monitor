import CONT from '@/const/device';
import {session, cached} from '@/utils/index';

const getDevTypeById = (id) => {
  return cached((id) => {
    const table = CONT.type;
    for (let p in table) {
      let min = table[p].id_min;
      let max = table[p].id_max;
      if (id >= min && id <= max) {
        return p;
      }
    }
  })(id);
};
const mixinPageParam = (data, page) => Object.assign({}, data, {page: page.current, rows: page.size});
const iterTree = function (array, callback) {
  if (array && array.length > 0) {
    array.forEach(item => {
      callback.call(array, item);
      iterTree(item.children, callback);
    });
  }
};
// 实时数据的计算,变化率和变化量
const realDataHandle = (list, cb) => {
  return mixinListWithDev(list, (item, device, i) => {
    let changeVal = item.valueNow - item.valueLast;
    let o = {};
    if (cb) {
      o = cb(item, device, i);
    }
    return Object.assign(o, {
      'changeVal': changeVal,
      'realChangeRate': changeVal / item.valueLast
    })
  });
};
const mixinListWithDev = (list, cb) => {
  return list.map((item, i) => {
    let device = getDevById(item.deviceId);
    let deviceName = device.deviceName;
    let deviceId = device.deviceId;
    let groupId = device.groupId;
    let longitude = device.longitude;
    let latitude = device.latitude;
    let changeRate = device.changeRate;
    let deviceModel = device.deviceModel;
    let deviceCompany = device.deviceCompany;
    let deviceSize = device.deviceSize;
    let _maxValue = device.maxValue;
    let _minValue = device.minValue;
    let o = {};
    let dev = {_deviceTypeName: CONT.type[getDevTypeById(deviceId)].name, deviceName, deviceId, groupId, longitude, latitude, changeRate, _maxValue, _minValue, deviceModel, deviceCompany, deviceSize};
    if (cb) {
      o = cb(item, dev, i);
    }
    return Object.assign(item, dev, o);
  })
};
const getDevById = (id) => {
  let device = session.get('device') || {};
  for (let p in device) {
    let d = device[p].find(item => item.deviceId === id);
    if (d) {
      return d;
    }
  }
  return {};
};
const listDiff = (list, cb) => {
  list.forEach((item, index) => {
    let next = list[index + 1];
    let prev = index - 1 > -1 ? list[index - 1] : null;
    if (next) {
      cb && cb.call(list, item, next, prev);
    }
  });
};
const historyDiffList = (list) => {
  let arr = [];
  let first = list[0];
  if (first) {
    let type = getDevTypeById(first.deviceId);
    if (type === 'acc' || type === 'grp') {
      listDiff(list, (item, next) => {
        let date = moment(next.saveTime).toISOString();
        let value = next.value - item.value;
        arr.push([
          date,
          value
        ]);
      });
    } else {
      list.forEach(item => {
        arr.push([
          moment(item.saveTime).toISOString(),
          item.value
        ]);
      });
    }
  }
  return arr;
};
/*
* 返回是否超过了 ${maxTypes} 的种类的数量的设备
* */
const isOverDeviceTypes = (devices, list, maxTypes) => {
  let types = list.map(item => {
    if (!item.deviceType) {
      return getDevTypeById(item.deviceId);
    }
    return item.deviceType;
  });
  types = [...new Set(types)];
  return devices.length && devices.every(device => types.length >= maxTypes && !types.some(deviceType => deviceType === getDevTypeById(device.deviceId)));
};
export default {
  isOverDeviceTypes,
  getDevTypeById,
  getDevById,
  mixinListWithDev,
  historyDiffList,
  realDataHandle,
  iterTree,
  listDiff,
  mixinPageParam
};
