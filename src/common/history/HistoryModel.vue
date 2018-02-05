<template>
  <el-dialog
    :title="state.title"
    custom-class='common-dialog history-dialog'
    :visible="state.show"
    :before-close='close'
    width="55%">
    <base-view ref="base" :device-id="state.deviceId"/>
  </el-dialog>
</template>

<script>
import baseView from './base';

export default {
  components: {
    baseView
  },
  data () {
    return {
      state: this.$store.getters.historyState,
    };
  },
  watch: {
    'state.show': function (val) {
      if (val) {
        this.$nextTick(() => {
          const base = this.$refs.base;
          base.history.dates = [this.$store.getters.historyState.startTime, this.$store.getters.historyState.endTime];
          base.historySearch();
        });
      }
    }
  },
  methods: {
    close () {
      this.$store.dispatch('historyModelClose');
    }
  }
};
</script>

<style lang="less">
.history-dialog{
  .el-dialog__header{
    padding:10px;
  }
}
</style>
