<template>
	<div class='loading' v-show='showLoading && loadingSwitch'>
		<el-row class='loadingcont'>
			<el-col class='pull-left' :span='8'>
				<img src='~assets/images/loading.gif' width='100' alt=''>
			</el-col>
			<el-col class='loadingtxt' :span='16'>{{$store.state.loading.loadingMessage}}</el-col>
		</el-row>
	</div>
</template>
<style rel='stylesheet/less' lang='less' scoped>
	.loading {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, .5);
		z-index: 9999;
		.loadingcont {
			border-radius: 5px;
			position: absolute;
			top: 50%;
			left: 50%;
			background: #fff;
			padding: 15px 30px 15px 15px;
			width: 370px;
			height: 120px;
			margin-top: -35px;
			transform: translate(-50%, -50%);
			.loadingtxt {
				height: 90px;
				line-height: 90px;
				padding-left: -40px;
			}
		}
	}
</style>
<script>
export default {
  computed: {
    showLoading () {
      return this.$store.state.loading.showLoading;
    },
    loadingSwitch () {
      return this.$store.state.loading.loadingSwitch;
    }
  }
};
</script>
