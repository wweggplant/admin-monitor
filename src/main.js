import Vue from 'vue';
import bus from '@/utils/bus';
import App from './App';
import router from './router';
import Vuex from 'vuex';
import vuexStore from './store/store';
import filters from './filters/index';
import ElementUI from 'element-ui';
import '@/assets/css/theme/index.css';// 默认主题
import '@/assets/css/iconfont.css';// 默认主题
// 事件总线
Object.defineProperties(Vue.prototype, {
  $bus: {
    get: function () {
      return bus
    }
  }
});
Vue.use(ElementUI);
Vue.use(Vuex);
let store = new Vuex.Store(vuexStore);
new Vue({
  router,
  store,
  render: h => h(App),
  filters
}).$mount('#app');
