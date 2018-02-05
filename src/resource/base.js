/**
 *
 * axios实例
 * @description 分别新建不同axios实例，实现不同的需求
 */
import Qs from 'qs';
import VAR from '@/const/common';
import {responseInterceptor, responseErrorInterceptor, requestFormInterceptor} from './interceptor';

let getBaseConfig = (config = {}) => {
  return Object.assign({
    baseURL: '/pm/',
    timeout: VAR.RESOURCE.REQUEST.timeout,
  }, config)
};
const base = axios.create(getBaseConfig({
  paramsSerializer (params) {
    return Qs.stringify(params, { indices: false })
  },
}));
base.interceptors.response.use(responseInterceptor, responseErrorInterceptor);
base.interceptors.request.use(requestFormInterceptor, responseErrorInterceptor);

export {base}
