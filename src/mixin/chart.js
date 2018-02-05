import echarts from 'echarts';

let mixin = {
  data () {
    return {
      chart: {},
      chartHeightOffset: 50,
      chartWidth: '',
      insIndex: 0,
    };
  },
  props: {
    height: {
      type: Number,
    },
    chartData: {
    },
    title: {
      type: String,
    }
  },
  mounted () {
    this.chart = Object.freeze({instance: echarts.init(this.$el)});
  }
};
export {
  mixin
}
