<template>
    <el-badge class='icon-wrap' v-popover:help>
        <i class='el-icon-question icon'></i>
        <el-popover
            ref='help'
            placement='bottom'
            width='300'
            trigger='click'>
            版权信息:XXXXXXX
        </el-popover>
    </el-badge>
</template>
<script>
export default {
  name: 'vue',
  data () {
    return {};
  },
  methods: {}
};
</script>
<style lang='less'>

</style>
