import {base} from './base';

export default function (vm) {
  // 拦截器
  base.interceptors.request.use(function (config) {
    vm.$store.commit('showLoading');
    return config;
  }, function (error) {
    vm.$store.commit('hideLoading');
    return Promise.reject(error);
  });
  base.interceptors.response.use(response => {
    vm.$store.commit('hideLoading');
    return response;
  }, function (error) {
    vm.$store.commit('hideLoading');
    vm.$message({
      type: 'error',
      message: '请求错误'
    });
    return Promise.reject(error);
  });
}
