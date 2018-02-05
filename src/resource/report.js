import { base } from './base';

export default {
  getReportSumByDeviceType: function (deviceType, startTime, endTime) {
    return base.get('/report/getReportSumByDeviceType', {
      params: {deviceType, startTime, endTime}
    });
  },
  getReportSumByDeviceIds (devIds = [], deviceType, startTime, endTime) {
    return base.post('/report/getReportSumByDeviceType', {
      devIds, deviceType, startTime, endTime
    });
  },
  getDmaDayStat (statTime) {
    return base.get('/dmareport/getDmaDayStat', {
      params: {
        statTime
      }
    });
  },
  getReportDetailByDeviceId (devId, startTime, endTime) {
    return base.get('/report/getReportDetailByDeviceId', {
      params: {devId, startTime, endTime}
    });
  },
  getDayReportByDeviceType (deviceType, statTime) {
    return base.get('/report/getDayReportByDeviceType', {
      params: {deviceType, statTime}
    });
  },
  getDmaStatSum (startTime, endTime) {
    return base.get('/dmareport/getDmaStatSum', {
      params: {startTime, endTime}
    });
  },
  getDmaStatDetail (dmaId, startTime, endTime) {
    return base.get('/dmareport/getDmaStatDetail', {
      params: {dmaId, startTime, endTime}
    });
  },
  exportDayReport (deviceType, statTime) {
    return base.get('/report/exportDayReport', {
      params: {deviceType, statTime}
    });
  },
  exportDmaStatSum (startTime, endTime) {
    return base.get('/report/exportDmaStatSum', {
      params: {startTime, endTime}
    });
  },
  exportDmaStatDetail (dmaId, startTime, endTime) {
    return base.get('/dmareport/exportDmaStatDetail', {
      params: {dmaId, startTime, endTime}
    });
  },
  exportDmaDayStat (statTime) {
    return base.get('/dmareport/exportDmaDayStat', {
      params: {statTime}
    });
  },
  exportReportSum (deviceType, startTime, endTime) {
    return base.get('/report/exportReportSum', {
      params: {deviceType, startTime, endTime}
    });
  },
  exportReportDetail (devId, startTime, endTime) {
    return base.get('/report/exportReportDetail', {
      params: {devId, startTime, endTime}
    });
  }
};
