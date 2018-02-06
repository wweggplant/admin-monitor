<template>
    <div class='sidebar'>
        <el-menu :default-active='onRoutes' class='el-menu-vertical-demo el-menu--dark' background-color='#324157' text-color='#fff' unique-opened router>
            <template v-for='item in items'>
                <template v-if='item.subs'>
                    <el-submenu :index='item.index'>
                        <template slot='title'><i :class='item.icon'></i>{{ item.name }}</template>
                        <el-menu-item v-for='(subItem,i) in item.subs' :key='subItem.route' :index='subItem.index'>{{ subItem.name }}</el-menu-item>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index='item.index'  :key='item.route?item.route:item.index'>
                        <i :class='item.icon'></i>{{ item.name }}
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
    </div>
</template>

<script>
export default {
  data () {
    return {
      items: [
        /*
        {
          icon: 'el-icon-shishijiance iconfont',
          index: '1',
          name: '数据实时监测',
          subs: [
            {
              index: 'realTimeMonIndex',
              route: '/realTimeMonIndex',
              name: '测点实时数据'
            },
            {
              index: 'DMAmonitor',
              name: 'DMA实时监测',
              route: '/DMAmonitor'
            },
            {
              index: 'mapMonitor',
              route: '/mapMonitor',
              name: '地图集成'
            }
          ]
        },
        {
          icon: 'el-icon-lishichaxun iconfont',
          index: '2',
          name: '历史数据查询',
          subs: [
            {
              index: 'singleSensor',
              route: '/singleSensor',
              name: '单传感器多时段'
            },
            {
              index: 'mutiSensor',
              name: '多传感器单一时段'
            }
          ]
        },
        {
          icon: 'el-icon-baobiaobiaoweiguanli iconfont',
          index: '3',
          name: '报表与统计分析',
          subs: [
            {
              index: 'reportDaily',
              route: '/reportDaily',
              name: '日报表'
            },
            {
              index: 'reportSummary',
              route: '/reportSummary',
              name: '自定义时段汇总'
            },
            {
              index: 'reportDetail',
              route: '/reportDetail',
              name: '自定义时段明细'
            }
          ]
        },
        */
        {
          icon: 'el-icon-shebeiguanli iconfont',
          index: 'deviceManageIndex',
          name: '列表',
          subs: [
            {
              index: 'listByPage',
              route: '/listByPage',
              name: '分页列表'
            },
            {
              index: 'listChart',
              route: '/listChart',
              name: '图表列表'
            },
            {
              index: 'reportDetail',
              route: '/reportDetail',
              name: '自定义时段明细'
            }
          ]
        },
        {
          icon: 'el-icon-Group iconfont',
          index: 'alertIndex',
          name: '异常报警',
        },
        {
          icon: 'el-icon-Group iconfont',
          index: 'mapMonitor',
          name: '地图',
        },
      ]
    }
  },
  mounted () {
    if (this.$route.path !== '/') {
      if (this.$route.path !== '/home') {
      // debugger;
        this.$store.commit('add_tabs', {route: this.$route.path, name: this.$route.meta.name, component: this.$route.meta.component});
      }
      this.$store.commit('set_active_index', this.$route.path);
    } else {
      this.$store.commit('set_active_index', '/');
      this.$router.push('/');
    }
  },
  computed: {
    options () {
      return this.$store.state.tab.options;
    },
    onRoutes () {
      return this.$route.path.replace('/', '');
    }
  },
  methods: {
  }
}
</script>

<style lang='less' scoped>
    .sidebar{
        display: block;
        position: absolute;
        width: 200px;
        left: 0;
        top: 60px;
        bottom:0;
        background: #242f42;
    }
    .sidebar > ul {
        height:100%;
    }
</style>
