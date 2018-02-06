<template>
    <el-dialog
        title='选择DMA'
        :visible='show'
        custom-class='common-dialog'
        :before-close='handleClose'
        width='55%'>
        <el-form class='search-condition' size='mini'>
            <el-row>
                <el-col :span='12' :offset='1'  >
                    <el-form-item label='已选DMA'>
                        <tag :tags='result' @remove='remove'  prop-name='dmaName' key-id='dmaId' />
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
        <el-table
            size='mini'
            class='search-list'
            :data='dma'
            style='width: 100%;max-height:30vh;overflow-y:auto;overflow-x:hidden'>
            <el-table-column
                prop='dmaName'
                label='名称'
                align='center'
            >
            </el-table-column>
            <el-table-column
                prop='dmaLocation'
                align='center'
                label='位置'>
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
import commonLogic from '@/common';
import Tag from '@/common/Tag';
import dmaResource from '@/resource/dma';

export default {
  name: 'dmaModel',
  components: {
    Tag
  },
  data () {
    return {
      type: '',
      result: [],
      dma: [],
    };
  },
  props: {
    show: {
      type: Boolean,
      default: false
    },
    list: {
      type: Array,
      default: []
    },
    maxCount: {
      type: Number,
      default: Infinity
    }
  },
  watch: {
    list (val) {
      this.result = [...val];
    }
  },
  methods: {
    handleClose () {
      this.handleTrigger(false);
    },
    handleTrigger (isShow) {
      this.$emit('update:show', !!isShow);
    },
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
      if (isMaxCount) {
        return this.$message({
          showClose: true,
          type: 'error',
          message: `最多选择${this.maxCount}个DMA`
        });
      }
      if (!this.result.some(item => item.dmaId === data.dmaId)) {
        this.result.push(data);
      }
    }
  },
  mounted () {
    this.result = [...this.list];
    dmaResource.getDMATree().then(([tree]) => {
      let list = [];
      commonLogic.iterTree([tree], (item) => {
        list.push(item);
      });
      this.dma = list;
    });
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
