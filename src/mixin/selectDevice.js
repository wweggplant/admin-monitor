import deviceModel from '@/components/common/DeviceModel';
import Tag from '@/components/common/Tag';

export default {
  components: {
    deviceModel, Tag
  },
  data () {
    return {
      showDeviceModel: false
    };
  },
  props: {
    includeTypes: {
    },
    inputWidth: {
      type: String,
      default: '20em'
    },
    currentHighLight: {
      default: true,
      type: Boolean
    },
    device: {
      type: Array,
      default: []
    },
    maxCount: {
      type: Number
    },
    maxTypes: {
      type: Number,
      default: Infinity
    },
    confirm: {
      type: Function
    },
    remove: {
      type: Function
    }
  },
  methods: {
    openDeviceModel () {
      this.$refs.device.handleTrigger(true);
    },
    _remove (device, list) {
      this.$emit('update:device', list);
      this.remove && this.remove(device, list);
    },
    _confirm (val) {
      this.confirm && this.confirm(val);
    }
  }
};
