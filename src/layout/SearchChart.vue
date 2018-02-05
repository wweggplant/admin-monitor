<template>
    <div>
        <div class='search-condition'>
            <slot name='search'></slot>
        </div>
        <div class='muti-list data-display-layout '  :style='{height:`${useHeight}px`}'>
            <el-row  class='data-display-secition'>
                <slot name='table'></slot>
            </el-row>
            <el-row class='data-display-secition overflow-y-hidden'>
                <el-col :span='24' class='full-height overflow-y-hidden'>
                    <slot name='chart'></slot>
                </el-col>
            </el-row>
        </div>
        <slot></slot>
    </div>
</template>
<script>
export default {
  data () {
    return {};
  },
  props: {
    useHeight: {
      type: Number
    }
  },
  methods: {}
};
</script>
<style lang='less' scoped>
    .table-item{
        flex:0 0 25%;
    }
    .muti-list{
        >div{
            width: 100%;
            overflow-x:auto;
            overflow-y: hidden;
        }
    }
</style>
