import {base} from './base';

import session from '@/utils/session';
import dmaResource from '@/resource/dma';

const signCallBack = (message) => {
  if (message === 'success') {
    return message;
  } else if (message === 'failture') {
    return Promise.reject(message);
  }
};
export default {
  getDMATree () {
    let dmaTree = session.get('dmaTree');
    return dmaTree ? Promise.resolve([dmaTree]) : dmaResource.getDmaById(1).then(([data, config, response]) => {
      session.set('dmaTree', data);
      return [data, config, response];
    });
  },
  //  根据dmaId获取dma树
  getDmaById (dmaId = 1) {
    return base.get('/dmamanager/getDmaById', {
      params: {
        dmaId
      }
    });
  },
  //  添加dma树节点
  addDmaNode ({parentId, dmaName} = {}) {
    return base.post('/dmamanager/addDmaNode', {parentId, dmaName});
  },
  //  （3）更新dma静态属性
  updateDmaAttr (dma = {}) {
    return base.post('/dmamanager/updateDmaAttr', dma).then(data => {
      return signCallBack(data);
    });
  },
  //  （4）根据dmaId删除dma节点及关联设备
  deleteDmaNodeByDmaId (dmaId) {
    return base.get('/dmamanager/deleteDmaNodeByDmaId', {
      params: {
        dmaId
      }
    })
  },
  //  （5）关联dma与设备
  relateDmaDevices (dmaId, deviceMap) {
    deviceMap = JSON.stringify(deviceMap);
    return base.post('/dmamanager/relateDmaDevices', {
      dmaId,
      deviceMap: deviceMap
    }).then(data => {
      return signCallBack(data);
    })
  },
  //  （6）根据dmaId获取dma关联设备的实时数据
  dmaRealtimeDataByDmaIds (Ids = []) {
    let dmaIds = `${Ids.join(',')}`;
    return base.post('/datamonitor/realtime/getDmaRealtimeDataByDmaIds', {
      dmaIds
    });
  },
  // 重命名
  updateDmaName (dmaId, dmaName) {
    return base.post('dmamanager/updateDmaName', {
      dmaId, dmaName
    }).then(data => {
      return signCallBack(data);
    })
  },
  saveDetail (dma, deviceMap) {
    return axios.all([this.updateDmaAttr(dma), this.relateDmaDevices(dma.dmaId, deviceMap)]);
  },
  updateDmaImgUrls (dmaId, urls) {
    return base.post('dmamanager/updateDmaImgUrls', {
      dmaId, urls
    }).then(data => {
      return signCallBack(data);
    })
  }

};
