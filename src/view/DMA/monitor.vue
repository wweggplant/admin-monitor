<template>
    <el-row class='u-container overflow-y-hidden' :style='{height:`${useHeight}px`}'>
        <el-col class='device-tree' :span='5'>
            <el-tree
                :expand-on-click-node='false'
                ref='tree'
                :default-expand-all='true'
                :highlight-current='true'
                :data='tree'
                :props='defaultProps'
                :render-content='renderContent'
                node-key='dmaId'
                @node-click='getDetail'></el-tree>
        </el-col>
        <el-col class='device-detail ' :span='19' >
            <el-form class='data-display-layout' :style='{height:`${useHeight - 10}px`}' inline size='mini' label-width='90px'>
                <el-row class='data-display-secition '>
                    <el-col :span='24' class='full-height'>
                        <el-collapse class='dma-collapse full-height' style='' v-model='activeNames'>
                            <el-collapse-item title='压力计' name='3'>
                                <template slot='title'>
                                    压力计数据 <span class='collapse-title-badge pull-right'>{{dma_pre.length}}</span>
                                </template>
                              <dma-table :type='deviceTypes[0]' @dma-select-change='dmaSelectChange' ref-name='dma_pre'  table-type='dmaMonitor'  :is-selection='true' ref='dma_pre' :device.sync='dma_pre' >
                                <el-table-column
                                  slot="append"
                                  align='center'
                                  label='操作'
                                >
                                  <template slot-scope='scope' >
                                    <el-button style='color:#111' type='text'  size='mini' @click="openHistoryModelDaysOffset(scope.row.deviceId, scope.row.saveTimeNow, -1)">查看更多</el-button>
                                  </template>
                                </el-table-column>
                              </dma-table>
                            </el-collapse-item>
                            <el-collapse-item title='考核流量计（瞬时）' name='4'>
                                <template slot='title'>
                                    考核流量计（瞬时）数据 <span class='collapse-title-badge pull-right'>{{dma_ins.length}}</span>
                                </template>
                              <dma-table  :type='deviceTypes[1]' @dma-select-change='dmaSelectChange' ref-name='dma_ins'  table-type='dmaMonitor'  :is-selection='true' ref='dma_ins' :device.sync='dma_ins' >
                                <el-table-column
                                  slot="append"
                                  align='center'
                                  label='操作'
                                >
                                  <template slot-scope='scope' >
                                    <el-button type='text' style='color:#111' size='mini' @click="openHistoryModelDaysOffset(scope.row.deviceId, scope.row.saveTimeNow, -1)">查看更多</el-button>
                                  </template>
                                </el-table-column>
                              </dma-table>
                            </el-collapse-item>
                            <el-collapse-item title='进水累计流量数据' name='5'>
                                <template slot='title'>
                                    进水累计流量数据 <span class='collapse-title-badge pull-right'>{{dma_in.length}}</span>
                                </template>
                              <dma-table :type='deviceTypes[2]' @dma-select-change='dmaSelectChange' ref-name='dma_in' table-type='dmaMonitor'   :is-selection='true'  ref='dma_in' :device.sync='dma_in' >
                                <el-table-column
                                  slot="append"
                                  align='center'
                                  label='操作'
                                >
                                  <template slot-scope='scope' >
                                    <el-button type='text' style='color:#111' size='mini' @click="openHistoryModelDaysOffset(scope.row.deviceId, scope.row.saveTimeNow, -1)">查看更多</el-button>
                                  </template>
                                </el-table-column>
                              </dma-table>
                            </el-collapse-item>
                            <el-collapse-item title='出水累计流量数据' name='6'>
                                <template slot='title'>
                                    出水累计流量数据 <span class='collapse-title-badge pull-right'>{{dma_out.length}}</span>
                                </template>
                              <dma-table :type='deviceTypes[2]' @dma-select-change='dmaSelectChange' ref-name='dma_out' table-type='dmaMonitor'   :is-selection='true' ref='dma_out' :device.sync='dma_out' >
                                <el-table-column
                                  slot="append"
                                  align='center'
                                  label='操作'
                                >
                                  <template slot-scope='scope' >
                                    <el-button type='text' style='color:#111' size='mini' @click="openHistoryModelDaysOffset(scope.row.deviceId, scope.row.saveTimeNow, -1)">查看更多</el-button>
                                  </template>
                                </el-table-column>
                              </dma-table>
                            </el-collapse-item>
                            <el-collapse-item title='收费大表数据' name='7'>
                                <template slot='title'>
                                    收费大表数据 <span class='collapse-title-badge pull-right'>{{dma_grp.length}}</span>
                                </template>
                              <dma-table :type='deviceTypes[3]' @dma-select-change='dmaSelectChange' ref-name='dma_grp' table-type='dmaMonitor'   :is-selection='true' ref='dma_grp' :device.sync='dma_grp'>
                                <el-table-column
                                  slot="append"
                                  align='center'
                                  label='操作'
                                >
                                  <template slot-scope='scope' >
                                    <el-button type='text' style='color:#111'  size='mini' @click="openHistoryModelDaysOffset(scope.row.deviceId, scope.row.saveTimeNow, -1)">查看更多</el-button>
                                  </template>
                                </el-table-column>
                              </dma-table>
                            </el-collapse-item>
                        </el-collapse>
                    </el-col>
                </el-row>
                <el-row class='data-display-secition overflow-y-hidden' v-if='chartData.length>0'>
                    <el-col :span='24' class='full-height overflow-y-hidden'>
                        <muti-chart :title='"过去48小时曲线图"'  class='full-height overflow-y-hidden'  ref='chart'  :chart-data='chartData' />
                    </el-col>
                </el-row>
            </el-form>
        </el-col>
        <el-dialog :visible.sync='showImgPreview' >
            <img width='100%' :src='dialogImageUrl' alt=''>
        </el-dialog>
    </el-row>
