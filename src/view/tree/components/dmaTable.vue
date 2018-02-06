<template>
    <el-table
        size='mini'
        class='search-list'
        :data='deviceData'
        ref='table'
        row-key='dmaId'
        :highlight-current-row='true'
        @selection-change='handleSelectionChange'
    >
        <el-table-column
            v-if='isSelection'
            :reserve-selection='isSelection'
            type='selection'
            width='55'>
        </el-table-column>
        <template v-if='propsTables[type]'>
            <el-table-column
                v-for='(item,index) in propsTables[type][tableType]'
                :key='index'
                :label='item.showName'
                :width='item.width'
                align='center'>
                <template slot-scope='scope'>
                    <template v-if="item.filter==='numFormat'">
                        {{scope.row[item.name] | numFormat}}
                    </template>
                    <template v-else-if="item.filter==='percentageFormat'">
                        {{scope.row[item.name] | percentageFormat}}
                    </template>
                    <template v-else-if="item.filter==='date_foramt'">
                        {{scope.row[item.name] | format('YYYY-MM-DD')}}
                    </template>
                    <template v-else>
                        {{scope.row[item.name]}}
                    </template>
                </template>
            </el-table-column>
        </template>
        <slot name='append'></slot>
    </el-table>
</template>
<script>
import commonLogic from '@/common';
import CONST from '@/const/device';
import filters from '@/filters/index';
export default {
  name: 'dmaTable',
  filters,
  data () {
    return {
      propsTables: CONST.type
    };
  },
  props: {
    isSelection: {
      type: Boolean,
      default: false
    },
    type: {
      type: String
    },
    device: {
      type: Array,
      default: []
    },
    tableType: {
      type: String,
      default: 'dmaAttrs'
    },
    refName: {
      type: String,
    }
  },
  computed: {
    deviceData () {
      return commonLogic.realDataHandle(this.device);
    }
  },
  methods: {
    handleSelectionChange (val) {
      this.$emit('dma-select-change', val, this.refName);
    }
  }
};
</script>
