import CONST from '@/const/device';
import searchChart from '@/components/layout/searchChart';
import Chart from '@/components/common/Chart';
import base from '@/extend/base';

export default {
  extends: base,
  data () {
    return {
      list: [],
      form: {
        date: '2017-11-12 00: 00: 00',
        deviceType: 'pre',
        dates: ['2017-11-12 00: 00: 00', '2017-11-15 00: 00: 00'],
      },
      deviceTypeOptions: CONST.type
    };
  },
  components: {
    searchChart, Chart
  },
  methods: {
  },
  mounted () {
    this.search();
  }
}
