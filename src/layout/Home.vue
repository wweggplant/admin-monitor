<template>
  <div class='wrapper'>
        <v-head></v-head>
        <v-sidebar></v-sidebar>
        <Loading/>
        <div class='content app-wrap'>
            <el-tabs
                class='tab'
                v-model='activeIndex'
                type='border-card'
                closable
                @tab-click='tabClick'
                v-if='options.length'
                @tab-remove='tabRemove'>
                    <el-tab-pane
                        :key='item.name'
                        v-for='(item, index) in options'
                        :label='item.name'
                        :name='item.route'>
                    </el-tab-pane>
            </el-tabs>
            <keep-alive :include='includeTabs' :exclude='excludeTabs'>
                <router-view class='content-wrap' >
                    <!-- 这里是会被缓存的视图组件，比如 Home！ -->
                </router-view>
            </keep-alive>
        </div>
        <alert-sync/>
        <history-model/>
    </div>
</template>

<script>
import vHead from './Header';
import vSidebar from './Sidebar';
import Loading from '@/components/common/Loading';
import alertSync from '@/components/common/alert/index';
import HistoryModel from '@/components/common/history/HistoryModel';
import {uniq, difference} from 'lodash';
export default {
  components: {
    vHead,
    vSidebar,
    Loading,
    alertSync,
    HistoryModel
  },
  data () {
    return {
      recordList: [],
      includeTabs: [],
      excludeTabs: []
    }
  },
  computed: {
    options () {
      this.getRecordList();
      this.getCachedTabs();
      return this.$store.state.tab.options;
    },
    activeIndex: {
      get () {
        return this.$store.state.tab.activeIndex;
      },
      set (val) {
        this.$store.commit('set_active_index', val);
      }
    }
  },
  watch: {
    '$route' (to) {
      let flag = false;
      for (let option of this.options) {
        if (option.route === to.path) {
          flag = true;
          this.$store.commit('set_active_index', '/' + to.path.split('/')[1]);
          break
        }
      }
      if (!flag) {
        this.$store.commit('add_tabs', {route: '/' + to.path.split('/')[1], name: to.meta.name, component: to.meta.component});
        this.$store.commit('set_active_index', '/' + to.path.split('/')[1]);
      }
    }
  },
  methods: {
    getRecordList () {
      const options = this.$store.state.tab.options;
      let recordList = [].concat(this.recordList, options.map(item => item.component));
      recordList = uniq(recordList);
      this.recordList = recordList;
    },
    getCachedTabs () {
      this.$nextTick(() => {
        this.includeTabs = this.options.map(item => item.component)
        this.excludeTabs = difference(this.recordList, this.includeTabs);
      });
    },
    // tab切换时，动态的切换路由
    tabClick (tab) {
      let path = this.activeIndex;
      // 用户详情页的时候，对应了二级路由，需要拼接添加第二级路由
      /* if (this.activeIndex === '/userInfo') {
          path = this.activeIndex + '/' + this.$store.state.userInfo.name;
        }
      */
      this.$router.push({path: path});
    },
    tabRemove (targetName) {
      let vm = this;
      // 首页不可删除
      this.$store.commit('delete_tabs', targetName);
      let list = this.$route.matched;
      list.forEach(item => {
        if (targetName === item.path) {
          vm.$route.meta.keepAlive = false;
        }
      });
      if (this.activeIndex === targetName) {
        // 设置当前激活的路由
        if (this.options && this.options.length >= 1) {
          this.$store.commit('set_active_index', this.options[this.options.length - 1].route);
          this.$router.push({path: this.activeIndex});
        } else {
          this.$router.push({path: '/'});
        }
      }
    }
  },
}
</script>
<style lang='less' scoped>
    .app-wrap {
        flex: 1;
        padding: 5px;
        overflow: hidden;
        height:100%;
        .content-wrap {
            height: calc(~'100% - 60px');
            overflow-y: auto;
        }
    }
    .tab{
        .el-tabs__content{
            display: none;
        }
    }

</style>
<style>
    .app-wrap .el-tabs--border-card>.el-tabs__content{
        display: none;
    }
</style>
