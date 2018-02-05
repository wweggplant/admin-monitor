import Vue from 'vue';
import Router from 'vue-router';
import VAR from '@/const/common';
Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/home',
      name: '首页',
      redirect: VAR.ROUTE.DEFAULT_INDEX_PATH,
      component: resolve => require(['../view/layout/Home.vue'], resolve),
      children: [
        /*
        {
          path: '/mapMonitor',
          meta: {component: 'mapMonitor', name: '地图集成'},
          component: resolve => require(['../components/page/realTimeMon/map.vue'], resolve)
        },
        {
          path: '/realTimeMonIndex',
          meta: {component: 'realTimeMonIndex', name: '测点实时数据'},
          component: resolve => require(['../components/page/realTimeMon/Index.vue'], resolve)
        },
        {
          path: '/singleSensor',
          meta: {name: '单传感器多时段', component: 'singleSensor'},
          component: resolve => require(['../components/page/history/single.vue'], resolve) // vue-datasource组件
        },
        {
          path: '/mutiSensor',
          meta: {name: '多传感器单时段', component: 'mutiSensor'},
          component: resolve => require(['../components/page/history/muti.vue'], resolve)
        },
        {
          path: '/DMAManage',
          meta: {name: 'DMA管理', component: 'DMAManage'},
          component: resolve => require(['../components/page/DMA/index.vue'], resolve)
        },
        {
          path: '/DMAmonitor',
          meta: {name: 'DMA实时监测', component: 'DMAmonitor'},
          component: resolve => require(['../components/page/DMA/monitor.vue'], resolve)
        },
        {
          path: '/reportSummary',
          meta: {name: '自定义时段汇总', component: 'reportSummary'},
          component: resolve => require(['../components/page/report/index.vue'], resolve)// Vue-Quill-Editor组件
        },
        {
          path: '/reportDetail/',

          meta: {name: '自定义时段明细', component: 'reportDetail'},
          component: resolve => require(['../components/page/report/detail.vue'], resolve)// Vue-Quill-Editor组件
        },
        {
          path: '/reportDaily',
          meta: {name: '日报表', component: 'reportDaily'},
          component: resolve => require(['../components/page/report/daily.vue'], resolve)// Vue-Quill-Editor组件
        },
        {
          path: '/reportDMADaily',
          meta: {name: 'DMA日报表', component: 'reportDMADaily'},
          component: resolve => require(['../components/page/report/DMAdaily.vue'], resolve)// Vue-Quill-Editor组件
        },
        {
          path: '/reportDMADetail',
          name: 'reportDMADetail',
          meta: {name: 'DMA自定义时段明细', component: 'reportDMADetail'},
          component: resolve => require(['../components/page/report/DMAdetail.vue'], resolve)
        },
        {
          path: '/reportDMAIndex',
          meta: {name: 'DMA自定义时段汇总', component: 'reportDMAIndex'},
          component: resolve => require(['../components/page/report/DMAindex.vue'], resolve)
        },
        {
          path: '/alertIndex',
          name: 'alertIndex',
          meta: {name: '异常报警', component: 'alertIndex'},
          component: resolve => require(['../components/page/alert/index.vue'], resolve)// vue-schart组件
        },
        {
          path: '/HistoryModel',
          name: 'HistoryModel',
          meta: {name: 'HistoryModel', component: 'HistoryModel'},
          component: resolve => require(['@/components/page/test/historyModel'], resolve)// vue-schart组件
        },
        {
          path: '/deviceManageIndex',
          name: 'deviceManageIndex',
          meta: {name: '设备管理', component: 'deviceManageIndex'},
          component: resolve => require(['@/components/page/device/index'], resolve)// vue-schart组件
        }
        */
        {
          path: '/listByPage',
          meta: {component: 'listByPage', name: '分页列表'},
          component: resolve => require(['@/view/list/index'], resolve)
        },
      ]
    },
    {
      path: '/login',
      component: resolve => require(['@/view/Login'], resolve)
    },
  ]
});
