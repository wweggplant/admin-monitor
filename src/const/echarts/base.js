import lineConfig from './base/line'
import cakeConfig from './base/cake'
import columnConfig from './base/column'
import cloneDeep from 'lodash/cloneDeep';
// import echarts from 'echarts';
const baseObj = {
  lineConfig, cakeConfig, columnConfig
};
let base = (type = 'lineConfig') => cloneDeep(baseObj[type]);
const baseMixin = (configs = [], type = 'lineConfig') => cloneDeep(Object.assign({}, base(type), ...configs));

export {
  baseMixin,
  base,
  cloneDeep
}
