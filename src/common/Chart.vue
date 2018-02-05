<template>
    <div class='home full-height'>
    </div>
</template>
<script>
import {mixin} from '@/mixin/chart';
export default {
  mixins: [mixin],
  data () {
    return {};
  },
  props: {
    draw: {
      type: Function,
      default () {}
    },
  },
  methods: {
    drawChart () {
      let chart = this.chart.instance;
      let eChartOption = this.draw.call(this.$parent, this.chartData, chart);
      console.log(eChartOption);
      chart.setOption(eChartOption);
      chart.resize();
    },
    clear () {
      this.chart.instance.clear();
    }
  }
};
</script>
<style lang='less'>

</style>
