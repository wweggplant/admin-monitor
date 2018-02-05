import filters from '@/filters/index';
import monent from 'moment';

export default {
  filters,
  data () {
    return {
      baseOption: {
        useHeight: 0,
        init: true,
        queried: false,
      }
    }
  },
  methods: {
    openHistoryModelDaysOffset (deviceId, time, DaysOffset) {
      let time2 = monent(time).add(DaysOffset, 'd');
      let startTime = null;
      let endTime = null;
      if (time2.isAfter(time)) {
        startTime = filters.format(time);
        endTime = filters.format(time2);
      } else {
        startTime = filters.format(time2);
        endTime = filters.format(time);
      }
      this.$store.dispatch('historyModelOpen', {deviceId, startTime, endTime});
    }
  },
  mounted () {
    this.$nextTick(() => {
      let searchDiv = document.querySelector('.search-condition');
      let offset = (searchDiv ? searchDiv.clientHeight : 0) + 100;
      this.baseOption.useHeight = document.documentElement.clientHeight - offset;
    });
  }
}
