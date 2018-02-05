import {cloneDeep} from 'lodash';
const dmaMonitor = [
  {name: 'deviceName', showName: '名称'},
  {name: 'saveTimeNow', showName: '最新时刻', width: 180},
  {name: 'valueNow', showName: '最新时刻值', filter: 'numFormat', width: 80},
  {name: 'saveTimeLast', showName: '上一时刻', width: 180},
  {name: 'valueLast', showName: '上一时刻值', filter: 'numFormat', width: 80},
  {name: 'changeVal', showName: '变化量', filter: 'numFormat', width: 80},
  {name: 'realChangeRate', showName: '变化率', filter: 'percentageFormat', width: 80},
];
let accDMAMonitor = cloneDeep(dmaMonitor);
accDMAMonitor = accDMAMonitor.slice(0, -1);
export default Object.freeze({
  type: {
    pre: {
      name: '压力计',
      unit: 'MPa',
      id_min: 1,
      id_max: 10000000,
      shortName: '压力',
      dmaAttrs: [{name: 'deviceName', showName: '名称'}, {name: 'deviceLocation', showName: '位置'}, {name: 'pipeSize', showName: '管径'}, {name: 'pipeMaterial', showName: '管材'}, {name: 'altitude', showName: '标高'}, {name: 'deviceModel', showName: '品牌型号'}, {name: 'installTime', showName: '安装时间', filter: 'date_foramt'}],
      dmaMonitor
    },
    ins: {
      name: '考核流量计（瞬时）',
      unit: 'm³/h',
      id_min: 10000001,
      id_max: 20000000,
      shortName: '瞬时',
      dmaAttrs: [{name: 'deviceName', showName: '名称'}, {name: 'deviceLocation', showName: '位置'}, {name: 'deviceSize', showName: '表径'}, {name: 'pipeSize', showName: '管径'}, {name: 'pipeMaterial', showName: '管材'}, {name: 'deviceModel', showName: '品牌型号'}, {name: 'overRange', showName: '量程'}, {name: 'installTime', showName: '安装时间', filter: 'date_foramt'}],
      dmaMonitor
    },
    acc: {
      name: '考核流量计（累计）',
      unit: 'm³',
      id_min: 20000001,
      id_max: 30000000,
      shortName: '累计',
      dmaAttrs: [{name: 'deviceName', showName: '名称'}, {name: 'deviceLocation', showName: '位置'}, {name: 'deviceSize', showName: '表径'}, {name: 'pipeSize', showName: '管径'}, {name: 'pipeMaterial', showName: '管材'}, {name: 'deviceModel', showName: '品牌型号'}, {name: 'overRange', showName: '量程'}, {name: 'installTime', showName: '安装时间', filter: 'date_foramt'}],
      dmaMonitor: accDMAMonitor
    },
    grp: {
      name: '收费大表',
      unit: 'm³',
      id_min: 30000001,
      id_max: 40000000,
      shortName: '收费',
      dmaAttrs: [{name: 'deviceName', showName: '名称'}, {name: 'deviceLocation', showName: '位置'}, {name: 'deviceSize', showName: '表径'}, {name: 'pipeSize', showName: '管径'}, {name: 'pipeMaterial', showName: '管材'}, {name: 'deviceModel', showName: '品牌型号'}, {name: 'overRange', showName: '量程'}, {name: 'deviceMembers', showName: '用户'}, {name: 'installTime', showName: '安装时间', filter: 'date_foramt'}],
      dmaMonitor: accDMAMonitor
    },
  }
});
