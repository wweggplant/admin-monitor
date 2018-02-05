<template >
    <baidu-map ref="map" @zoomend='zoomMap' v-if='init' @load='mapInit' :scroll-wheel-zoom='true' :map-type='mapType'  :zoom='zoom'  class='bm-view'  :center='center' :style='{height:`${useHeight}px`}' ak='DuVMI92hBNjPHGkOL3PGK0k8kFg0eEEx'>
        <bm-view style='width: 100%; height:100%;'></bm-view>
        <bm-scale anchor='BMAP_ANCHOR_BOTTOM_RIGHT' :offset='{width:50,height:20}'></bm-scale>
        <bm-navigation :offset='{height:20}' anchor='BMAP_ANCHOR_BOTTOM_RIGHT' ></bm-navigation>
        <bm-control anchor='BMAP_ANCHOR_BOTTOM_RIGHT' :offset='{width:23,height:230}'>
            <span @click='setMapInit' class='marker-location'>
                <i class='el-icon-location iconfont'></i>
            </span>
        </bm-control>
        <bm-control class='map-statistics-pad' anchor='BMAP_ANCHOR_TOP_LEFT' :offset='{width:0,height:10}'>
            <div  class='map-controller' v-show='showStatistics'>
                <el-row type='flex'  justify='end'>
                    <el-col :span='2' :offset='1'>
                        <i  @click='showStatistics=false' class='el-icon-close'></i>
                    </el-col>
                </el-row>
                <el-table
                    :data='statisticsTableData()'
                    :show-header='false'
                    size='mini'
                >
                    <el-table-column
                        width='140'
                        prop='name'>
                    </el-table-column>
                    <el-table-column
                        prop='value'>
                    </el-table-column>
                </el-table>
            </div>
            <el-row type='flex'  justify='start' v-show='!showStatistics'>
              <el-button size="small" @click='showStatistics=true' type="primary">统计信息</el-button>
            </el-row>
        </bm-control>
        <bm-control v-if='Types' class='map-controller-pad' :offset='{width:0,height:10}'  anchor='BMAP_ANCHOR_TOP_RIGHT'>
            <div v-show='showControl' class='map-controller'>
                <el-row type='flex'  justify='end'>
                    <el-col :span='2' :offset='1'>
                        <i  @click='showControl=false' class='el-icon-close'></i>
                    </el-col>
                </el-row>
                <el-form size='mini'>
                    <el-row>
                        <el-col>
                            <el-form-item label='基本图层'>
                                <el-row :gutter='20'  >
                                    <el-col v-for='type in mapTypes' :key='type.value'>
                                        <el-radio  key='type' v-model='mapType' :label='type.value'>{{type.name}}</el-radio>
                                    </el-col>
                                </el-row>
                            </el-form-item>
                            <el-form-item label='业务图层'>
                                <el-checkbox-group @change='change' v-model='checkSelectList' size='mini'>
                                    <el-row :gutter='20' v-for='(v,type) in Types' :key='type'>
                                        <el-col>
                                            <el-checkbox  :label='type' ><i class='iconfont' :class='`el-icon-${type} ${type}-color`'></i> {{v}}</el-checkbox>
                                        </el-col>
                                    </el-row>
                                </el-checkbox-group>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
            </div>
            <el-row type='flex'  justify='end' v-show='!showControl'>
                <el-button size="small" @click='showControl=true' type="primary">图层管理</el-button>
            </el-row>
        </bm-control>
        <template v-for='(list,type) in markers()'>
            <template v-for='marker in list'>
              <bm-marker
                :top='marker.top'
                :icon='iconMake(type)'
                @click='markerClick(marker)'
                v-if="type !=='dma'"
                class='flex-box'
                :key='`device${marker.deviceId}`'
                :position='{lng: marker.longitude, lat: marker.latitude}'
              >
                <bm-label title="Hover me" @click="openHistoryModelDaysOffset(marker.deviceId, marker.saveTimeNow, -1)" :labelStyle="{'border-color':'#fff'}"  v-if="marker.showTable" :content="tableDevice(marker,type)" :offset='{width: 30, height: 0}'/>
              </bm-marker>
              <template v-else>
                <bm-marker
                    :top='marker.top'
                    @click='markerClick(marker)'
                    :icon='iconMake(type)'
                    class='flex-box'
                    :key='`dma${marker.dmaId}`'
                    :position="{lng: marker.dmaCorePointLongitude, lat: marker.domCorePointLatitude}"
                >
                  <bm-label  :labelStyle="{'border-color':'#fff'}" v-if='marker.showTable' :content='tableDma(marker)' :offset='{width: 30, height: 0}'/>
                </bm-marker>
                <bm-polygon v-if="zoom > 16" fill-color="#ffffffb8" stroke-style="dashed" :fill-opacity="0" :path="marker.polygonPath" stroke-color="blue" :stroke-opacity="0.5" :stroke-weight="4" :editing="false"/>
            </template>
          </template>
        </template>
    </baidu-map>
