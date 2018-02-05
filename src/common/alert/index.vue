<template>
    <div class='alert-notify' v-show='show'>
        <h4>
            <el-row type='flex' justify='space-between'>
                <el-col>
                    测点实时告警
                </el-col>
                <i @click='show = false' class='el-icon-close alert-close'></i>
            </el-row>
        </h4>
        <ul class='alert-list'>
            <li class='alert-item' v-for='item in alertList'>
                <el-row type='flex' class='alert-item-title' justify='space-between'>
                    <el-col>
                        {{item.deviceId | getDevNameById}}
                    </el-col>
                    <el-col >
                        {{item.alertTime | format}}
                    </el-col>
                </el-row>
                <el-row class='alert-item-content'>
                    <el-col>
                        {{item.alertInfo}}
                    </el-col>
                </el-row>
            </li>
        </ul>
    </div>
</template>
<script>
export default {
  data () {
    return {
      show: false,
      reConnectCount: 0,
      alertList: [],
      timer: null
    };
  },
  methods: {
    test () {
      this.alertList.push({id: 0, alertId: 25963, alertStatus: 0, deviceId: 20000008, alertInfo: '设备 流量18产生报警! 当前为:8675008.361. 高于上限2000.000. ', alertTime: 1515773490000})
      this.alertList.push({id: 0, alertId: 25963, alertStatus: 0, deviceId: 20000008, alertInfo: '设备 流量18产生报警! 当前为:8675008.361. 高于上限2000.000. ', alertTime: 1515773490000})
      this.show = true;
    },
    delayNotify (newMessage) {
      let alertList = this.alertList;
      let vm = this;
      alertList.unshift(newMessage);
      this.show = true;
      setTimeout(() => {
        vm.show = false;
      }, 10000);
    },
    onSuccess () {
      console.log('onSuccess');
      // client.subscribe('topic/alert');
    },
    onMessageArrived (message) {
      this.delayNotify(message);
    },
    onConnectionLost (responseObject) {
      if (responseObject.errorCode !== 0) {
        console.log('onConnectionLost:' + responseObject.errorMessage);
      }
      this.reConnectCount++;
    }
  },
  mounted () {
    this.$bus.$on('mqtt-connectionLost', this.onConnectionLost);
    this.$bus.$on('mqtt-messagearrived', this.onMessageArrived);
    this.$bus.$on('mqtt-success', this.onSuccess);
    // this.test();
  }
};
</script>
<style lang='less'>
    .alert-item{
        border-bottom: 1px solid #ccc;
        font-size: 12px;
        margin: 5px 0;
        .alert-item-title{
            background: #fd0404d4;
            color:#fff;
            padding:0 5px;
            & > div:last-child{
                text-align: right;
            }
        }
        .alert-item-content{
            margin: 5px 0;
        }
    }
    .alert-notify{
        padding: 10px;
        border-radius: 5px;
        width: 400px;
        box-shadow:1px 2px 11px 3px #5a5e66;
        position: fixed;
        bottom: 10px;
        right: 10px;
        background: #fff;
        .alert-list{
            max-height: 250px;
            overflow: auto;
        }
        .alert-close{
            cursor: pointer;
        }
    }
</style>
