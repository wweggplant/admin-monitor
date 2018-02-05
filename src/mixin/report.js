import CONST from '@/const/device';
import {baseMixin, cloneDeep} from '@/const/echarts/base';
import searchChart from '@/common/SearchChart';
import dailyDrawOptionMixin from '@/const/echarts/report/dailyDraw';
import Chart from '@/common/Chart';
import configResource from '@/resource/config';
import historyResource from '@/resource/history';
import chartTableConfig from '@/const/echarts/report/chartTable';
import base from './base';
import commonLogic from '@/common/index';
import filters from '@/filters/index';

// TODO : 与chartDataHandle整合
let cakeChartHandle = (chartData, list, attrName) => {
  let seriesData = list.map(item => { return {value: 0, name: item.name} });
  let legendData = list.map(item => item.name);
  chartData.forEach(item => {
    for (let n in list) {
      if (
        (list[n].min === undefined && item[attrName] < list[n].max) ||
          (item[attrName] >= list[n].min && item[attrName] < list[n].max) ||
          (list[n].max === undefined && item[attrName] >= list[n].min)
      ) {
        seriesData[n].value++;
      }
    }
  });
  return {legendData, seriesData};
};
const DEFAULT_CONFIGTIPMESSAGE = '表具工作正常，无需更换';

