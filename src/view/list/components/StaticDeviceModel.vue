<template>
  <el-dialog
    :title='title'
    :visible='show'
    custom-class='common-dialog'
    :before-close='handleClose'
    width='55%'>
    <el-form  inline  size='mini'  ref='form' :model='device' label-width='40px'>
      <el-row>
        <el-col :span='8' >
          <el-form-item label='类型' prop='deviceType'>
            <el-select
              v-model='deviceType'
              placeholder='选择类型'
              style="width: 185px"
            >
              <el-option
                v-for='type in options'
                :key='type.value'
                :label='type.label'
                :value='type.value'>
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span='7'>
          <el-form-item label='名称' prop='deviceName'>
            <el-input v-model="device.deviceName" placeholder='输入名称'></el-input>
          </el-form-item>
        </el-col>
        <el-col :span='8'>
          <el-form-item label-width='80px' label='生产厂家' prop='deviceCompany'>
            <el-input v-model="device.deviceCompany" placeholder='输入生产厂家'></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span='7'>
          <el-form-item label='尺寸' prop='deviceSize'>
            <el-input v-model="device.deviceSize" placeholder='输入尺寸'></el-input>
          </el-form-item>
        </el-col>
        <el-col :span='7'>
          <el-form-item label='型号' prop='deviceModel'>
            <el-input v-model="device.deviceModel" placeholder='输入型号'></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

    <span slot='footer' class='dialog-footer'>
      <el-button size='mini' @click='handleTrigger(false)'>取 消</el-button>
      <el-button size='mini' type='primary' @click='confirm'>保 存</el-button>
    </span>
  </el-dialog>

</template>

<script>
  import opts from '@/const/device';
  import model from '@/mixin/model';
  import commonLogic from '@/common/index';
  import deviceRes from '@/resource/device';

  export default {
    mixins: [model],
    data () {
      const options = Object.entries(opts.type).map(([key, device]) => {
        return {label: device.name, value: key}
      });
      return {
        options,
        deviceType: 'pre',
        device: {},
      };
    },
    props: {
      title: {
        type: String,
        default: ''
      },
    },
    methods: {
      open (device) {
        this.deviceType = commonLogic.getDevTypeById(device.deviceId);
        this.device = Object.assign({}, device);
        this.handleTrigger(true);
      },
      confirm () {
        this.addOrSave();
        this.handleTrigger(false);
      },
      addOrSave () {
        let method = 'updateFlowDevice';
        if (this.deviceType === 'pre') {
          method = 'updatePreDevice';
        }
        deviceRes[method](this.device).then(() => {
          this.$message({
            type: 'success',
            message: '操作成功'
          });
          this.refresh();
        }).catch(() => {
          this.$message({
            type: 'error',
            message: '操作失败'
          });
        })
      },
      refresh () {
        this.handleTrigger(false);
        this.$emit('refresh');
      }
    },
    mounted () {
    }
  };
</script>
