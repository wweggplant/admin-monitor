<template>
    <search-chart :use-height='baseOption.useHeight' ref='searchChart'>
        <el-form slot='search' size='mini' class='search-condition' ref='form' :model='form' label-width='80px'>
            <el-row>
                <el-col :span='13'>
                    <el-form-item label='设备类型' prop='deviceType'>
                        <el-radio-group @change='changeDevType' v-model='form.deviceType'>
                            <el-radio v-for='(type,p) in deviceTypeOptions' :key='p' :label='p'>{{type.name}}</el-radio>
                        </el-radio-group>
                    </el-form-item>
                </el-col>
                <el-col :span='1' :offset='8'>
                    <el-button type='primary' @click='search' size='mini' >查询</el-button>
                </el-col>
                <el-col :span='1' style='padding-left: 10px;'>
                    <el-button type='warning' size='mini' @click='exportReport'>下载</el-button>
                </el-col>
            </el-row>
            <el-row class='report-search-condition'>
                <el-col :span="12">
                    <el-form-item prop='date' label='日期选择'>
                        <el-date-picker
                            v-model='form.date'
                            type='date'
                            placeholder='选择日期'>
                        </el-date-picker>
                    </el-form-item>
                </el-col>
                <el-col :span="1"  :offset="9">
                    <el-button  size="mini" @click="openSum" type="primary">统计汇总</el-button>
                </el-col>
            </el-row>
        </el-form>
        <div
            slot='table'
        >
            <el-table
                stripe
                ref="table"
                size='mini'
                :data='list'
                :highlight-current-row='true'
                @row-click="detailAnalysis"
                :height='baseOption.useHeight/2 - 5'
                v-if="(form.deviceType === 'pre'||form.deviceType === 'ins') && baseOption.queried==true"
            >
                <el-table-column
                    width='50'
                    align='center'
                    label='序号'>
                    <template slot-scope='scope'>
                        {{scope.$index+1}}
                    </template>
                </el-table-column>
                <el-table-column
                    prop='deviceName'
                    align='center'
                    label='名称'>
                </el-table-column>
                <el-table-column
                    v-if="form.deviceType == 'ins'"
                    align='center'
                    label='日供水量估计'>
                    <template slot-scope='scope'>
                        {{scope.row.avgValue * 24 | numFormat }}
                    </template>
                </el-table-column>
                <el-table-column
                    align='center'
                    label='最大值'>
                    <template slot-scope='scope'>
                        {{scope.row.maxValue | numFormat }}
                    </template>
                </el-table-column>
                <el-table-column
                    prop='minValueTime'
                    align='center'
                    width='180'
                    label='最大值时间'>
                </el-table-column>
                <el-table-column
                    align='center'
                    label='最小值'>
                    <template slot-scope='scope'>
                        {{scope.row.minValue | numFormat }}
                    </template>
                </el-table-column>
                <el-table-column
                    prop='minValueTime'
                    align='center'
                    width='180'
                    label='最小值时间'>
                </el-table-column>
                <el-table-column
                    align='center'
                    label='平均值'>
                    <template slot-scope='scope'>
                        {{Number(scope.row.avgValue) | numFormat }}
                    </template>
                </el-table-column>
                <el-table-column
                    align='center'
                    label='重点时段最大值'>
                    <template slot-scope='scope'>
                        {{scope.row.focusMaxValue | numFormat }}
                    </template>
                </el-table-column>
                <el-table-column
                    prop='focusMaxValueTime'
                    align='center'
                    width='180'
                    label='重点时段最大值时间'>
                </el-table-column>
                <el-table-column
                    align='center'
                    label='重点时段最小值'>
                    <template slot-scope='scope'>
                        {{scope.row.focusMinValue | numFormat }}
                    </template>
                </el-table-column>
                <el-table-column
                    prop='focusMinValueTime'
                    align='center'
                    width='180'
                    label='重点时段最小值时间'>
                </el-table-column>
                <el-table-column
                    align='center'
                    label='重点时段平均值'>
                    <template slot-scope='scope'>
                        {{scope.row.focusAvgValue | numFormat }}
                    </template>
                </el-table-column>
                <el-table-column
                    align='center'
                    label='异常率'>
                    <template slot-scope='scope'>
                        {{scope.row.abnormalRate | percentageFormat }}
                    </template>
                </el-table-column>
            </el-table>
            <el-table
                @row-click="detailAnalysis"
                :highlight-current-row='true'
                stripe
                ref="table"
                size='mini'
                :data='list'
                :height='baseOption.useHeight/2 - 5'
                v-if="(form.deviceType === 'acc'||form.deviceType === 'grp')&&baseOption.queried===true"
            >
                <el-table-column
                    align='center'
                    width='50'
                    label='序号'>
                    <template slot-scope='scope'>
                        {{scope.$index+1}}
                    </template>
                </el-table-column>
                <el-table-column
                    prop='deviceName'
                    align='center'
                    label='名称'>
                </el-table-column>
                <el-table-column
                    align='center'
                    label='日供水量'>
                    <template slot-scope='scope'>
                        {{scope.row.waterSupply | numFormat }}
                    </template>
                </el-table-column>
                <el-table-column
                    align='center'
                    label='初始值'>
                    <template slot-scope='scope'>
                        {{scope.row.startValue | numFormat }}
                    </template>
                </el-table-column>
                <el-table-column
                    prop='startValueTime'
                    align='center'
                    width='180'
                    label='初始值时间'>
                </el-table-column>
                <el-table-column
                    align='center'
                    label='截止值'>
                    <template slot-scope='scope'>
                        {{scope.row.endValue | numFormat }}
                    </template>
                </el-table-column>
                <el-table-column
                    prop='endValueTime'
                    align='center'
                    width='180'
                    label='截止值时间'>
                </el-table-column>
                <el-table-column
                    align='center'
                    label='重点时段供水量'>
                    <template slot-scope='scope'>
                        {{scope.row.focusWaterSupply | numFormat }}
                    </template>
                </el-table-column>
                <el-table-column
                    align='center'
                    label='重点时段初始值'>
                    <template slot-scope='scope'>
                        {{scope.row.focusStartValue | numFormat }}
                    </template>
                </el-table-column>
                <el-table-column
                    align='center'
                    width='180'
                    prop='focusStartValueTime'
                    label='重点时段初始值时间'>
                </el-table-column>
                <el-table-column
                    align='center'
                    label='重点时段截止值'>
                    <template slot-scope='scope'>
                        {{scope.row.focusEndValue | numFormat }}
                    </template>
                </el-table-column>
                <el-table-column
                    align='center'
                    width='180'
                    prop='focusEndValueTime'
                    label='重点时刻截止值时间'>
                </el-table-column>
                <el-table-column
                    align='center'
                    label='异常率'>
                    <template slot-scope='scope'>
                        {{scope.row.abnormalRate | percentageFormat }}
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <el-row slot='chart' class='full-height'>
           <el-col :span="8" class='full-height report-chart-item' >
             <div class="full-height" v-if="currentConfig">
               <chart :class="{'config-table': configTipMessage}"  :chart-data='currentHistoryData' :draw='detailAnalysisDraw' ref='detailAnalysisChart'/>
               <div class="config-tip" v-if="configTipMessage"><i class="el-icon-warning"></i> {{configTipMessage}}</div>
             </div>
             <el-row v-else type="flex" justify="center" align="middle" class='full-height'>
               <el-col :span="8"  class="no-config">此表未配置相关参数</el-col>
             </el-row>
          </el-col>
          <el-col :span="16" class='full-height report-chart-item'>
            <chart :chart-data='currentHistoryData' :draw='historyDraw' ref='historyChart'/>
          </el-col>
        </el-row>
        <el-dialog
              title="汇总信息"
              :visible.sync="sumDialogVisible"
              width="70%">
            <el-row class='full-height report-chart' style="height: 350px">
              <el-col :span='12' class='full-height report-chart-item'>
                <chart :chart-data='list' :draw='dailyDraw' ref='dailyChart'/>
              </el-col>
              <el-col :span='12' class='full-height report-chart-item'>
                <chart :chart-data='list' :draw='focusDraw' ref='focusChart'/>
              </el-col>
            </el-row>
        </el-dialog>
    </search-chart>
</template>
<script>
import mixin from '@/mixin/report';
import reportResource from '@/resource/report';

export default {
  mixins: [mixin],
  name: 'reportDaily',
  data () {
    return {
    };
  },
  methods: {
    expt () {
      let type = this.form.deviceType;
      let startDate = moment(this.form.date).format('YYYY-MM-DD');
      return reportResource.exportDayReport(type, startDate);
    },
    search () {
      let form = this.form;
      let startDate = moment(form.date).format('YYYY-MM-DD');
      this.baseOption.queried = false;
      reportResource.getDayReportByDeviceType(form.deviceType, startDate).then(({data}) => {
        this.baseOption.queried = true;
        this.list = data;
        let first = this.list[0];
        if (first) {
          this.$nextTick(() => {
            this.detailAnalysis(first);
            this.$refs.table.setCurrentRow(first); //  高亮当前行
          });
        }
      })
    }
  },
  mounted () {
    delete this.dates;
  }
};
</script>