</template>
<script>
import base from '@/extend/base';
import {BaiduMap, BmMarker, BmLabel, BmView, BmOverlay, BmMapType, BmScale, BmNavigation, BmGeolocation, BmlMarkerClusterer, BmControl, BmPolygon} from 'vue-baidu-map'
import dmaResource from '@/resource/dma';
import realResource from '@/resource/real';
import commonLogic from '@/common/';
import CONST from '@/const/device';
import reportResource from '@/resource/report';

// const MAP_MAX_LEVEL = 16;
const MAP_MIN_LEVEL = 11;
const INIT_MAP_ZOOM = 14;
const MAP_ZOOM_STEP = 3;
/*
* 分级,级别数递增为2
* */
const getSection = (maxLevel = 0) => {
  let arr = [];
  for (let i = MAP_MIN_LEVEL; i <= MAP_MIN_LEVEL + MAP_ZOOM_STEP * maxLevel; i = i + MAP_ZOOM_STEP) {
    arr.push([i, i + MAP_ZOOM_STEP]);
  }
  return arr;
};

export default {
  extends: base,
  name: 'mapMonitor',
  data () {
    let Types = {};
    let selectedDeviceType = [];
    for (let t in CONST.type) {
      Types[t] = CONST.type[t].name;
      selectedDeviceType.push(t);
    }
    let checkSelectList = [].concat(selectedDeviceType, ['dma']);
    Types.dma = 'DMA';
    return {
      init: false,
      initCenter: {},
      deepArr: [],
      center: '杭州市',
      zoom: INIT_MAP_ZOOM,
      initZoom: INIT_MAP_ZOOM,
      renderMakers: true,
      originMarkers: {},
      showControl: true,
      showStatistics: true,
      mapTypes: [{value: 'BMAP_NORMAL_MAP', name: '地图'}, {value: 'BMAP_HYBRID_MAP', name: '卫星影像'}],
      mapType: 'BMAP_NORMAL_MAP',
      Types: Types,
      selectedDeviceType: selectedDeviceType,
      checkSelectList: checkSelectList
    };
  },
  components: {
    BaiduMap, BmMarker, BmLabel, BmView, BmOverlay, BmMapType, BmScale, BmNavigation, BmGeolocation, BmlMarkerClusterer, BmControl, BmPolygon
  },
  computed: {
  },
  methods: {
    markers () {
      let o = {};
      this.checkSelectList.forEach(type => (o[type] = this.originMarkers[type]));
      const zoom = this.$refs.map ? this.$refs.map.zoom : INIT_MAP_ZOOM;
      // dma缩放控制
      let deepArr = this.deepArr;
      let deep = this.deepArr.length;
      if (deep > 0 && o.dma) {
        o.dma = o.dma.filter(item => {
          let min = deepArr[item.dmaLevel][0];
          let max = deepArr[item.dmaLevel][1];
          return (min <= zoom && max >= zoom) || max < zoom;
        });
      }
      console.log(o.dma);
      return o;
    },
    markerClick (marker) {
      marker.showTable = !marker.showTable;
      marker.top = marker.showTable;
    },
    statisticsTableData () {
      let list = [];
      for (let type in this.Types) {
        list.push({name: this.Types[type], value: this.originMarkers[type].length})
      }
      return list;
    },
    setMapInit () {
      this.center = {};
      this.zoom = null;
      this.$nextTick(() => {
        this.center = this.initCenter;
        this.zoom = this.initZoom;
      });
    },
    zoomMap (e) {
      let vm = this;
      this.zoom = e.target.getZoom();
      let markers = this.markers();
      for (let type in markers) {
        markers[type].forEach(marker => {
          marker.showTable = vm.zoom >= INIT_MAP_ZOOM;
        });
      }
    },
    mapInit (e) {
      this.initCenter = e.point;
      this.initZoom = e.zoom;
    },
    change () {
      this.renderMakers = false;
      let vm = this;
      setTimeout(() => {
        vm.renderMakers = true;
      }, 1000);
    },
    iconMake (type) {
      return {
        url: `/static/img/map/${type}.png`,
        size: {width: 30, height: 30},
        opts: {
          imageSize: {width: 30, height: 30},
        }
      }
    },
    tableDma (marker) {
      let filters = base.filters;
      return `
        <div  class='marker-table marker-table-dma'>
                <table>
                    <tr>
                        <td colspan='2' >
                            ${marker.dmaName}
                        </td>
                    </tr>
                    <tr>
                        <td colspan='2'>
                            ${filters.format(marker.calculateTime, 'YYYY-MM-DD hh:mm')}
                        </td>
                    </tr>
                    <tr>
                        <td >
                            昨日供水量
                        </td>
                        <td >
                         ${filters.numFormat(marker.waterSupply)}m³
                        </td>
                    </tr>
                    <tr>
                        <td >
                            昨日最小供水量
                        </td>
                        <td >
                        </td>
                    </tr>
                    <tr>
                        <td >
                            昨日疑似漏损率
                        </td>
                        <td >
                             ${filters.percentageFormat(marker.physicalLeakageRate)}
                        </td>
                    </tr>
                </table>
            </div>`;
    },
    tableDevice (marker, type) {
      let filters = base.filters;
      return `
        <div class='marker-table marker-table-${type}'>
                <table>
                    <tr>
                        <td colspan='2'>
                            ${marker.deviceName}
                        </td>
                    </tr>
                    <tr>
                        <td colspan='2'>
                            ${filters.format(marker.startTime, 'YYYY-MM-DD hh:mm')}
                        </td>
                    </tr>
                    <tr>
                        <td >
                            当前值
                        </td>
                        <td >
                            ${filters.numFormat(marker.valueNow)}
                        </td>
                    </tr>
                    <tr>
                        <td >
                            变化量
                        </td>
                        <td>
                            ${filters.numFormat(marker.changeVal)}
                            <i class="${marker.changeVal < 0 ? 'el-icon-down iconfont dma-value-down' : 'el-icon-up iconfont  dma-value-up'}"></i>
                        </td>
                    </tr>
                </table>
            </div>

      `;
    },
    draw ({el, BMap, map}) {
      const {lng, lat} = this.position;
      const pixel = map.pointToOverlayPixel(new BMap.Point(lng, lat));
      el.style.left = pixel.x - 10;
      el.style.top = pixel.y - 10;
    },
    makeMarkers () {
      this.init = false;
      /*
      let startDate = format(format(new Date(),'YYYY-MM-DD'));
      let endDate = format(moment(startDate).add(1,'d'));
      */
      let startDate = '2017-11-12 00:00:00';
      let endDate = '2017-11-14 00:00:00';
      axios.all([ realResource.listAllType(),
        dmaResource.getDMATree(),
        reportResource.getDmaStatSum(startDate, endDate)
      ]).then(([[reallist], [tree], [dmalist]]) => {
        let originMarkers = {};
        let dmaList = [];
        let maxLevel = 0;
        for (let name of this.selectedDeviceType) {
          originMarkers[name] = commonLogic.realDataHandle(reallist[name], () => {
            return {showTable: false}
          });
        }
        commonLogic.iterTree([tree], (item) => {
          let d = dmalist[item.dmaId] || {};
          if (item.dmaBorder) {
            item.polygonPath = item.dmaBorder.split(';').map(m => {
              const arr = m.split(',');
              return {
                lng: Number(arr[0]),
                lat: Number(arr[1])
              }
            });
          }
          dmaList.push(Object.assign(d, item, {showTable: false}));
          if (item.children && item.children.length > 0) {
            maxLevel++;
          }
        });
        this.deepArr = getSection(maxLevel);
        originMarkers['dma'] = dmaList;
        this.originMarkers = originMarkers;
        this.init = true;
      });
    }
  },
  mounted () {
    this.makeMarkers();
  }
};
</script>
<style lang='less'>
    @import '~assets/css/common.less';
    .dma-value-down {
        color:green;
    }
    .dma-value-up{
        color:red;
    }
    .marker-table {
        width: 120px;
        background: #fff;
        overflow: hidden;
        box-shadow: 0 0 5px #000;
        color: #111;
        border:1px solid;
        text-align: left;
        padding: 2px;
        table{
            width: 100%;
        }
        &.marker-table-dma{
            width: 150px;
            border-color:@dma-color;
            tr:first-child{
                td{
                    background: @dma-color;
                    color:@white-color;
                }
            }
        }
        &.marker-table-pre{
            border-color:@pre-color;
            tr:first-child{
                td{
                    background: @pre-color;
                    color:@white-color;
                }
            }
        }
        &.marker-table-ins{
            border-color:@ins-color;
            tr:first-child{
                td{
                    background: @ins-color;
                    color:@white-color;
                }
            }
        }
        &.marker-table-acc{
            border-color:@acc-color;
            tr:first-child{
                td{
                    background: @acc-color;
                    color:@white-color;
                }
            }
        }
        &.marker-table-grp{
            border-color:@grp-color;
            tr:first-child{
                td{
                    background: @grp-color;
                    color:@white-color;
                }
            }
        }
    }
    .marker-table.active {
        background: rgba(0,0,0,0.75);
        color: #fff;
    }
    .bm-view{
        position: relative;
    }
    .map-controller-pad{
        width: 180px;
    }
    .map-controller{
        background: #fff;
        padding: 10px;
    }
    .marker-location{
        background: #fff;
        padding: .2em;
        font-size: 150%;
        .el-icon-location{
            font-size: inherit;
        }
    }
    .map-control-show{
        background: #fff;
        padding: .5em;
        line-height: 2;
        cursor: pointer;
        font-size: 12px;
    }
    .map-statistics-pad{
        width: 240px;
    }

</style>
