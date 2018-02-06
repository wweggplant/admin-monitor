<template>
    <search-chart :use-height='baseOption.useHeight' ref='searchChart'>
        <el-form slot='search' size='mini' class='search-condition' ref='form' :model='form' label-width='80px'>
            <el-row>
                <el-col :span='7'>
                    <el-form-item prop='dates' label='日期选择'>
                        <el-date-picker
                            v-model='form.dates'
                            size='mini'
                            type='daterange'
                            range-separator='至'
                            start-placeholder='开始日期'
                            end-placeholder='结束日期'>
                        </el-date-picker>
                    </el-form-item>
                </el-col>
                <el-col :span='1' :offset='15'>
                    <el-button type='primary' @click='search' size='mini' >查询</el-button>
                </el-col>
                <el-col :span='1' style='padding-left: 10px;'>
                    <el-button type='warning' size='mini' @click='exportReport'>下载</el-button>
                </el-col>
            </el-row>
        </el-form>
        <tree-grid
            slot='table'
            :height='baseOption.useHeight/2 - 5'
            :columns='columns'
            :tree-structure='true'
            :data-source='list'
            :default-expand-all='true'
        >
        </tree-grid>
        <div slot='chart' class='full-height'>
            <el-row class='full-height report-chart'>
                <el-col :span='8' class='full-height report-chart-item'>
                    <chart :chart-data='chartData' :draw='supportDraw' ref='supportChart'/>
                </el-col>
                <el-col :span='16' class='full-height report-chart-item'>
                    <chart :chart-data='chartData' :draw='contrastDraw' ref='contrastChart'/>
                </el-col>
            </el-row>
        </div>
    </search-chart>
</template>
<script>
import mixin from '@/mixin/report';
import commonLogic from '@/common/';
import reportResource from '@/resource/report';
import dmaResource from '@/resource/dma';
import {format} from '@/filters/date';
import filters from 'filters';
import {TreeGrid} from '@/common/treeTable'
import columns from '@/const/dma/columns';

export default {
  mixins: [mixin],
  name: 'reportDMAIndex',
  data () {
    return {
      chartData: [],
      columns,
    };
  },
  components: {
    TreeGrid
  },
  methods: {
    expt () {
      let form = this.form;
      let startDate = format(form.dates[0]);
      let endDate = format(form.dates[1]);
      return reportResource.exportDmaStatSum(startDate, endDate);
    },
    goDetail ({dmaId}) {
      this.$router.push({name: 'reportDMADetail', params: {dmaId}})
    },
    search () {
      let form = this.form;
      let startDate = format(form.dates[0]);
      let endDate = format(form.dates[1]);
      this.queried = false;
      axios.all([reportResource.getDmaStatSum(startDate, endDate), dmaResource.getDMATree()]).then(([listResp, treeResp]) => {
        this.queried = true;
        const {list, tree} = {list: listResp.data, tree: treeResp.data};
        let chartData = [];
        commonLogic.iterTree([tree], (item) => {
          let d = list[item.dmaId];
          if (d) {
            chartData.push(Object.assign({dmaName: item.dmaName}, filters.plainObject(d)));
            ['waterIn', 'waterOut', 'waterSupply', 'waterSale', 'focusTimeAvg', 'physicalLeakage', 'otherLeakage', 'totalLeakage'].forEach(n => {
              d[n] = filters.numFormat(d[n]);
            });
            ['physicalLeakageRate', 'otherLeakageRate', 'totalLeakageRate'].forEach(n => {
              d[n] = filters.percentageFormat(d[n]);
            });
          } else {
            d = {};
          }
          Object.assign(item, filters.plainObject(d));
        });
        this.list = [tree];
        this.chartData = chartData;
        this.$nextTick(() => {
          this.$refs.supportChart.drawChart();
          this.$refs.contrastChart.drawChart();
        });
      })
    }
  }
};
</script>
<style lang='less'>

</style>
