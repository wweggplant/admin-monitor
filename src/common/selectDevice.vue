<template>
    <div>
        <el-form-item label='已选设备'>
            <tag :style='{width:inputWidth}' :current-high-light='currentHighLight' @remove='_remove' :tags='device' prop-name='deviceName' key-id='deviceId' />
        </el-form-item>
        <el-form-item>
            <el-button size='mini' type='primary' @click='openDeviceModel' >选择设备</el-button>
        </el-form-item>
        <device-model :max-types='maxTypes' :include-types='includeTypes'  ref='device' :max-count='maxCount' :show.sync='showDeviceModel' :list='device'  @confirm='_confirm'/>
    </div>
</template>
<script>
import mixin from '@/mixin/selectDevice';
export default {
  mixins: [mixin]
};
</script>
