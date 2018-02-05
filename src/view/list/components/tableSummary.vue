<template>
    <el-table
        slot='table'
        stripe
        size='mini'
        :data='list'
        :height='height'
    >
        <el-table-column
            prop='deviceId'
            label='id'
            align='center'
            width='100'>
        </el-table-column>
        <el-table-column
            prop='deviceName'
            align='center'
            label='名称'>
        </el-table-column>
        <el-table-column
            v-if="deviceType == 'ins'"
            align='center'
            label='日供水量估计'>
            <template slot-scope='scope'>
                {{scope.row.avgValue * 24 | numFormat }}
            </template>
        </el-table-column>
        <el-table-column
            v-if="deviceType == 'acc'||deviceType == 'grp'"
            align='center'
            label='日供水量'>
            <template slot-scope='scope'>
                {{scope.row.dailySupport | numFormat }}
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
                {{scope.row.avgValue | numFormat }}
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
        <slot name='append'></slot>
    </el-table>
</template>
<script>
import filters from '@/filters/';
export default {
  filters,
  props: {
    list: {
      type: Array,
      default: []
    },
    deviceType: {
      type: String,
      default: ''
    },
    height: {
      type: Number,
      default: 1000
    }
  }
};
</script>

