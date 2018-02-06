<template>
    <div>
        <el-row>
            <el-col :span='24'>
                <select-device ref='select-device' :include-types='includeTypes'  :device.sync='device'  :confirm='addDevice'/>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span='24'>
              <dma-table  :type='type' :device='device'>
                <el-table-column
                  align='center'
                  label='操作'
                  slot="append"
                >
                  <template slot-scope='scope' >
                    <el-button type='text' size='mini' @click='removeDevice(scope.$index)'>删除</el-button>
                  </template>
                </el-table-column>
              </dma-table>
            </el-col>
        </el-row>
    </div>
</template>
<script>
import filters from '@/filters/index';
import dmaTable from './dmaTable';
import selectDevice from './dmaSelectDevice';
import deviceOption from '@/const/device';
import mixins from '@/mixin/device';

export default {
  mixins: [mixins],
  filters: filters,
  data () {
    return {
    };
  },
  computed: {
  },
  components: {
    selectDevice, dmaTable
  },
  props: {
    includeTypes: {
    },
    type: {
      type: String
    },
    device: {
      type: Array,
      default: []
    }
  },
  methods: {
    removeDevice (index) {
      this.device.splice(index, 1);
      this.$emit('update:device', this.device);
    },
    addDevice (list) {
      let vm = this;
      if (list.every(item => filters.getDevTypeById(item.deviceId) === vm.type)) {
        list.forEach(item => {
          vm.getDeviceById(item.deviceId).then(d => {
            Object.assign(item, d);
          });
        });
        this.$emit('update:device', list);
      } else {
        let name = deviceOption.type[this.type].name;
        this.$message({
          message: `只能选择${name}`,
          type: 'error'
        });
      }
    },
    openDeviceModel () {
      this.$refs['select-device'].openDeviceModel();
    }
  }
};
</script>
