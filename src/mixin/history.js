import history from '@/resource/history';
import Chart from '@/common/Chart';
import CONST from '@/const/device';
import {baseMixin} from '@/const/echarts/base';
import commonLogic from '@/common/index';
import base from '@/mixin/base';

const getEchartDynamicValue = (chart, name, index) => {
  return chart.getModel().getComponent(name, index)
};

export default {
  mixins: [base],
  components: {Chart},
  data () {
    return {
      history: {
        device: {},
        dates: [],
        list: [],
        statistics: [],
        chartTitle: '',
        unitName: '',
        accumulative: 0,
      }
    };
  },
  props: {
    chartTitle: {
      type: String
    },
    deviceId: {
      type: Number
    }
  },
  methods: {
    historySearch () {
      const param = this.history;
      const dates = param.dates;
      const deviceId = this.deviceId;
      let type;
      if (deviceId) {
        param.device = commonLogic.getDevById(deviceId);
        type = param.device.deviceType = commonLogic.getDevTypeById(deviceId);
      }
      const data = {};
      this.historyChartClear();
      data[type] = deviceId.toString();
      history.getHistoryByCondition(data, base.filters.format(dates[0]), base.filters.format(dates[1])).then(({data}) => {
        const list = data[type][deviceId] || [];
        if (type === 'acc' || type === 'grp') {
          param.accumulative = list[list.length - 1].value - list[0].value;
        }
        param.list = commonLogic.historyDiffList(Object.freeze(list));
        this.$nextTick(() => {
          this.$refs.historyChart.drawChart();
        })
      });
    },
    // 统计(从图表获取)
    historyStatistics (chart) {
      const value = getEchartDynamicValue(chart, 'series', 0);
      const array = value.markLineModel._data._rawData._array;
      const fmt = '0.000';
      const type = this.history.device.deviceType;
      const history = this.history;
      if (array.length) {
        if (type === 'pre' || type === 'ins') {
          history.statistics = [
            {name: '平均值', value: base.filters.numFormat(array[0].value, fmt)},
            {name: '最大值', value: base.filters.numFormat(array[1].value, fmt)},
            {name: '最小值', value: base.filters.numFormat(array[2].value, fmt)},
          ]
        } else {
          history.statistics = [
            {name: '瞬时平均值', value: base.filters.numFormat(array[0].value, fmt)},
            {name: '瞬时最大值', value: base.filters.numFormat(array[1].value, fmt)},
            {name: '瞬时最小值', value: base.filters.numFormat(array[2].value, fmt)},
            {name: '总供水量', value: base.filters.numFormat(history.accumulative, fmt)},
          ]
        }
      }
    },
    historyChartClear () {
      this.history.list = [];
      this.history.statistics = [];
      this.$refs.historyChart.clear();
    },
    historyDraw (chartData, chart) {
      const param = this.history;
      const eChartOption = baseMixin();
      const unitName = CONST.type[param.device.deviceType].unit;
      const deviceName = this.history.device.deviceName;
      this.history.unitName = unitName;
      eChartOption.title.text = param.chartTitle;
      eChartOption.yAxis[0].name = `${unitName}`;
      eChartOption.series[0].name = deviceName;
      eChartOption.legend.top = 20;
      eChartOption.legend.data = [deviceName];
      eChartOption.series[0].data = chartData;
      setTimeout(() => {
        this.historyStatistics(chart);
      }, 1000);
      return eChartOption;
    },
  }
};