export default {
  extends: base,
  data () {
    return {
      currentDevice: {},
      currentConfig: {},
      sumDialogVisible: false,
      list: [],
      configTipMessage: DEFAULT_CONFIGTIPMESSAGE,
      singleDate: true,
      form: {
        date: '2017-11-12 00:00:00',
        deviceType: 'pre',
        dates: ['2017-11-12 00:00:00', '2017-11-15 00:00:00'],
      },
      currentHistoryData: [],
      deviceTypeOptions: CONST.type
    };
  },
  components: {
    searchChart, Chart
  },
  methods: {
    chartDataHandle (chartData, names, cbs) {
      chartData.forEach((item, index) => {
        names.forEach((name, i) => {
          if (item[name] === '-') {
            chartData.split(index, 1);
          } else {
            cbs && cbs[i] && cbs[i](item[name], name, item);
          }
        })
      });
    },
    openSum () {
      this.sumDialogVisible = true;
      this.$nextTick(() => {
        this.$refs.dailyChart.drawChart();
        this.$refs.focusChart.drawChart();
      });
    },
    exportReport () {
      this.expt().then(([message]) => {
        if (message !== null) {
          window.open(message, '_blank');
        } else {
          this.$message({
            type: 'error',
            message: '无报表可以导出'
          })
        }
      });
    },
    changeDevType () {
      this.search();
    },
    supportDraw (chartData) {
      let eChartOption = baseMixin([], 'cakeConfig');
      this.chartDataHandle(chartData, ['waterSupply'], [(value, name, item) => {
        eChartOption.legend.data.push(item.dmaName);
        eChartOption.series[0].data.push({value: value, name: item.dmaName});
      }]);
      eChartOption.title.text = '分区供水量占比';
      return eChartOption;
    },
    contrastDraw (chartData) {
      let eChartOption = baseMixin([], 'columnConfig');
      eChartOption.xAxis[0].data = chartData.map(item => item.dmaName);
      eChartOption.series[1] = cloneDeep(eChartOption.series[0]);
      this.chartDataHandle(chartData, ['totalLeakageRate', 'physicalLeakageRate'], [(value) => {
        eChartOption.series[0].data.push(value);
      }, (value) => {
        eChartOption.series[1].data.push(value);
      }]);
      eChartOption.title.text = '产销差率、疑似漏损率';
      eChartOption.series[0].name = '产销差率';
      eChartOption.series[1].name = '疑似漏损率';
      eChartOption.legend.data = ['产销差率', '疑似漏损率'];
      return eChartOption;
    },
    focusDraw (chartData) {
      let eChartOption = baseMixin([dailyDrawOptionMixin], 'cakeConfig');
      let type = this.form.deviceType;
      const series = eChartOption.series[0];
      let attrName = chartTableConfig.common[type].focusAttr;
      let list = chartTableConfig.common[type].list;
      this.chartDataHandle(chartData, [attrName]);
      let result = cakeChartHandle(chartData, list, attrName);
      eChartOption.legend.data = result.legendData;
      series.data = result.seriesData;
      eChartOption.title.text = '重点时段';
      series.label.normal.show = true;
      return eChartOption;
    },
    abnorDraw (chartData) {
      let eChartOption = baseMixin([dailyDrawOptionMixin], 'cakeConfig');
      let attrName = 'abnormalRate';
      let list = chartTableConfig.abnor.list;
      this.chartDataHandle(chartData, [attrName]);
      let result = cakeChartHandle(chartData, list, attrName);
      eChartOption.legend.data = result.legendData;
      eChartOption.series[0].data = result.seriesData;
      eChartOption.title.text = '异常率统计';
      return eChartOption;
    },
    dailyDraw (chartData) {
      let eChartOption = baseMixin([dailyDrawOptionMixin], 'cakeConfig');
      let type = this.form.deviceType;
      let attrName = chartTableConfig.common[type].dailyAttr;
      let list = chartTableConfig.common[type].list;
      const series = eChartOption.series[0];
      this.chartDataHandle(chartData, [attrName]);
      let result = cakeChartHandle(chartData, list, attrName);
      eChartOption.legend.data = result.legendData;
      series.data = result.seriesData;
      series.label.normal.show = true;
      return eChartOption;
    },
    detailAnalysis (current) {
      this.currentDevice = current;
      const type = this.form.deviceType;
      if (type === 'pre') {
        this.currentConfig = true;
        this.detailHistoryData();
      }
    },
    // 配表分析
    detailAnalysisDraw (data) {
      let chartData = filters.plainObject(data);
      let eChartOption = baseMixin([dailyDrawOptionMixin], 'cakeConfig');
      let list;
      let type = this.form.deviceType;
      if (type === 'acc' || type === 'grp') {
        commonLogic.listDiff(chartData, (item, next) => {
          let startTime = new Date(item[0]);
          let endTime = new Date(next[0]);
          let value = next[1];
          next[1] = value * 3600000 / (endTime - startTime);
        });
      }
      if (type === 'pre') {
        list = chartTableConfig.analysis.list;
      } else {
        list = chartTableConfig.analysis.dynamic(this.currentConfig);
      }
      let total = chartData.length;
      let result = cakeChartHandle(chartData, list, '1');
      result.seriesData.forEach(item => {
        item.value = item.value / total;
      });
      const min = result.seriesData[0].value;
      const max = result.seriesData[result.seriesData.length - 1].value;
      if (min >= 0.25) {
        this.configTipMessage = '现有表具过小，建议更换大表，提高计量精度'
      }
      if (max >= 0.25) {
        this.configTipMessage = ' 现有表具过大，建议更换小表，提高计量精度'
      }
      if (min < 0.25 && max < 0.25) {
        this.configTipMessage = DEFAULT_CONFIGTIPMESSAGE;
      }
      if (min > 0.25 && max > 0.25) {
        this.configTipMessage = '数据异常，需要人工分析';
      }
      eChartOption.title.text = '配表分析';
      eChartOption.legend.data = result.legendData;
      eChartOption.series[0].data = result.seriesData;
      return eChartOption;
    },
    historyDraw (chartData) {
      let eChartOption = baseMixin();
      eChartOption.title.text = `当前报表对应时段曲线图`;
      let deviceType = this.form.deviceType;
      let unitName = CONST.type[deviceType].unit;
      let deviceName = this.currentDevice.deviceName;
      eChartOption.yAxis[0].name = `${unitName}`;
      eChartOption.series[0].name = deviceName;
      eChartOption.legend.top = 20;
      eChartOption.legend.data = [deviceName];
      eChartOption.series[0].data = chartData;
      return eChartOption;
    },
    detailHistoryData () {
      let start;
      let end;
      let dates;
      if (!this.singleDate) {
        dates = this.form.dates;
        start = dates[0];
        end = dates[1];
      } else {
        end = this.form.date;
        start = new Date(this.currentDevice.startTime) - 86400000;
      }
      configResource.getReportConfig().then(({data}) => {
        let hms = `${data.configValue}`.split(':');
        let h = hms[0];
        let m = hms[1];
        start = new Date(start);
        end = new Date(end);
        start.setHours(Number(h));
        start.setMinutes(Number(m));
        start.setSeconds(0);
        end.setHours(Number(h));
        end.setMinutes(Number(m));
        end.setSeconds(0);
        historyResource.list({deviceId: this.currentDevice.deviceId, startTime: filters.format(start), endTime: filters.format(end)}).then(({data}) => {
          this.currentHistoryData = Object.freeze(commonLogic.historyDiffList(data));
          this.$nextTick(() => {
            this.$refs.historyChart.drawChart();
            if (this.currentConfig) {
              this.$refs.detailAnalysisChart.drawChart();
            } else {
            }
          });
        });
      });
    }
  },
  mounted () {
    this.search();
    configResource.getReportConfig();
  }
}
