<template>
    <el-dialog
        title='选择设备'
        :visible='show'
        custom-class='common-dialog'
        :before-close='handleClose'
        width='55%'>
        <el-form class='search-condition' size='mini'>
            <el-row>
                <el-col :span='10'>
                    <el-form-item label='传感器类型'>
                        <el-select
                            size='mini'
                            v-model='type'
                            @change='changeData'
                            placeholder='请选择传感器类型'
                        >
                            <el-option
                                v-for='item in options'
                                :key='item.label'
                                :label='item.label'
                                :value='item.value'>
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span='12' :offset='1'  >
                    <el-form-item label='已选设备'>
                        <!-- <el-input   size='mini' :readonly='true'>
                             <el-tag slot='prepend' @close='remove(item)'  class='u-tag' size='mini' v-if='result.length > 0'  v-for='(item,index) in result' :key='item.id'   closable >{{item.deviceName}}</el-tag>
                         </el-input>-->
                        <tag :tags='result' @remove='remove'  prop-name='deviceName' key-id='deviceId' />
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
        <el-table
            size='mini'
            class='search-list'
            :data='device'
            width='100%'
            v-if='queried'
            style='width: 100%;max-height:30vh;overflow-y:auto;overflow-x:hidden'>
            <el-table-column
                prop='deviceTypeName'
                label='类别'
                align='center'
            >
            </el-table-column>
            <el-table-column
                prop='deviceName'
                label='名称'
                align='center'
            >
            </el-table-column>
            <el-table-column
                align='center'
                label='操作'>
                <template slot-scope='scope'>
                    <el-button type='text' size='mini' @click='add(scope.row)'>添加</el-button>
                </template>
            </el-table-column>
        </el-table>
        <span slot='footer' class='dialog-footer'>
          <el-button size='mini' @click='handleTrigger(false)'>取 消</el-button>
          <el-button size='mini' type='primary' @click='confirmSelect'>确 定</el-button>
        </span>
    </el-dialog>
</template>

<script>
import device from '@/mixin/device';
import model from '@/mixin/model';
import options from '@/const/device';
import commonLogic from '@/common';
import Tag from '@/common/Tag';

export default {
  mixins: [device, model],
  name: 'deviceModel',
  components: {
    Tag
  },
  data () {
    let opts = [];
    for (let p in options.type) {
      opts.push({label: options.type[p].name, value: p});
    }
    return {
      queried: false,
      type: '',
      result: [],
      device: [],
      options: opts,
      oldOptions: opts,
    };
  },
  props: {
    list: {
      type: Array,
      default: []
    },
    maxCount: {
      type: Number,
      default: Infinity
    },
    includeTypes: {
      type: Array,
      default: () => []
    },
    maxTypes: {
      type: Number,
      default: Infinity
    }
  },
  watch: {
    list (val) {
      this.result = [...val];
    },
    includeTypes () {
      this.updateData();
    }
  },
  methods: {
    confirmSelect () {
      this.$emit('confirm', this.result);
      this.handleTrigger(false);
    },
    remove (data, list) {
      console.log(list);
      this.result = list;
    },
    add (data) {
      let list = this.result;
      let isMaxCount = this.maxCount !== Infinity && list.length >= this.maxCount;
      let isMaxTypes = commonLogic.isOverDeviceTypes([data], list, this.maxTypes);
      if (isMaxCount) {
        return this.$message({
          showClose: true,
          type: 'error',
          message: `最多选择${this.maxCount}个设备`
        });
      }
      if (isMaxTypes) {
        return this.$message({
          showClose: true,
          type: 'error',
          message: `最多选择${this.maxTypes}种设备`
        });
      }
      if (!this.result.some(item => item.deviceId === data.deviceId)) {
        this.result.push(data);
      }
    },
    updateData () {
      let opts = this.oldOptions;
      if (this.includeTypes.length > 0) {
        this.options = opts.filter(item => !!this.includeTypes.find(i => i === item.value));
      } else {
        this.options = this.oldOptions;
      }
      if (this.options[0]) {
        this.type = this.options[0].value;
      }
      this.$nextTick(() => {
        this.changeData();
      });
    },
    changeData () {
      let vm = this;
      vm.queried = false;
      this.getDevice().then(([data]) => {
        vm.device = (() => {
          let d = [];
          if (data[vm.type]) {
            data[vm.type].forEach(item => {
              d.push(Object.assign(item, {deviceTypeName: options.type[vm.type].name, deviceType: vm.type}));
            });
          }
          return d;
        })();
        vm.queried = true;
      });
    },
  },
  mounted () {
    this.updateData();
  }
};
</script>
<style lang='less' scoped>
    .search-condition{
        padding-bottom: 5px;
    }
    .selected-device{
        width: 30em;
        display: inline-block;
    }
</style>
