<template>
    <bm-overlay
        ref='customMarker'
        :class='{marker:true,active:true}'
        pane='markerPane'
        @click="this.$emit('markerClick')"
        @draw='draw'>
        <div v-text='text' @click='handleClick'></div>

        <slot></slot>
    </bm-overlay>
</template>

<script>
import {BmOverlay} from 'vue-baidu-map'

export default {
  props: ['text', 'position', 'active'],
  components: {
    BmOverlay
  },
  watch: {
    position: {
      handler () {
        this.$refs.customMarker.reload()
      },
      deep: true
    }
  },
  methods: {
    handleClick () {
      global.alert('Well done.')
    },
    draw ({el, BMap, map}) {
      const {lng, lat} = this.position
      const pixel = map.pointToOverlayPixel(new BMap.Point(lng, lat))
      el.style.left = pixel.x - 60 + 'px'
      el.style.top = pixel.y - 20 + 'px'
    }
  }
}
</script>

<style>
    .marker{
        position: absolute;
        font-size: 14px;
    }

</style>
