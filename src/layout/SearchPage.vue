<template>
  <div>
  <div class='search-condition'>
    <slot name='form'/>
  </div>
  <div class='muti-list '>
    <slot name='table'></slot>
    <el-row type='flex' justify='space-between'>
        <slot name='table-dropdown'/>
        <el-pagination
          @size-change='handleSizeChange'
          @current-change='handleCurrentChange'
          :current-page='page.pagination.current'
          :page-sizes='[10, 20, 30, 40]'
          :page-size='page.pagination.size'
          layout='total, sizes, prev, pager, next, jumper'
          :total='page.pagination.total'>
        </el-pagination>
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
    page: {
      type: Object,
      default: {
        pagination: {
          total: 0,
          current: 1,
          size: 10,
        },
        multipleSelection: [],
        isIndeterminate: false,
        checkAll: false,
      }
    },
    list: {
      type: Array,
      default: []
    }
  },
  methods: {
    handleCheckAllChange (val) {
      this.form.alertType = val ? this.list.map(item => item.value) : [];
      this.isIndeterminate = false;
    },
    handleCheckeAllChange (value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.list.length;
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.list.length;
    },
    handleSelectionChange (val) {
      this.page.multipleSelection = val;
    },
    resetForm (formName) {
      this.$refs[formName].resetFields();
    },
    handleCurrentChange (val) {
      this.page.pagination.current = val;
      this.$emit('search');
    },
    handleSizeChange (val) {
      this.page.pagination.size = val;
      this.$emit('search');
    },
  },
  mounted () {
    this.$emit('search');
  }
}
</script>
<style lang='less' scoped>
  .muti-list{
    >div{
      overflow-x:auto;
      overflow-y: hidden;
    }
  }
</style>
