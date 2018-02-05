<template>
    <el-badge class='user-message icon-wrap' :value='total >= 1000 ? "999+" : total' v-popover:bellMessage>
        <i class='el-icon-bell icon'></i>
        <el-popover
            ref='bellMessage'
            placement='bottom'
            width='300'
            trigger='click'>
        <div class='message-notify'>
            <h4>
                <el-row type='flex' justify='space-between'>
                    <el-col>
                        当前未处理告警共：{{total}}个
                    </el-col>
                </el-row>
            </h4>
            <ul class='message-list'>
               <li class='message-item' v-for='item in list.slice(0,this.maxLength)'>
                    <el-row>
                        <el-col :span='4'>
                            <el-row type='flex' align='center'>
                                <el-col>
                                    <i class='message-item-icon iconfont ' :class='`el-icon-${getDevTypeById(item.deviceId)} ${getDevTypeById(item.deviceId)}-color`' ></i>
                                </el-col>
                            </el-row>
                        </el-col>
                        <el-col :span='20'>
                            <el-row type='flex' class='message-item-title' justify='space-between'>
                                <el-col>
                                    {{item.deviceId | getDevNameById}}
                                </el-col>
                                <el-col >
                                    {{item.alertTime | format}}
                                </el-col>
                            </el-row>
                            <el-row class='message-item-content'>
                                <el-col>
                                    {{item.alertInfo}}
                                </el-col>
                            </el-row>
                        </el-col>
                    </el-row>
                </li>
            </ul>
            <el-row type='flex' justify='center' class='message-notify-footer' >
                 <router-link to='alertIndex' class='go-alert-index'>查看更多告警</router-link>
            </el-row>
        </div>
    </el-popover>
    </el-badge>
</template>
<script>
import commonLogic from '@/common/index';
import alertResource from '@/resource/alert';
import base from '@/mixin/base';

export default {
  mixins: [base],
  data () {
    return {
      list: [],
      current: 1,
      size: 10,
      total: 0,
      getDevTypeById: commonLogic.getDevTypeById
    };
  },
  props: {
    maxLength: {
      type: Number,
      default: 10
    }
  },
  methods: {
    onMessageArrived (message) {
      this.list.unshift(message);
      this.total++;
    },
  },
  mounted () {
    alertResource.getAlertByCondition({}, this.current, this.size).then(({data}) => {
      this.list = this.list.concat(data.content);
      this.total = data.totalElements;
      this.$bus.$on('mqtt-messagearrived', this.onMessageArrived);
    });
  }
};
</script>
<style lang='less' scoped>
    @import '~assets/css/common.less';
    .message-item{
        border-bottom: 1px solid @grey-color;
        font-size: 12px;
        margin: 5px 0;
        .message-item-title{
            padding:0 5px;
            & > div:last-child{
                text-align: right;
            }
        }
        .message-item-content{
            margin: 5px 0;
            padding:0 5px;
            color:darken(@grey-color,20%);
        }
    }
    .message-notify{
        max-width: 300px;
        h4{
            font-size: @font-small;
            padding-bottom: 1em;
            border-bottom: 1px solid @grey-color;
        }
        .message-list{
            max-height: 300px;
            overflow: auto;
        }
    }
    .user-message{
        cursor: pointer;

    }
    .message-item-icon{
        font-size: 300%;
    }
    .message-notify-footer{
        margin-top: 10px;
    }
    .go-alert-index{
        color:darken(@grey-color,30%);
    }
</style>
