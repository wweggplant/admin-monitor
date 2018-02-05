export default {
  props: {
    show: false
  },
  methods: {
    handleClose () {
      this.handleTrigger(false);
    },
    handleTrigger (isShow) {
      this.$emit('update:show', !!isShow);
    },
  }
}
