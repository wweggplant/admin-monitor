<template>
  <el-form size="mini">
    <el-row style="height: 200px">
      <el-col :span="12">
        <el-row>
          <el-col :span='24' >
            <el-form-item label='选择时段'>
              <el-date-picker
                @change="historySearch"
                class="date-picker"
                size='mini'
                v-model='history.dates'
                type='datetimerange'
                range-separator='至'
                start-placeholder='开始日期'
                end-placeholder='结束日期'>
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <el-card :body-style="{padding: '10px' }" class="box-card" v-if="history.statistics.length > 0">
                <h4>时段数据统计结果</h4>
                <div v-for="item in history.statistics">{{item.name}}：{{item.value}}{{history.unitName}}</div>
            </el-card>
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="12">
        <el-table
          :height="200"
          stripe
          size='mini'
          :data="history.list"
        >
          <el-table-column
            prop='0'
            label='时间'
            align='center'
            width='180'>
            <template slot-scope='scope'>
              {{scope.row[0] | format }}
            </template>
          </el-table-column>
          <el-table-column
            align='center'
            label='读数'>
            <template slot-scope='scope'>
              {{scope.row[1] | numFormat('0.000') }}
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <el-row style="height: 300px">
      <chart :chart-data='history.list' :draw='historyDraw' ref='historyChart'/>
    </el-row>
  </el-form>
</template>

<script>
  import mixin from '@/mixin/history';

  export default {
    mixins: [mixin],
    components: {
    },
    data () {
      return {

      };
    },
    methods: {
      search () {

      }
    },
    mounted () {
      this.history.chartTitle = this.chartTitle;
    }
  };
</script>

<style lang="less" scoped>
  .box-card,
  .date-picker{
    width: 93% !important;
  }
  .box-card{
    height: 132px;
  }
</style>
