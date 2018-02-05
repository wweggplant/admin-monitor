/**
 * Created by liuyue on 2016/12/26.
 */

import loading from './loading';
import tab from './tab';
import history from './history';

export default {
  modules: {
    loading,
    tab,
    history
    /*
      loginmini,
      editpwd,
      user,
      supplier,
      reloadList,
      validate,
      passenger,
      train
    */
  },
  state: {
    userInfo: {},
    useHeight: 0
  },
  mutations: {
    toggleSidebar (state) {
      state.sidebarMini = !state.sidebarMini;
    },
    // 设置详情信息
    save_detail_info (state, info) {
      this.state.userInfo = info;
    }
  },
  getters: {
  }
};
