/**
 * tab列表
 */
import VAR from '@/const/common';

export default {
  state: {
    options: [],
    activeIndex: VAR.ROUTE.DEFAULT_INDEX_PATH,
  },
  mutations: {
    // 添加tabs
    add_tabs (state, data) {
      if (data.route === '/home') {
        return;
      }
      this.state.tab.options.push(data);
    },
    // 删除tabs
    delete_tabs (state, route) {
      let index = 0;
      for (let option of state.options) {
        if (option.route === route) {
          break;
        }
        index++;
      }
      this.state.tab.options.splice(index, 1);
    },
    // 设置当前激活的tab
    set_active_index (state, index) {
      this.state.tab.activeIndex = index;
    },
  }
};