</template>
<script>
import historyResource from '@/resource/history';
import {mixin} from '@/mixin/dma';
import dmaTable from './components/dmaTable';
import {format} from '@/filters/date';
import commonLogic from '@/common';
import mutiChart from '@/components/common/mutiChart';
let oldGetDetail = mixin.methods.getDetail;

export default {
  name: 'DMAmonitor',
  mixins: [mixin],
  components: {
    dmaTable, mutiChart
  },
  data () {
    return {
      activeNames: ['3', '4'],
      seletedDevice: {
        dma_pre: [],
        dma_ins: [],
        dma_in: [],
        dma_out: [],
        dma_grp: [],
      },
      currentImgs: [],
      chartData: []
    }
  },
  computed: {
    concatSelectList () {
      let list = []; // 选择的所有设备
      let seletedDevice = this.seletedDevice;
      for (let p in seletedDevice) {
        list = list.concat(seletedDevice[p]);
      }
      return list;
    },
  },
  methods: {
    pollingSearch () {
      let vm = this;
      //  this.pollingId = setInterval(() => vm.search(), 1000 * 10);
      this.pollingId = setInterval(() => vm.getData(), 1000 * 300);
    },
    dmaSelectChange (dmaSelects, refName) {
      let list = this.concatSelectList;
      const isOverLimit = commonLogic.isOverDeviceTypes(dmaSelects, list, 2);
      if (isOverLimit) {
        this.$refs[refName].$refs.table.clearSelection();
        return this.$message({
          message: '只能选择两种设备',
          type: 'error'
        });
      }
      this.seletedDevice[refName] = dmaSelects.map(item => { return {deviceName: item.deviceName, deviceId: item.deviceId, saveTimeNow: item.saveTimeNow} });
      this.getData();
    },
    getData () {
      let promiseArr = this.concatSelectList.map(item => {
        let endTIme = format(item.saveTimeNow);
        let startTIme = moment(item.saveTimeNow).add(-2, 'days');
        return historyResource.list({deviceId: item.deviceId, startTime: format(startTIme), endTime: endTIme})
      });
      let vm = this;
      if (promiseArr.length) {
        axios.all(promiseArr).then(list => {
          vm.chartData = Object.freeze(list.map(item => {
            let data = item[0];
            if (data.length > 0) {
              let first = data[0];
              let deviceType = commonLogic.getDevTypeById(first.deviceId);
              let device = commonLogic.getDevById(first.deviceId);
              return {data, device: {deviceType, deviceName: device.deviceName}};
            } else {
              return {data, device: {}};
            }
          }));
          vm.$nextTick(() => {
            vm.$refs.chart.draw();
          });
        });
      } else {
        let chart = vm.$refs.chart;
        chart && chart.chart.instance.clear();
      }
    },
    clearPolling () {
      clearInterval(this.pollingId);
      this.pollingId = null
    },
    changePollingState (state) {
      if (state === 'stop') {
        this.clearPolling();
      }
      if (state === 'start') {
        if (!this.pollingId) {
          this.pollingSearch();
        }
      }
    },
    getDetail (detail) {
      let vm = this;
      this.TYPES.forEach(item => {
        let name = `dma_${item}`;
        vm.seletedDevice[name] = [];
        vm[name] = [];
        vm.$refs[name].$refs.table.clearSelection();
      });
      if (vm.$refs.chart) {
        vm.$refs.chart.chart.instance.clear();
      }
      oldGetDetail.call(this, detail).then((data) => {
        vm.$nextTick(() => {
          if (vm.dma_pre[0]) {
            vm.$refs.dma_pre.$refs.table.toggleRowSelection(vm.dma_pre[0]);
          }
          if (vm.dma_ins[0]) {
            vm.$refs.dma_ins.$refs.table.toggleRowSelection(vm.dma_ins[0]);
          }
        });
      });
    }
  },
  destroyed () {
    this.clearPolling();
  },
  activated () {
    this.changePollingState('start');
  },

  deactivated () {
    this.changePollingState('stop');
  },
  mounted () {
    this.reload(this);
  }
}
</script>
<style>
    .upload-hidden .el-upload{
        display: none;
    }
</style>
<style lang='less'>
    @import '~assets/css/components-dir/dma';
</style>
