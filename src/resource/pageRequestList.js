import _ from 'lodash';

window.page_requests = [];
export default {
  clear () {
    window.page_requests = [];
  },
  abort () {
    _(window.page_requests).forEach(item => {
      item.source.cancel();
    });
    this.clear();
  },
  push (request) {
    window.page_requests.push(request);
  },
  hasPageRequestDone () {
    return window.page_requests.length === 0;
  },
  removeById (requestId) {
    _.remove(window.page_requests, item => item.requestId === requestId);
  }
};
