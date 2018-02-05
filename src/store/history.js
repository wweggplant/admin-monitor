/*
 * 登录状态
 */
import commonLogic from '@/common/index';

export default {
  state: {
    show: false,
    title: '',
    startTime: null,
    endTime: null,
    deviceId: null,
  },
  mutations: {
    changeState (state, config = {}) {
      Object.entries(config).forEach(([name, value]) => {
        if (value) {
          state[name] = value;
        }
      });
      state.show = !!config.deviceId;
    }
  },
  actions: {
    historyModelClose ({commit}) {
      commit('changeState')
    },
    historyModelOpen ({commit}, {deviceId, startTime, endTime} = {}) {
      const title = commonLogic.getDevById(deviceId).deviceName;
      commit('changeState', {deviceId, title: title, startTime, endTime})
    }
  },
  getters: {
    historyState: state => state
  }
};
