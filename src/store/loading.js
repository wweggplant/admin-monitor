/**
 * Created by liuyue on 2016/12/28.
 */

export default {
  state: {
    showLoading: false,
    loadingSwitch: true,
    loadingMessage: '正在努力为您加载，请稍候...'
  },
  mutations: {
    showLoading (state) {
      state.showLoading = true;
    },
    hideLoading (state) {
      state.showLoading = false;
    },
    openLoading (state) {
      state.loadingSwitch = true;
    },
    closeLoading (state) {
      state.loadingSwitch = false;
    },
    setLoadingMessage (state, message) {
      state.loadingMessage = message;
    }
  },
  getters: {},
  actions: {
    loading ({ commit, state }, {promise, message}) {
      let oldMessage = state.loadingMessage;
      commit('showLoading');
      commit('setLoadingMessage', message);
      // 购物 API 接受一个成功回调和一个失败回调
      promise.then(() => {
        commit('hideLoading');
        commit('setLoadingMessage', oldMessage);
      }).catch(() => {
        commit('hideLoading');
        commit('setLoadingMessage', oldMessage);
      });
    }
  },
};
