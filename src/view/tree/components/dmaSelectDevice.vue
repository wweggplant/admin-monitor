<template>
    <div>
        <device-model :include-types='includeTypes'  ref='device' :max-count='maxCount' :show.sync='showDeviceModel' :list='device'  @confirm='_confirm'/>
    </div>
</template>
<script>
import mixin from '@/mixin/selectDevice';
export default {
  mixins: [mixin]
};
</script>
