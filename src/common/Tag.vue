<template>
    <a :class="{'tags__actived':active,'tags_current-high-light':currentHighLight}"
       class='tags-container flex-box no-wrap  al-start al-center'
       href='#'
       @blur='active = false'
       @focus='active = true'
       @keyup.left='moveCursor(-1)'
       @keyup.right='moveCursor(+1)'
    >
        <el-tag
            v-if='tags.length > 0' v-for='(item,index) in tags'  :key='item[keyId]'
            @keyup.delete='remove(item)'   @click.native.prevent='setCurrentTag(item)'
            class='u-tag'
            :class='{current:current === item ?true:false}'
            size='mini'
            @close.prevent='remove(item,tags)'
            closable>
            {{item[propName]}}
        </el-tag>
    </a>
</template>
<script>
export default {
  data () {
    return {
      current: null,
      active: false
    };
  },
  props: {
    propName: String,
    tags: Array,
    keyId: String,
    currentHighLight: {
      default: true,
      type: Boolean
    }
  },
  watch: {
    tags (val) {
      if (val.length > 0) {
        this.setCurrentTag(val[val.length - 1]);
      }
    }
  },
  methods: {
    remove (data) {
      console.log(data);
      let keyId = this.keyId;
      let tags = this.tags;
      tags.forEach((item, index) => {
        if (data[keyId] === item[keyId]) {
          tags.splice(index, 1);
        }
      });
      this.$emit('remove', data, tags);
    },
    setCurrentTag (item) {
      this.current = item;
      this.active = true;
    },
    moveCursor (moveVar) {
      if (this.active) {
        let key = this.keyId;
        let currentIndex = this.tags.findIndex(item => item[key] === this.current[key]);
        let newIndex = currentIndex + moveVar;
        newIndex = newIndex > this.tags.length - 1 ? this.tags.length - 1 : newIndex < 0 ? 0 : newIndex;
        this.current = this.tags[newIndex];
      }
    }
  },
  mounted () {
    let index = 0;
    let item = this.tags[index];
    if (item) {
      this.setCurrentTag(index, item);
    }
  }
};
</script>

<style lang='less' scoped>
    @import '~assets/css/common';
    .tags-container{
        padding:1px 2px;
        .border-solid();
        background-color: @white-color;
        border-radius: .3em;
        height:28px;
        width: 20em;
        box-sizing: border-box;
        overflow-y: hidden;
        cursor: pointer;
        &.tags__actived{
            border-color: @main-color;
            box-shadow: 0 0 2px @main-color;
        }
        &::-webkit-scrollbar
        {
            height: 0px;
        }
    }
    .u-tag-wrap{
        line-height: 20px;
        margin:0 5px;
    }
    .tags__actived.tags_current-high-light{
        .u-tag{
            cursor:pointer;
            &.current{
                .current-highlight();
                .el-tag__close{
                    .current-highlight();
                }
            }
        }
    }
</style>
