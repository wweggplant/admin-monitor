import {base} from './base';

let baseConfig = base();
export default {
  grid: [
    {
      left: 50,
      right: 50,
      top: 40,
      bottom: 50
    }
  ],

  dataZoom: [
    Object.assign(baseConfig.dataZoom[0], {
      bottom: 10,
    }),
    baseConfig.dataZoom[1]
  ],
};
