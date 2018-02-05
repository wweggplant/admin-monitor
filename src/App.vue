<template>
  <div id='app'>
    <router-view></router-view>
    <div class='site-version'>v{{version}}</div>
  </div>
</template>
<script>
import resInterceptor from './resource/interceptor';

import {version} from '../package.json';
export default {
  name: 'app',
  components: {
  },
  data () {
    return {
      version
    };
  },
  mounted () {
    resInterceptor(this); // 拦截器
  }
};
</script>
<style lang='less'>
  @import '../static/css/main.css';
  @import './assets/css/base.less';
  .site-version {
    position:fixed;
    bottom:2px;
    right:20px;
    font-size:12px;
    color:#20a0ff;
  }

</style>
