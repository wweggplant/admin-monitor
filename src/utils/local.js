/**
 * store.js 离线存储
 * @description 操作localStorage的数据
 * @module utils/store
 */

export default (function () {
  const store = window.localStorage;

  function get (key) {
    let val = store[key];
    return val ? JSON.parse(val) : null;
  }

  function set (key, val) {
    store[key] = JSON.stringify(val);
  }

  function clear (key) {
    delete store[key];
  }

  return {
    get: get,
    set: set,
    clear: clear
  };
})();
