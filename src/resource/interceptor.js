/**
 *
 * 拦截器模块
 * @description 发送和接收请求的提前处理
 */

import PAGE_REQUESTS from './pageRequestList';
import Qs from 'qs';
const CancelToken = axios.CancelToken;

function setInterceptor (option) {
  if (!option || !option.request) option.request = config => config;
  if (!option || !option.requestError) option.requestError = error => Promise.reject(error);
  if (!option || !option.response) option.response = response => response;
  if (!option || !option.request) option.responseError = error => Promise.reject(error);

  axios.interceptors.request.use(option.request, option.requestError);
  axios.interceptors.response.use(option.response, option.responseError);
}

export default function resInterceptor (App) {
  // 禁止请求304缓存数据
  axios.defaults.headers.common['If-Modified-Since'] = 0;
  axios.defaults.headers.indexurl = location.pathname;

  // 当前page请求记录
  let previousRequests = {
    request (config) {
      let requestId = Math.random().toString(36).substr(2);
      let source = CancelToken.source();
      config.cancelToken = source.token;
      config.headers.requestId = requestId;
      PAGE_REQUESTS.push({
        source,
        requestId
      });
      return config;
    },
    response (response) {
      PAGE_REQUESTS.removeById(response.config.headers.requestId);
      return response;
    },
    responseError (error) {
      PAGE_REQUESTS.removeById(error.config.headers.requestId);
      return Promise.reject(error);
    },
  };

  // 通用loading
  let loading = {
    request (config) {
      App.$store.commit('showLoading');
      return config;
    },
    requestError (error) {
      return Promise.reject(error);
    },
    response (response) {
      if (PAGE_REQUESTS.hasPageRequestDone()) {
        App.$store.commit('hideLoading');
      }
      return response;
    },
    responseError (error) {
      if (PAGE_REQUESTS.hasPageRequestDone()) {
        App.$store.commit('hideLoading');
        App.$message({
          type: 'error',
          message: '请求错误'
        });
      }
      return Promise.reject(error);
    },
  };

  // 错误异常处理 2XX-成功,4XX-失败
  let errorInterceptor = {
    responseError (error) {
      if (!error.response) return Promise.reject(error);
      if (error.response.status === 401) {
        // TODO 清空数据，显示登录
        console.log('登录过期');
      } else {
        App.$vux.alert.show({
          title: '出问题啦',
          content: error.response.data.error,
        });
      }
      return Promise.reject(error);
    },
  };

  setInterceptor(previousRequests);
  setInterceptor(loading);
  setInterceptor(errorInterceptor);
}
/*
export function responseInterceptor (response) {
  return response.data;
}
*/
export function responseErrorInterceptor (error) {
  return Promise.reject(error);
}
export function requestFormInterceptor (config) {
  if (config.method === 'post') {
    config.data = Qs.stringify(config.data, { indices: false });
    config.headers['Content-Type'] = 'application/x-www-form-urlencoded';
  }
  return config;
}
