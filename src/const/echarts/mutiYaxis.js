import {base, cloneDeep} from './base';
let baseConfig = base();
console.log();
export default {
  yAxis: [
    cloneDeep(baseConfig.yAxis[0], {nameTextStyle: {verticalAlign: 'middle'}}),
    cloneDeep(baseConfig.yAxis[0], {nameTextStyle: {verticalAlign: 'middle'}}),
  ],
  series: [
    {
      yAxisIndex: 0,
      type: 'line',
      smooth: true,
      data: []
    }
  ],

  dataZoom: [
    Object.assign(baseConfig.dataZoom[0], {
      bottom: 10,
    }),
    baseConfig.dataZoom[1]
  ],
};
