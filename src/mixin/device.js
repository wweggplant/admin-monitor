import session from '@/utils/session';
import common from '@/common/';
import deviceResource from '@/resource/device';

export default {
  methods: {
    getDevice (deviceType = 'pre') {
      let device = session.get('device');
      return device ? Promise.resolve([device]) : deviceResource.all({type: deviceType}).then(([data, config, response]) => {
        session.set('device', data);
        return [data, config, response];
      });
    },
    getDeviceById (id) {
      return this.getDevice().then(([list]) => {
        let type = common.getDevTypeById(id);
        let data = list[type] || [];
        return data.filter(item => item.deviceId === id)[0];
      });
    }
  },
}
