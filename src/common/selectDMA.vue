<template>
    <div>
        <el-form-item label='已选DMA'>
            <tag :current-high-light='currentHighLight' @remove='remove' :tags='dma' prop-name='dmaName' key-id='dmaId' />
        </el-form-item>
        <el-form-item>
            <el-button size='mini' type='primary' @click='openDMAModel' >选择DMA</el-button>
        </el-form-item>
        <dma-model   ref='dma' :max-count='maxCount' :show.sync='showDMAModel' :list='dma'  @confirm='_confirm'/>
    </div>
</template>
<script>
import dmaModel from '@/components/common/dmaModel';
import Tag from '@/components/common/Tag';

export default {
  components: {
    dmaModel, Tag
  },
  data () {
    return {
      showDMAModel: false
    };
  },
  props: {
    inputWidth: {
      type: String,
      default: '20em'
    },
    currentHighLight: {
      default: true,
      type: Boolean
    },
    dma: {
      type: Array,
      default: []
    },
    maxCount: {
      type: Number
    },
    confirm: {
      type: Function
    }
  },
  methods: {
    openDMAModel () {
      this.$refs.dma.handleTrigger(true);
    },
    remove (dma, list) {
      this.$emit('update:dma', list);
    },
    _confirm (val) {
      this.confirm && this.confirm(val);
    }
  },
  mounted () {
  }
};
</script>
