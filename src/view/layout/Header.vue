<template>
    <div class='header'>
        <div class='logo'>后台管理系统</div>
        <div class='user-info'>
            <help class="help"/>
            <bell-message class="bell"/>
            <el-dropdown trigger='click' @command='handleCommand'>
                <span class='el-dropdown-link'>
                    <img class='user-logo' src='../../../static/img/img.jpg'>
                    {{username}}
                </span>
                <el-dropdown-menu slot='dropdown'>
                    <el-dropdown-item command='loginout'>退出</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </div>
</template>
<script>
import {format} from '@/filters/date'
import bellMessage from '@/common/alert/BellMessage';
import Help from '@/common//help.vue';

export default {
  data () {
    return {
      name: 'linxin',
      searchKey: '',
      time: format(new Date())
    };
  },
  components: {
    bellMessage,
    Help
  },
  computed: {
    username () {
      return localStorage.getItem('ms_username') || this.name;
    }
  },
  methods: {
    handleCommand (command) {
      if (command === 'loginout') {
        localStorage.removeItem('ms_username')
        this.$router.replace('/login', () => {
          location.reload();
        });
      }
    }
  }
}
</script>
<style lang='less'>
    @import '~assets/css/common.less';
    .header {
        position: relative;
        box-sizing: border-box;
        width: 100%;
        height: 60px;
        font-size: 22px;
        line-height: 60px;
        color: #fff;
        background-color: #2d2f33;
        .icon-wrap{
            line-height: 1;
        }
        .icon{
            font-size: 200%;
        }
        .logo{
          float: left;
          width:250px;
          text-align: center;
        }
    }
    .user-info {
        height:100%;
        float: right;
        padding-right: 20px;
        font-size:@font-small;
        color: #fff;
    }
    .user-info {
      .el-dropdown-link{
        position: relative;
        display: inline-block;
        padding-left: 50px;
        color: #fff;
        cursor: pointer;
        vertical-align: middle;
      }
      .user-logo{
        position: absolute;
        left:0;
        top:10px;
        width:40px;
        height:40px;
        border-radius: 50%;
      }
    }
    .el-dropdown-menu__item{
        text-align: center;
    }
    .tool-tip{
        margin-right:20px;
        float: right;
        height: 100%;
        > div{
            height: 100%;
            vertical-align: middle;
        }
        >button {
            vertical-align:middle;

        }
    }

</style>
<style lang='less'>
    @import '~assets/css/common.less';
    .search-input{
        width: 20em;
        >input{
            background-color: darken(@main-color,40%);
        }
    }
    .help{
      margin-left: 1em;
      margin-right: .5em;
    }
    .bell{
      margin-left: .5em;
      margin-right: 2em;
    }
</style>
